<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use App\Models\Ausencia;
use App\Http\Requests\StoreAusenciaRequest;
use App\Http\Requests\UpdateAusenciaRequest;

class ControllerAusencia extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $ausencia = Ausencia::all();
        return Inertia::render('ausencias/index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('ausencias.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAusenciaRequest $request)
    {
        $request->validate([
            'fechaInicio' => 'required|date',
            'fechaFin'=> 'required|date',
            'Comentario'=> 'required|string|max:255',
            'idEmpleado'=> 'required|integer',
            ]);
        Ausencia::create($request->only(
            'fechaInicio',
            'fechaFin',
            'Comentario',
            'idEmpleado'));
        return redirect()->route('ausencias.index')->with('success', 'Aunsecia Registrado');
    }

    /**
     * Display the specified resource.
     */
    public function show(Ausencia $ausencia)
    {
        return view('ausencias.show', compact('aunsecia'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Ausencia $ausencia)
    {
        return view ('ausencias.edit',compact('aunsencia'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAusenciaRequest $request, Ausencia $ausencia)
    {
        $request->validate([
            'fechaInicio' => 'required|date',
            'fechaFin'=> 'required|date',
            'Comentario'=> 'required|string|max:255',
            'idEmpleado'=> 'required|integer',
            ]);
        $ausencia->update($request->only('fechaInicio','fechaFin','Comentario','idEmpleado'));
        return redirect()->route('ausencias.index')->with('success', 'Aunsecia Acutalizado');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Ausencia $ausencia)
    {
        $ausencia->delete();
        return redirect()->route('ausencias.index')->with('success', 'Aunsecia Eliminido Correctamente');
    }
}
