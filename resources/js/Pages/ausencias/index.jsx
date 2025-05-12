import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';

const Index = ({ empleados,ausencias }) => {
  console.log(ausencias);
  console.log(empleados);

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
      <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50 min-h-screen">
      <div className="container mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-6 mb-10 text-black">
        <h1 className="text-3xl font-bold text-center mb-6">Registrar Ausencia o Vacación</h1>
        <form onSubmit={submit} className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="flex flex-col col-span-2">
          <label className="font-semibold">Empleado</label>
            <select
              value={data.idEmpleado}
              onChange={(e) => setData('idEmpleado', e.target.value)}
              className="border rounded p-2 mt-1"
              name="idEmpleado"
            >
              <option value="">Selecciona un Empleado</option>
              {empleados.map((emple) => (
                <option key={emple.id} value={emple.id}>
                  {`${emple.Nombre} ${emple.Apellido}`}
              </option>
        ))}
            </select>
          </div>
          
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
        <div className="bg-white shadow-md rounded-lg p-6 mb-10 text-black">
        <h2 className="text-2xl font-bold mb-4">Lista de Vacaciones o Ausencias</h2>
            <table className="min-w-full table-auto">
            <thead>
            <tr className="bg-gray-200 text-left">
                <th className="p-2">Tipo</th>
                <th className="p-2">Fecha de Inicio</th>
                <th className="p-2">Fecha de Fin</th>
                <th className="p-2">Comentarios</th>
                <th className="p-2">Empleado</th>
            </tr>
            </thead>
            
            <tbody>
            {ausencias?.map((ausencia) => {
            // Encontrar el empleado correspondiente por su idEmpleado
            const empleado = empleados.find(emp => emp.id === ausencia.idEmpleado);
        
            return (
                <tr className="border-t" key={ausencia.id}>
                <td className="px-4 py-2">{ausencia.Tipo}</td>
                <td className="px-4 py-2">{ausencia.fechaInicio}</td>
                <td className="px-4 py-2">{ausencia.fechaFin}</td>
                <td className="px-4 py-2">{ausencia.Comentario}</td>
                <td className="px-4 py-2">{empleado ? `${empleado.Nombre} ${empleado.Apellido}` : 'Empleado no encontrado'}</td>
            </tr>
        );
        })}
            </tbody>
        </table>
        </div>
      </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Index;
