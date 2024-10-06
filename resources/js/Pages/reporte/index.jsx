import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Empleados from '@/Components/EmpleadoList';
import { Head, Link } from '@inertiajs/react';

const index = () => {
  return (
    <AuthenticatedLayout>
    <div>index</div>
    
    </AuthenticatedLayout>
  )
}

export default index