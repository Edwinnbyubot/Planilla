import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm, Link } from '@inertiajs/react'; 
const edit = ({empleado}) => {
  console.log(empleado);
  const initialValues={
    Nombre:empleado.Nombre,
    Apellido:empleado.Apellido,
    FechaContrato:empleado.FechaContrato,
    Salario:empleado.Salario,
    Estado:empleado.Estado,
    Cargo:empleado.Cargo
  }


  const {data,errors,setData,put}=useForm(initialValues)

  const submit=(e) =>{
    e.preventDefault();
    console.log(data)
    put(route('empleados.update',empleado))
  }


    return(
      <AuthenticatedLayout>
      <div class="container mx-auto p-6">
      <h1 class="text-3xl font-bold text-center mb-6">Actualizar de Empleados</h1>    
      <div class="bg-white shadow-md rounded-lg p-6 mb-10">
        <h2 class="text-xl font-semibold mb-4">Actualizar Datos</h2>
        <form  onSubmit={submit} class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div class="flex flex-col">
            <label class="font-semibold">Nombre</label>
            
            <input
              type="text"
              class="border rounded p-2 mt-1"
              placeholder="Escribe el nombre del empleado"
              id='Nombre'
              value={data.Nombre}
              onChange={(e)=>setData("Nombre",e.target.value)}
              name="Nombre"
            />
          </div>
          <div class="flex flex-col">
            <label class="font-semibold">Apellido</label>
            <input
              type="text"
              class="border rounded p-2 mt-1"
              placeholder="Escribe el apellido del empleado"
              id='Apellido'
              value={data.Apellido}
              onChange={(e)=>setData("Apellido",e.target.value)}
              name="Apellido"
            />
          </div>
          <div class="flex flex-col">
            <label class="font-semibold">Fecha de Contrato</label>
            <input
              type="date"
              class="border rounded p-2 mt-1"
              id='FechaContrato'
              value={data.FechaContrato}
              onChange={(e)=>setData("FechaContrato",e.target.value)}
              name="FechaContrato"
            />
          </div>
          <div class="flex flex-col">
            <label class="font-semibold">Cargo</label>
            <input
              type="text"
              class="border rounded p-2 mt-1"
              placeholder="Escribe el cargo del empleado"
              id='Cargo'
              value={data.Cargo}
              onChange={(e)=>setData("Cargo",e.target.value)}
              name="Cargo"
            />
          </div>
          <div class="flex flex-col">
            <label class="font-semibold">Salario</label>
            <input
              type="number"
              class="border rounded p-2 mt-1"
              placeholder="Escribe el salario"
              id='Salario'
              value={data.Salario}
              onChange={(e)=>setData("Salario",e.target.value)}
              name="Salario"
            />
          </div>
          <div class="flex flex-col">
            <label class="font-semibold">Estado</label>
            <select class="border rounded p-2 mt-1" name="Estado"
              id='Estado'
              value={data.Estado}
              onChange={(e)=>setData("Estado",e.target.value)}>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </div>
          <div class="col-span-2">      
            <button
              type="submit"
              class="w-full bg-blue-600 text-white p-2 rounded mt-4 hover:bg-blue-700"
            >
              Actualizar Empleado
            </button>
            
          </div>
        </form>
      </div>
      
    </div>
    </AuthenticatedLayout>
    );
};
export default edit;