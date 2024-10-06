<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('sueldos', function (Blueprint $table) {
            $table->id();
            $table->date('fechaPago');
            $table->decimal('SalarioBruto',8,2);
            $table->decimal('Deducciones',8,2);
            $table->decimal('Bonificaciones',8,2);
            $table->decimal('Impuestos',8,2);
            $table->decimal('SalarioNeto',8,2);
            $table->unsignedBigInteger('idEmpleado');
            $table->foreign('idEmpleado')->references('id')->on('empleados');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sueldos');
    }
};
