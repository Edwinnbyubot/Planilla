<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sueldo extends Model
{
    use HasFactory;

    protected $fillable = ['fechaPago', 'SalarioBruto', 'Deducciones', 'Bonificaciones', 'Impuestos', 'SalarioNeto','idEmpleado'];
    //definir la relacion del empleado 
public   function  empleado(){
    return $this->belongsTo(Empleado::class,'idEmpleado');
}
}
