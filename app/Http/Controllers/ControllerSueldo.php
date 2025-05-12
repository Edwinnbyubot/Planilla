<?php

namespace App\Http\Controllers;

use App\Models\Sueldo;
use App\Models\Devolucione;
use App\Models\Empleado;
use Illuminate\Http\Request;
use App\Http\Requests\UpdateSueldoRequest;
use Inertia\Inertia;
class ControllerSueldo extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $empleado = Empleado::all();
        $sueldo = Sueldo::all();
        return Inertia::render('sueldos/index',compact(('empleado')));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('sueldos.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'fechaPago' => 'required|date',
            'SalarioBruto'=> 'required|numeric|between:0,99999999.99',
            'Deducciones'=> 'required|numeric|between:0,99999999.99',
            'Bonificaciones'=> 'required|numeric|between:0,99999999.99',
            'Impuestos'=> 'required|numeric|between:0,99999999.99',
            'SalarioNeto'=> 'required|numeric|between:0,99999999.99',
            'idEmpleado'=> 'required|integer',
            ]);
            $data=$request->only('fechaPago','SalarioBruto','Deducciones','Bonificaciones','Impuestos','SalarioNeto','idEmpleado');
            Sueldo::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(Sueldo $sueldo)
    {
        return view('sueldos.show', compact('sueldo'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Sueldo $sueldo)
    {
        return view ('sueldos.edit',compact('sueldo'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSueldoRequest $request, Sueldo $sueldo)
    {
        $request->validate([
            'fechaPago' => 'required|date',
            'SalarioBruto'=> 'required|decimal',
            'Deducciones'=> 'required|string|decimal',
            'Bonificaciones'=> 'required|decimal',
            'Impuestos'=> 'required|decimal',
            'SalarioNeto'=> 'required|decimal',
            'idEmpleado'=> 'required|integer',
            ]);
        $sueldo->update($request->only('fechaInicio','fechaFin','Comentario','idEmpleado'));
        return redirect()->route('sueldos.index')->with('success', 'Sueldo Acutalizado');
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
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Sueldo $sueldo)
    {
        $sueldo->delete();
        return redirect()->route('ausencias.index')->with('success', 'Sueldo Eliminido Correctamente');
    }
    
}
