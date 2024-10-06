<?php

namespace App\Http\Controllers;

use App\Models\Bonificacione;
use App\Http\Requests\StoreBonificacioneRequest;
use App\Http\Requests\UpdateBonificacioneRequest;
use Inertia\Inertia;
class ControllerBonificacione extends Controller
{

    public function index()
    {

        $bonificaciones = Bonificacione::all();
        return Inertia::render('sueldos/index');
    }


    public function create()
    {

        return view('bonificaciones.create');
    }


    public function store(StoreBonificacioneRequest $request)
    {

        Bonificacione::create($request->validated());

        return redirect()->route('bonificaciones.index')
            ->with('success', 'Bonificación regist exitosamente');
    }


    public function show(Bonificacione $bonificacione)
    {

        return view('bonificaciones.show', compact('bonificacione'));
    }



    public function edit(Bonificacione $bonificacione)
    {

        return view('bonificaciones.edit', compact('bonificacione'));
    }


    public function update(UpdateBonificacioneRequest $request, Bonificacione $bonificacione)
    {

        $bonificacione->update($request->validated());

        return redirect()->route('bonificaciones.index')
            ->with('success', 'Bonificación actualizada exitosamente');
    }


    public function destroy(Bonificacione $bonificacione)
    {

        $bonificacione->delete();

        return redirect()->route('bonificaciones.index')
            ->with('success', 'Bonificación eliminada exitosamente');
    }
}
