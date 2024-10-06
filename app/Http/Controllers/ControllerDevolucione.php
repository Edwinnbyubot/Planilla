<?php

namespace App\Http\Controllers;

use App\Models\Devolucione;
use Illuminate\Http\Request;
use Inertia\Inertia;
class ControllerDevolucione extends Controller
{

    public function index()
    {
        // Obtiene todas las devoluciones
        $devoluciones = Devolucione::all();
        return Inertia::render('sueldos/index');
    }


    public function create()
    {
        // Muestra el formulario para crear una nueva devolución
        return view('devoluciones.create');
    }

    public function store(Request $request)
    {
        // Valida los datos recibidos antes de crear una nueva devolución
        $request->validate([
            'TipoDeduccion' => 'required|string|max:255',
            'Monto' => 'required|numeric|between:0,99999999.99',
            'fecha' => 'required|date',
            'idEmpleado' => 'required|exists:empleados,id',
            'idSueldo' => 'required|exists:sueldos,id',
        ]);

        // Crea la devolución en la base de datos
        Devolucione::create([
            'TipoDeduccion' => $request->TipoDeduccion,
            'Monto' => $request->Monto,
            'fecha' => $request->fecha,
            'idEmpleado' => $request->idEmpleado,
            'idSueldo' => $request->idSueldo,
        ]);

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
            'TipoDeduccion' => 'required|string|max:255',
            'Monto' => 'required|numeric|between:0,99999999.99',
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
}
