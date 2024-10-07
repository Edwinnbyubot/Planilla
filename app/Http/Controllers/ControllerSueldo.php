<?php

namespace App\Http\Controllers;

use App\Models\Sueldo;
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

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Sueldo $sueldo)
    {
        $sueldo->delete();
        return redirect()->route('ausencias.index')->with('success', 'Sueldo Eliminido Correctamente');
    }
}
