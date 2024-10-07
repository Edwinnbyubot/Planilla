<?php

namespace App\Http\Controllers;

use App\Models\Empleado;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ControllerEmpleado extends Controller
{

    public function index()
    {
        // Obtiene todos los empleados
        $empleado = Empleado::all();
        return Inertia::render('empleados/index',compact(('empleado')));
    }


    public function create()
    {
        // Muestra el formulario para crear un nuevo empleado
        return Inertia::render('empleados/index');
    }


    public function store(Request $request)
    {
        // Valida los datos recibidos
        $request->validate([
            'Nombre' => 'required|string|max:255',
            'Apellido' => 'required|string|max:255',
            'FechaContrato' => 'required|date',
            'Cargo' => 'required|string|max:255',
            'Salario' => 'required|numeric|between:0,99999999.99',
            'Estado' => 'required|string|in:Activo,Inactivo',
        ]);
        $data=$request->only('Nombre','Apellido','FechaContrato','Cargo','Salario','Estado');
        // Crea un nuevo empleado
        Empleado::create($data);
        
        //Redirige al índice con un mensaje de éxito
        //return redirect()->route('empleados')->with('success', 'Empleado creado exitosamente.');
    }


    public function show(Empleado $empleado)
    {
        // Muestra los detalles de un empleado específico
        return view('empleados.show', compact('empleado'));
    }


    public function edit(Empleado $empleado)
    {
        // Muestra el formulario para editar el empleado seleccionado
        return Inertia::render('empleados/edit',compact('empleado'));
    }


    public function update(Request $request, Empleado $empleado)
    {
        // Valida los datos antes de actualizar
        $request->validate([
            'Nombre' => 'required|string|max:255',
            'Apellido' => 'required|string|max:255',
            'FechaContrato' => 'required|date',
            'Cargo' => 'required|string|max:255',
            'Salario' => 'required|numeric|between:0,99999999.99',
            'Estado' => 'required|string|in:Activo,Inactivo',
        ]);
        $data=$request->only('Nombre','Apellido','FechaContrato','Cargo','Salario','Estado');
        // Crea un nuevo empleado
        $empleado->update($data);
        return to_route('empleados.index',$empleado);
    }


    public function destroy(Empleado $empleado)
    {
        // Elimina el empleado
        $empleado->delete();

        // Redirige al índice con un mensaje de éxito
        return to_route('empleados.index',$empleado);
    }
}
