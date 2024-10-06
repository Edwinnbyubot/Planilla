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
        Schema::create('bonificaciones', function (Blueprint $table) {
            $table->id();
            $table->string('TipoBonificacion');
            $table->decimal('Monto',8,2);
            $table->date('fecha');
            $table->unsignedBigInteger('idEmpleado');
            $table->foreign('idEmpleado')->references('id')->on('empleados');
            $table->unsignedBigInteger('idSueldo');
            $table->foreign('idSueldo')->references('id')->on('sueldos');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bonificaciones');
    }
};
