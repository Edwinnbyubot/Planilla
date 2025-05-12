<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Devolucione;
use App\Models\Empleado;
use App\Models\Sueldo;
use Illuminate\Http\Request;
use Inertia\Inertia;
class ControllerDevolucione extends Controller
{

    public function index()
    {
        // Obtiene todas las devoluciones
        $empleados=Empleado::all();
        $sueldos=Sueldo::all();
        $devoluciones = Devolucione::all();
        return Inertia::render('devoluciones/index',compact('devoluciones','empleados','sueldos'));
    }


    public function create()
    {
        // Muestra el formulario para crear una nueva devolución
        return view('devoluciones.create');
    }

    public function store(Request $request)
    {
        // Valida los datos recibidos antes de crear una nueva devolución
        $validated = $request->validate([
            'tipo' => 'required|string|in:Bonificación,Deducción',
            'razon' => 'required|string|max:255',
            'monto' => 'required|numeric|between:0,99999999.99',
            'idEmpleado' => 'required|exists:empleados,id',
            'idSueldo' => 'required|exists:sueldos,id',
        ]);

        // Añadir la fecha actual automáticamente
        $validated['fecha'] = Carbon::now();

        Devolucione::create($validated);
        // Redirige al índice con un mensaje de éxito
        return redirect()->route('devoluciones.index')->with('success', 'Devolución creada exitosamente.');
    }


    public function show(Devolucione $devolucione)
    {
        // Muestra los detalles de una devolución específica
        return view('devoluciones.show', compact('devolucione'));
    }

    public function edit(Devolucione $devolucione)
    {
        // Muestra el formulario para editar la devolución seleccionada
        return view('devoluciones.edit', compact('devolucione'));
    }


    public function update(Request $request, Devolucione $devolucione)
    {
        // Valida los datos recibidos antes de actualizar la devolución
        $request->validate([
            'tipo' => 'required|string|max:255',
            'razon' => 'required|string|max:255',
            'monto' => 'required|numeric|between:0,99999999.99',
            'fecha' => 'required|date',
            'idEmpleado' => 'required|exists:empleados,id',
            'idSueldo' => 'required|exists:sueldos,id',
        ]);

        // Actualiza la devolución en la base de datos
        $devolucione->update([
            'TipoDeduccion' => $request->TipoDeduccion,
            'Monto' => $request->Monto,
            'fecha' => $request->fecha,
            'idEmpleado' => $request->idEmpleado,
            'idSueldo' => $request->idSueldo,
        ]);

        // Redirige al índice con un mensaje de éxito
        return redirect()->route('devoluciones.index')->with('success', 'Devolución actualizada exitosamente.');
    }

    public function destroy(Devolucione $devolucione)
    {
        // Elimina la devolución de la base de datos
        $devolucione->delete();

        // Redirige al índice con un mensaje de éxito
        return redirect()->route('devoluciones.index')->with('success', 'Devolución eliminada exitosamente.');
    }

    public function actualizarSueldo(Request $request, $idSueldo)
{
    // Obtener el sueldo a actualizar
    $sueldo = Sueldo::findOrFail($idSueldo);

    // Obtener las devoluciones relacionadas con el empleado y sueldo
    $devoluciones = Devolucione::where('idSueldo', $idSueldo)->get();

    // Inicializar variables para sumar bonificaciones y deducciones
    $totalBonificaciones = 0;
    $totalDeducciones = 0;

    // Recorrer las devoluciones para calcular los totales de bonificaciones y deducciones
    foreach ($devoluciones as $devolucion) {
        if ($devolucion->tipo === 'Bonificación') {
            $totalBonificaciones += $devolucion->monto;
        } elseif ($devolucion->tipo === 'Deducción') {
            $totalDeducciones += $devolucion->monto;
        }
    }

    // Calcular el nuevo sueldo neto
    $nuevoSueldoNeto = $sueldo->SalarioBruto + $totalBonificaciones - $totalDeducciones;

    // Actualizar los campos del sueldo en la base de datos
    $sueldo->update([
        'Bonificaciones' => $totalBonificaciones,
        'Deducciones' => $totalDeducciones,
        'SalarioNeto' => $nuevoSueldoNeto
    ]);

    return response()->json(['message' => 'Sueldo actualizado correctamente']);
}

}
