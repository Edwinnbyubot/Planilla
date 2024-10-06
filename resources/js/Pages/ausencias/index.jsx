import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Empleados from '@/Components/EmpleadoList';
import { Head, Link } from '@inertiajs/react';

const index = () => {
    return (
    <AuthenticatedLayout>

<Head title="Gestión de Ausencias y Vacaciones" />
<div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50 min-h-screen">
  <div className="container mx-auto p-6">
    <h1 className="text-3xl font-bold text-center mb-6 text-black dark:text-white">Gestión de Ausencias o Vacaciones</h1>

    {/* Formulario para registrar ausencias o vacaciones */}
    <div className="bg-white shadow-md rounded-lg p-6 mb-10">
      <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">Registrar Ausencia o Vacación</h2>
      <form action="{{ route('ausencias_vacaciones.store') }}" method="POST" className="grid grid-cols-1 gap-6 md:grid-cols-2">
        
        <div className="flex flex-col">
          <label className="font-semibold text-black dark:text-white">Tipo</label>
          <select className="border rounded p-2 mt-1" name="Tipo">
            <option value="Ausencia">Ausencia</option>
            <option value="Vacaciones">Vacaciones</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="font-semibold text-black dark:text-white">Fecha de Inicio</label>
          <input type="date" className="border rounded p-2 mt-1" name="fechaInicio" />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold text-black dark:text-white">Fecha de Fin</label>
          <input type="date" className="border rounded p-2 mt-1" name="fechaFin" />
        </div>

        <div className="flex flex-col col-span-2">
          <label className="font-semibold text-black dark:text-white">Comentario</label>
          <textarea className="border rounded p-2 mt-1" name="Comentario" placeholder="Comentario sobre la ausencia o vacación (opcional)"></textarea>
        </div>

        <div className="flex flex-col">
          <label className="font-semibold text-black dark:text-white">Empleado</label>
          <select className="border rounded p-2 mt-1" name="idEmpleado">
            {/* Aquí agregarás opciones dinámicamente basadas en los empleados disponibles */}
            <option value="">Selecciona un empleado</option>
          </select>
        </div>

        <div className="col-span-2">
          <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded transition hover:bg-green-800 w-full mt-4">
            Registrar
          </button>
        </div>
      </form>
    </div>

    {/* Tabla para listar tanto ausencias como vacaciones */}
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">Historial de Ausencias y Vacaciones</h2>
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Tipo</th>
            <th className="px-4 py-2">Fecha de Inicio</th>
            <th className="px-4 py-2">Fecha de Fin</th>
            <th className="px-4 py-2">Comentario</th>
            <th className="px-4 py-2">Empleado</th>
          </tr>
        </thead>
        <tbody>
          {/* Aquí iterarás los datos de ausencias y vacaciones */}
          <tr className="border-t">
            <td className="px-4 py-2">Ausencia</td>
            <td className="px-4 py-2">2024-09-01</td>
            <td className="px-4 py-2">2024-09-03</td>
            <td className="px-4 py-2">Enfermedad</td>
            <td className="px-4 py-2">Juan Pérez</td>
          </tr>
          <tr className="border-t">
            <td className="px-4 py-2">Vacaciones</td>
            <td className="px-4 py-2">2024-12-20</td>
            <td className="px-4 py-2">2025-01-02</td>
            <td className="px-4 py-2">Vacaciones anuales</td>
            <td className="px-4 py-2">María López</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>


    </AuthenticatedLayout>
    )
}

export default index