import React, { useState } from 'react';

const EmpleadoForm = ({ agregarEmpleado }) => {
  const [empleado, setEmpleado] = useState({
    Nombre: '',
    Apellido: '',
    Cargo: '',
    Salario: ''
  });

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    setEmpleado({
      ...empleado,
      [e.target.name]: e.target.value
    });
  };

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (empleado.Nombre && empleado.Apellido && empleado.Cargo && empleado.Salario) {
      agregarEmpleado({ ...empleado, id: Date.now() }); // Generamos un ID único
      setEmpleado({ Nombre: '', Apellido: '', Cargo: '', Salario: '' }); // Limpiar formulario
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="Nombre"
        placeholder="Nombre"
        value={empleado.Nombre}
        onChange={handleChange}
      />
      <input
        type="text"
        name="Apellido"
        placeholder="Apellido"
        value={empleado.Apellido}
        onChange={handleChange}
      />
      <input
        type="text"
        name="Cargo"
        placeholder="Cargo"
        value={empleado.Cargo}
        onChange={handleChange}
      />
      <input
        type="number"
        name="Salario"
        placeholder="Salario"
        value={empleado.Salario}
        onChange={handleChange}
      />
      <button type="submit">Agregar Empleado</button>
    </form>
  );
};

export default EmpleadoForm;
