<?php

namespace App\Http\Controllers;

use App\Models\Sueldo;
use App\Http\Requests\StoreSueldoRequest;
use App\Http\Requests\UpdateSueldoRequest;
use Inertia\Inertia;
class ControllerSueldo extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sueldo = Sueldo::all();
        return Inertia::render('sueldos/index');
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
    public function store(StoreSueldoRequest $request)
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
        Sueldo::create($request->only(
            'fechaPago' ,
            'SalarioBruto',
            'Deducciones',
            'Bonificaciones',
            'Impuestos',
            'SalarioNeto',
            'idEmpleado'));
        return redirect()->route('sueldos.index')->with('success', 'Sueldo Registrado');
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

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Sueldo $sueldo)
    {
        $sueldo->delete();
        return redirect()->route('ausencias.index')->with('success', 'Sueldo Eliminido Correctamente');
    }
}
