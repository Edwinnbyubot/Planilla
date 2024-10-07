<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ausencia extends Model
{
    use HasFactory;
    protected $fillable = ['Tipo','fechaInicio','fechaFin','Comentario','idEmpleado'];
}
