import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm, Link } from '@inertiajs/react'; 


const index = ({ empleados, sueldos, devoluciones }) => {

    console.log(empleados); 
    console.log(sueldos); 
    console.log(devoluciones); 
    const [actualizar, setActualizar] = useState(false);
    const initialValues= useState({
        tipo: '',
        razon: '',
        monto: '',
        idEmpleado: '',
        idSueldo: '',
    });

    const {data,errors,setData,post}=useForm(initialValues)

    const submit=(e) =>{
        e.preventDefault();
        console.log(data)
        if (!data.monto) {
            alert('El campo monto es requerido');
            return;
        }
        post(route('devoluciones.store')).then(async response => {
            if (response.props.success) {
                // Si la respuesta es exitosa, activar la actualización
                setActualizar(true);
                
                // Llamar a la función de actualizar sueldo
                await fetch(route('sueldo.actualizar', data.idSueldo), {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content // Si usas CSRF
                    },
                    body: JSON.stringify({ idSueldo: data.idSueldo })
                });
            }
        });
    }
    return (
    <AuthenticatedLayout>
<div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50 min-h-screen">
<div className="container mx-auto p-6">
    <div className="bg-white shadow-md rounded-lg p-6 mb-10">
            <h2 className="text-2xl text-black font-bold mb-4">Gestionar Bonificaciones y Deducciones</h2>

            <form onSubmit={submit} className="grid grid-cols-1 gap-6 md:grid-cols-2">

                <div className="flex flex-col ">
                    <label className="font-semibold block text-black -700">Empleado</label>
                    <select
                        name="idEmpleado"
                        id='idEmpleado'
                        value={data.idEmpleado}
                        onChange={(e)=>setData("idEmpleado",e.target.value)}
                        className="border p-2 rounded w-full"
                    >
                        <option value="">Selecciona un empleado</option>
                        {empleados.map((emple) => (
                            <option key={emple.id} value={emple.id}>
                                {`${emple.Nombre} ${emple.Apellido}`}
                            </option>   
                        ))}
                    </select>
                </div>

                <div className="flex flex-col ">
                    <label className="font-semibold block text-black -700">Tipo</label>
                    <select
                        id='tipo'
                        name="tipo"
                        value={data.tipo}
                        onChange={(e)=>setData("tipo",e.target.value)}
                        className="border p-2 rounded w-full"
                    >
                        <option value="">Selecciona el tipo</option>
                        <option value="Bonificación">Bonificación</option>
                        <option value="Deducción">Deducción</option>
                    </select>
                </div>

                <div className="col-span-2">
                    <label className="font-semibold  block text-black -700">Razón</label>
                    <textarea
                        type="text"
                        name="razon"
                        id='razon'
                        value={data.razon}
                        onChange={(e)=>setData("razon",e.target.value)}
                        className="border p-2 rounded w-full"
                    />
                </div>

                <div className="mb-4">
                    <label className="font-semibold  block text-black -700">monto</label>
                    <input
                        type="number"
                        name="monto"
                        id='monto'
                        value={data.monto}
                        onChange={(e)=>setData("monto",e.target.value)}
                        className="border p-2 rounded w-full"
                    />
                </div>

                

                <div className="mb-4">
                    <label className="font-semibold block text-black -700">Sueldo</label>
                    <select
                        name="idSueldo"
                        id='idSueldo'
                        value={data.idSueldo}
                        onChange={(e)=>setData("idSueldo",e.target.value)}
                        className="border p-2 rounded w-full"
                    >
                        <option value="">Selecciona el sueldo</option>
                        {sueldos
                            .filter((sueldos) => sueldos.idEmpleado === parseInt(data.idEmpleado))
                            .map((sueldo) => (
                                <option key={sueldo.id} value={sueldo.id}>
                                    {`Sueldo : ${sueldo.id}, Fecha del Salario : ${sueldo.fechaPago}`}
                                </option>
                            ))}
                    </select>
                </div>
                <div className="col-span-2">
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 w-full mt-4"
                >
                    Guardar
                </button>
                </div>
            </form>
            </div>

            {actualizar && (
                <ActualizarSueldo empleadoId={data.idEmpleado} sueldoId={data.idSueldo} />
            )}

            <div className="bg-white shadow-md rounded-lg p-6 mb-10">
                <h2 className="text-2xl text-black font-bold mb-4">Lista de Bonificaciones </h2>
                <table className="min-w-full table-auto">
                <thead>
                <tr className="bg-gray-200 text-left text-black">
                <th className="px-4 p-2 ">Empleado</th>
                <th className="px-4 p-2">Tipo</th>
                <th className="px-4 p-2">Razon</th>
                <th className="px-4 p-2">Monto</th>
                <th className="px-4 p-2">Fecha</th>
                <th className="px-4 p-2">Sueldo</th>
                </tr>
                </thead>
                
                <tbody>
                    {devoluciones
                    ?.filter((devolu) => devolu.tipo === "Bonificación") // Filtrar solo las bonificaciones
                    .map((devolu) => {
                    // Encontrar el empleado correspondiente por su idEmpleado
                    const empleado = empleados.find(emp => emp.id === devolu.idEmpleado);
                    
                    return (
                    <tr className="border-t text-black" key={devolu.id}>
                    <td className="px-4 py-2">{empleado ? `${empleado.Nombre} ${empleado.Apellido}` : 'Empleado no encontrado'}</td>
                    <td className="px-4 py-2">{devolu.tipo}</td>
                    <td className="px-4 py-2">{devolu.razon}</td>
                    <td className="px-4 py-2">{devolu.monto}</td>
                    <td className="px-4 py-2">{devolu.fecha}</td>
                    <td className="px-4 py-2">{empleado ? `${empleado.Salario}` : 'Sueldo no encontrado'}</td>
                </tr>
            );
        })}
            </tbody>
        </table>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 mb-10">
        <h2 className="text-2xl text-black font-bold mb-4">Lista de Deducciones</h2>
        <table className="min-w-full table-auto">
            <thead>
            <tr className="bg-gray-200 text-left text-black">
                <th className="px-4 p-2 ">Empleado</th>
                <th className="px-4 p-2">Tipo</th>
                <th className="px-4 p-2">Razon</th>
                <th className="px-4 p-2">Monto</th>
                <th className="px-4 p-2">Fecha</th>
                <th className="px-4 p-2">Sueldo</th>
            </tr>
            </thead>

            
            <tbody>
            {devoluciones
        ?.filter((devolu) => devolu.tipo === "Deducción") // Filtrar solo las bonificaciones
        .map((devolu) => {
            // Encontrar el empleado correspondiente por su idEmpleado
            const empleado = empleados.find(emp => emp.id === devolu.idEmpleado);
        
            return (
                <tr className="border-t text-black" key={devolu.id}>
                    <td className="px-4 py-2">{empleado ? `${empleado.Nombre} ${empleado.Apellido}` : 'Empleado no encontrado'}</td>
                    <td className="px-4 py-2">{devolu.tipo}</td>
                    <td className="px-4 py-2">{devolu.razon}</td>
                    <td className="px-4 py-2">{devolu.monto}</td>
                    <td className="px-4 py-2">{devolu.fecha}</td>
                    <td className="px-4 py-2">{empleado ? `${empleado.Salario}` : 'Sueldo no encontrado'}</td>
                </tr>
            );
        })}
            </tbody>
        </table>
        </div>



        </div>
    </div>
    </AuthenticatedLayout>
    )
}

export default index