import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
const index = ({empleado}) => {
  console.log(empleado);

  const initialValues={
    fechaPago: "",
    SalarioBruto: "",
    Deducciones: "",
    Bonificaciones: "",
    Impuestos: "",
    SalarioNeto: "",
    idEmpleado: "",
  }

  const {data,errors,setData,post}=useForm(initialValues)

  const handleEmpleadoSelect = (empleadoId) => {
    setData('idEmpleado', empleadoId); // Actualizar el ID del empleado seleccionado
  };

  const submit = (e) => {
    e.preventDefault();
    post(route('sueldos.store')); // Cambié la ruta para adaptarla a la que usas en la base de datos
  };

    return (
    <AuthenticatedLayout>

        <Head title="Sueldo" />
<div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50 min-h-screen">
  <div className="container mx-auto p-6">
    <h1 className="text-3xl font-bold text-center mb-6 text-black dark:text-white">Gestión de Sueldos</h1>

    {/* Formulario para registrar nuevo sueldo */}
    <div className="bg-white shadow-md rounded-lg p-6 mb-10">
      <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">Registrar Nuevo Sueldo</h2>
      <form onSubmit={submit} className="grid grid-cols-1 gap-6 md:grid-cols-2">
        
        <div className="flex flex-col">
          <label className="font-semibold text-black dark:text-white">Fecha de Pago</label>
          <input 
            type="date"
            className="border rounded p-2 mt-1"
            id='fechaPago'
            value={data.fechaPago}
            onChange={(e) => setData('fechaPago', e.target.value)}
            name="fechaPago" />
        </div>
        
        <div className="flex flex-col">
          <label className="font-semibold text-black dark:text-white">Salario Bruto</label>
          <input type="number" 
            className="border rounded p-2 mt-1"
            id='SalarioBruto'
            value={data.SalarioBruto}
            onChange={(e) => setData('SalarioBruto', e.target.value)}
            name="SalarioBruto"
          />
        </div>
        
        <div className="flex flex-col">
          <label className="font-semibold text-black dark:text-white">Deducciones</label>
          <input type="number" 
            className="border rounded p-2 mt-1"
            id='Deducciones'
            value={data.Deducciones}
            onChange={(e) => setData('Deducciones', e.target.value)}
            name="Deducciones"
            />
        </div>
        
        <div className="flex flex-col">
          <label className="font-semibold text-black dark:text-white">Bonificaciones</label>
          <input type="number" 
            className="border rounded p-2 mt-1"
            id='Bonificaciones'
            value={data.Bonificaciones}
            onChange={(e) => setData('Bonificaciones', e.target.value)}
            name="Bonificaciones"
          />
        </div>
        
        <div className="flex flex-col">
          <label className="font-semibold text-black dark:text-white">Impuestos</label>
          <input type="number"
            className="border rounded p-2 mt-1"
            id='Impuestos'
            value={data.Impuestos}
            onChange={(e) => setData('Impuestos', e.target.value)}
            name="Impuestos"
          />
        </div>
        
        <div className="flex flex-col">
          <label className="font-semibold text-black dark:text-white">Salario Neto</label>
          <input type="number" 
            className="border rounded p-2 mt-1"
            id='SalarioNeto'
            value={data.SalarioNeto}
            onChange={(e) => setData('SalarioNeto', e.target.value)}
            name="SalarioNeto"
          />
        </div>

        <div className="flex flex-col">
        <label className="font-semibold">Empleado</label>
            <select
              id='idEmpleado'
              value={data.idEmpleado}
              onChange={(e) => setData('idEmpleado', e.target.value)}
              className="border rounded p-2 mt-1"
              name="idEmpleado"
            >
              <option value="">Selecciona un Empleado</option>
              {empleado.map((emple) => (
                <option key={emple.id} value={emple.id}>
                  {`${emple.Nombre} ${emple.Apellido}`}
              </option>
        ))}
            </select>
        </div>

        <div className="col-span-2">
          <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded transition hover:bg-green-800 w-full mt-4">
            Registrar Sueldo
          </button>
        </div>
      </form>
    </div>

    {/* Tabla de deducciones */}
    <div className="bg-white shadow-md rounded-lg p-6 mb-10">
      <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">Deducciones</h2>
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Tipo de Deducción</th>
            <th className="px-4 py-2">Monto</th>
            <th className="px-4 py-2">Fecha</th>
            <th className="px-4 py-2">Empleado</th>
          </tr>
        </thead>
        <tbody>
          {/* Aquí iterarás los datos de deducciones */}
          <tr className="border-t">
            <td className="px-4 py-2">ISR</td>
            <td className="px-4 py-2">500.00</td>
            <td className="px-4 py-2">2024-10-01</td>
            <td className="px-4 py-2">Juan Pérez</td>
          </tr>
        </tbody>
      </table>
    </div>

    {/* Tabla de bonificaciones */}
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">Bonificaciones</h2>
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Tipo de Bonificación</th>
            <th className="px-4 py-2">Monto</th>
            <th className="px-4 py-2">Fecha</th>
            <th className="px-4 py-2">Empleado</th>
          </tr>
        </thead>
        <tbody>
          {/* Aquí iterarás los datos de bonificaciones */}
          <tr className="border-t">
            <td className="px-4 py-2">Bono de Productividad</td>
            <td className="px-4 py-2">300.00</td>
            <td className="px-4 py-2">2024-10-01</td>
            <td className="px-4 py-2">Juan Pérez</td>
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