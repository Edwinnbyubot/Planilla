// EmpleadoSelector.jsx
import React from 'react';

const EmpleadoSelector = ({ empleados, onSelect }) => {
  // Validar que `empleados` sea un array antes de usar .map()
  if (!Array.isArray(empleados)) {
    return <p>No hay empleados disponibles.</p>; // Mensaje por si no hay datos
  }

  return (
    <div>
      <label className="font-semibold">Seleccione un Empleado</label>
      <select
        onChange={(e) => onSelect(e.target.value)}
        className="border rounded p-2 mt-1 w-full"
        name="empleado_id"
      >
        <option value="">-- Selecciona un Empleado --</option>
        {empleados.map((empleado) => (
          <option key={empleado.id} value={empleado.id}>
            {`${empleado.Nombre} ${empleado.Apellido}`}
          </option>
        ))}
      </select>
    </div>
  );
};

export default EmpleadoSelector;
