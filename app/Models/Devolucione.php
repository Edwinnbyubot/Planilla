<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Devolucione extends Model
{
    use HasFactory;
    protected $fillable=['TipoDevoluccion','Monto','fecha','idEmpleado','idSueldo'];
}
