import React, { useEffect } from 'react';
import axios from 'axios';

const ActualizarSueldo = ({ empleadoId, sueldoId }) => {

    useEffect(() => {
        const actualizarBonificacionesYDeducciones = async () => {
            try {
                // 1. Obtener las bonificaciones y deducciones del empleado y sueldo actual
                const response = await axios.get(`/api/bonificaciones-deducciones/${empleadoId}/${sueldoId}`);

                if (response.status === 200) {
                    const { bonificaciones, deducciones } = response.data;

                    // 2. Sumar todas las bonificaciones y deducciones
                    const totalBonificaciones = bonificaciones.reduce((acc, curr) => acc + curr.monto, 0);
                    const totalDeducciones = deducciones.reduce((acc, curr) => acc + curr.monto, 0);

                    // 3. Obtener el sueldo original (antes de bonificaciones y deducciones)
                    const responseSueldo = await axios.get(`/api/sueldo/${sueldoId}`);
                    const sueldoOriginal = responseSueldo.data.sueldo;

                    // 4. Calcular el nuevo sueldo
                    const nuevoSueldo = sueldoOriginal + totalBonificaciones - totalDeducciones;

                    // 5. Actualizar el registro del sueldo con el nuevo monto
                    await axios.put(`/api/sueldo/${sueldoId}`, {
                        totalBonificaciones,
                        totalDeducciones,
                        sueldoActualizado: nuevoSueldo
                    });

                    console.log('Sueldo actualizado con éxito');

                } else {
                    console.error('Error al obtener bonificaciones/deducciones');
                }
            } catch (error) {
                console.error('Error al actualizar el sueldo:', error);
            }
        };

        actualizarBonificacionesYDeducciones();
    }, [empleadoId, sueldoId]);

    return null; // No devuelve ninguna interfaz
};

export default ActualizarSueldo;
