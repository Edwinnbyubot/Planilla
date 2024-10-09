import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import LinesChart from '@/Components/LinesChart';
import CircularChart from '@/Components/CircularChart';
import { Head, Link } from '@inertiajs/react';

const index = ({ empleado, sueldo, ausencia }) => {

    console.log(empleado); 
    console.log(sueldo); 
    console.log(ausencia); 

    const [selectedEmpleado, setSelectedEmpleado] = useState('');
    const [empleadoSueldo, setEmpleadoSueldo] = useState(null);

    const handleEmpleadoSelect = (e) => {
        const empleadoId = e.target.value;
        setSelectedEmpleado(empleadoId);

        // Filtrar el sueldo del empleado seleccionado
        const sueldoEmpleado = sueldo.find(s => s.idEmpleado === parseInt(empleadoId));

        if (sueldoEmpleado) {
            setEmpleadoSueldo(sueldoEmpleado);
        } else {
            setEmpleadoSueldo(null);
        }
    };

    return (
    <AuthenticatedLayout>

        <h1 className="text-3xl font-bold text-center mb-6">Reporte de Empleados</h1>    
        <h2 className="text-xl font-semibold mb-4">Grafico de Lineas</h2>
        <div className="bg-white shadow-md rounded-lg p-6 mb-10" style={{ width:"850px",height:"450px" }}>
            <div style={{ width:"100%" ,height:"100%"}}>
                <LinesChart/>
            </div>
        </div>
        
        <h2 className="text-xl font-semibold mb-4">Grafico de Torta</h2>
        <div>
            <h2 className="text-xl font-semibold mb-4">Salario Neto del Empleado</h2>
            <select
                value={selectedEmpleado}
                onChange={handleEmpleadoSelect}
                className="border rounded p-2 mt-1"
                name="idEmpleado"
            >
                <option value="">Selecciona un empleado</option>
                {empleado.map((emple) => (
                    <option key={emple.id} value={emple.id}>
                        {`${emple.Nombre} ${emple.Apellido}`}
                    </option>
                ))}
            </select>

            <h2 className="text-xl font-semibold mb-4">Grafico de Torta</h2>
            <div className="bg-white shadow-md rounded-lg p-6 mb-10" style={{ width:"850px", height:"450px" }}>
                <div style={{ width:"100%", height:"100%" }}>
                    {empleadoSueldo ? (
                        <CircularChart sueldo={empleadoSueldo} />
                    ) : (
                        <p>Selecciona un empleado para ver el gráfico</p>
                    )}
                </div>
            </div>
        </div>
        
    </AuthenticatedLayout>
    )
}

export default index