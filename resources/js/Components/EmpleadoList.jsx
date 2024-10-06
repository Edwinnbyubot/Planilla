import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Empleados = () => {
  const [empleados, setEmpleados] = useState([]);
  const [nuevoEmpleado, setNuevoEmpleado] = useState({
    Nombre: '',
    Apellido: '',
    FechaContrato: '',
    Cargo: '',
    Salario: '',
    Estado: 'Activo',
  });

  // Función para obtener los empleados desde la API
  const fetchEmpleados = async () => {
    const response = await axios.get('http://tu-dominio.com/api/empleados');
    setEmpleados(response.data);
  };

  useEffect(() => {
    fetchEmpleados();
  }, []);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    setNuevoEmpleado({
      ...nuevoEmpleado,
      [e.target.name]: e.target.value,
    });
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://tu-dominio.com/api/empleados', nuevoEmpleado);
      fetchEmpleados(); // Actualiza la lista de empleados
      setNuevoEmpleado({
        Nombre: '',
        Apellido: '',
        FechaContrato: '',
        Cargo: '',
        Salario: '',
        Estado: 'Activo',
      });
    } catch (error) {
      console.error('Error al guardar el empleado:', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Gestión de Empleados</h1>

      {/* Formulario para agregar empleados */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-10">
        <h2 className="text-xl font-semibold mb-4">Registrar Nuevo Empleado</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex flex-col">
            <label className="font-semibold">Nombre</label>
            <input
              type="text"
              name="Nombre"
              value={nuevoEmpleado.Nombre}
              onChange={handleChange}
              className="border rounded p-2 mt-1"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Apellido</label>
            <input
              type="text"
              name="Apellido"
              value={nuevoEmpleado.Apellido}
              onChange={handleChange}
              className="border rounded p-2 mt-1"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Fecha de Contrato</label>
            <input
              type="date"
              name="FechaContrato"
              value={nuevoEmpleado.FechaContrato}
              onChange={handleChange}
              className="border rounded p-2 mt-1"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Cargo</label>
            <input
              type="text"
              name="Cargo"
              value={nuevoEmpleado.Cargo}
              onChange={handleChange}
              className="border rounded p-2 mt-1"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Salario</label>
            <input
              type="number"
              name="Salario"
              value={nuevoEmpleado.Salario}
              onChange={handleChange}
              className="border rounded p-2 mt-1"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Estado</label>
            <select
              name="Estado"
              value={nuevoEmpleado.Estado}
              onChange={handleChange}
              className="border rounded p-2 mt-1"
            >
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

      {/* Tabla de empleados */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Lista de Empleados</h2>
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Apellido</th>
              <th className="px-4 py-2">Cargo</th>
              <th className="px-4 py-2">Salario</th>
              <th className="px-4 py-2">Fecha de Contrato</th>
              <th className="px-4 py-2">Estado</th>
            </tr>
          </thead>
          <tbody>
            {empleados.length > 0 ? (
              empleados.map((empleado) => (
                <tr key={empleado.id} className="border-t">
                  <td className="px-4 py-2">{empleado.Nombre}</td>
                  <td className="px-4 py-2">{empleado.Apellido}</td>
                  <td className="px-4 py-2">{empleado.Cargo}</td>
                  <td className="px-4 py-2">{empleado.Salario}</td>
                  <td className="px-4 py-2">{empleado.FechaContrato}</td>
                  <td className="px-4 py-2">{empleado.Estado}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No hay empleados registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Empleados;
