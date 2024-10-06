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
        Schema::create('ausencias', function (Blueprint $table) {
            $table->id();
            $table->string('Tipo');
            $table->date('fechaInicio');
            $table->date('fechaFin');
            $table->text('Comentario')->nullable();
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
        Schema::dropIfExists('ausencias');
    }
};
