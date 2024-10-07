import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm, Link } from '@inertiajs/react'; 

const index = ({empleado}) => {

  console.log(empleado);

  const initialValues={
    Nombre:"",
    Apellido:"",
    FechaContrato:"",
    Salario:"",
    Estado:"",
    Cargo:""
  }


  const {data,errors,setData,post}=useForm(initialValues)

  const submit=(e) =>{
    e.preventDefault();
    console.log(data)
    post(route('empleados.store'))
  }


    return(
      <AuthenticatedLayout>
      <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Gestión de Empleados</h1>    
      <div className="bg-white shadow-md rounded-lg p-6 mb-10">
        <h2 className="text-xl font-semibold mb-4">Registrar Nuevo Empleado</h2>
        <form  onSubmit={submit} className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex flex-col">
            <label className="font-semibold">Nombre</label>
            
            <input
              type="text"
              className="border rounded p-2 mt-1"
              placeholder="Escribe el nombre del empleado"
              id='Nombre'
              value={data.Nombre}
              onChange={(e)=>setData("Nombre",e.target.value)}
              name="Nombre"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Apellido</label>
            <input
              type="text"
              className="border rounded p-2 mt-1"
              placeholder="Escribe el apellido del empleado"
              id='Apellido'
              value={data.Apellido}
              onChange={(e)=>setData("Apellido",e.target.value)}
              name="Apellido"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Fecha de Contrato</label>
            <input
              type="date"
              className="border rounded p-2 mt-1"
              id='FechaContrato'
              value={data.FechaContrato}
              onChange={(e)=>setData("FechaContrato",e.target.value)}
              name="FechaContrato"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Cargo</label>
            <input
              type="text"
              className="border rounded p-2 mt-1"
              placeholder="Escribe el cargo del empleado"
              id='Cargo'
              value={data.Cargo}
              onChange={(e)=>setData("Cargo",e.target.value)}
              name="Cargo"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Salario</label>
            <input
              type="number"
              className="border rounded p-2 mt-1"
              placeholder="Escribe el salario"
              id='Salario'
              value={data.Salario}
              onChange={(e)=>setData("Salario",e.target.value)}
              name="Salario"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Estado</label>
            <select className="border rounded p-2 mt-1" name="Estado"
              id='Estado'
              value={data.Estado}
              onChange={(e)=>setData("Estado",e.target.value)}>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </div>
          <div className="col-span-2">      
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded mt-4 hover:bg-blue-700"
            >
              Agregar Empleado
            </button>
            
          </div>
        </form>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Lista de Empleados</h2>
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-left">
                <th className="p-2">Nombre</th>
                <th className="p-2">Apellido</th>
                <th className="p-2">Cargo</th>
                <th className="p-2">Salario</th>
                <th className="p-2">Estado</th>
                <th className="p-2">Fecha de contrato</th>
                <th className="p-2">Accion</th>
            </tr>
          </thead>
          
          <tbody>
            {empleado?.map((emple)=>(
            <tr className="border-t"key={emple.id}>
            <td className="px-4 py-2">{emple.Nombre}</td>
            <td className="px-4 py-2">{emple.Apellido}</td>
            <td className="px-4 py-2">{emple.Cargo}</td>
            <td className="px-4 py-2">{emple.Salario}</td>
            <td className="px-4 py-2">{emple.Estado}</td>
            <td className="px-4 py-2">{emple.FechaContrato}</td>
            <td className="px-4 py-2" >
              <div>
              <Link 
                href={route('empleados.edit',emple.id)}
                className="text-blue-600 hover:underline"
              >
              Editar
              </Link>
              <Link
              as="button"
              method="delete"
              href={route('empleados.destroy', emple.id)}
              className="text-red-600 hover:underline"
              onClick={(e) => {
              if (!confirm('¿Estás seguro de eliminar este empleado?')) {
                  e.preventDefault();
                  }
                }}
              >
              Eliminar
              </Link>
              </div>
            </td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </AuthenticatedLayout>
    );
};
export default index;
