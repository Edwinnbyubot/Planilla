import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';

const Index = ({ empleado }) => {

  console.log(empleado);

  const initialValues={
    Tipo: '',
    fechaInicio: '',
    fechaFin: '',
    Comentario: '',
    idEmpleado: '',
  }

  const {data,errors,setData,post}=useForm(initialValues)

  const handleEmpleadoSelect = (empleadoId) => {
    setData('idEmpleado', empleadoId); // Actualizar el ID del empleado seleccionado
  };

  const submit = (e) => {
    e.preventDefault();
    post(route('ausencias.store')); // Cambié la ruta para adaptarla a la que usas en la base de datos
  };

  return (
    <AuthenticatedLayout>
      <Head title="Gestión de Ausencias y Vacaciones" />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Registrar Ausencia o Vacación</h1>
        <form onSubmit={submit} className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex flex-col">
            <label className="font-semibold">Tipo</label>
            <select
              value={data.Tipo}
              onChange={(e) => setData('Tipo', e.target.value)}
              className="border rounded p-2 mt-1"
              name="Tipo"
            >
              <option value="">Selecciona un Tipo</option>
              <option value="Ausencia">Ausencia</option>
              <option value="Vacaciones">Vacaciones</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="font-semibold">Fecha de Inicio</label>
            <input
              type="date"
              className="border rounded p-2 mt-1"
              value={data.fechaInicio}
              onChange={(e) => setData('fechaInicio', e.target.value)}
              name="fechaInicio"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold">Fecha de Fin</label>
            <input
              type="date"
              className="border rounded p-2 mt-1"
              value={data.fechaFin}
              onChange={(e) => setData('fechaFin', e.target.value)}
              name="fechaFin"
            />
          </div>

          <div className="flex flex-col col-span-2">
            <label className="font-semibold">Comentario</label>
            <textarea
              className="border rounded p-2 mt-1"
              value={data.Comentario}
              onChange={(e) => setData('Comentario', e.target.value)}
              name="Comentario"
            />
          </div>

          <div className="flex flex-col col-span-2">
          <label className="font-semibold">Empleado</label>
            <select
              value={data.idEmpleado}
              onChange={(e) => setData('idEmpleado', e.target.value)}
              className="border rounded p-2 mt-1"
              name="idEmpleado"
            >
              <option value="">Selecciona un Tipo</option>
              {empleado.map((emple) => (
                <option key={emple.id} value={emple.id}>
                  {`${emple.Nombre} ${emple.Apellido}`}
              </option>
        ))}
            </select>
          </div>

          <div className="col-span-2">
            <button
              type="submit"
              className="bg-green-700 text-white px-4 py-2 rounded transition hover:bg-green-800 w-full"
            >
              Registrar
            </button>
          </div>
        </form>
      </div>
    </AuthenticatedLayout>
  );
};

export default Index;
