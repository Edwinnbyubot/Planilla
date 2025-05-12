<?php
namespace Tests\Feature;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Artisan;
use Tests\TestCase;

class EmpleadoTest extends TestCase
{
    use RefreshDatabase; // Para garantizar que cada prueba comience con una base de datos limpia.    
    public function test_store_empleado()
    {
        $data = [
            'Nombre' => 'John',
            'Apellido' => 'Doe',
            'FechaContrato' => '2023-10-01',
            'Cargo' => 'Desarrollador',
            'Salario' => 50000,
            'Estado' => 'Activo'
        ];
        $response = $this->post(route('empleados.store'), $data);
        $this->assertDatabaseHas('empleados', [
            'Nombre' => 'John',
            'Apellido' => 'Doe',
            'Cargo' => 'Desarrollador',
            'Salario' => 50000,
            'Estado' => 'Activo'
        ]);
        $response->assertRedirect(route('empleados.index'));
    }
    public function test_store_empleado_validation_errors()
    {
        // Intentamos crear un empleado con datos faltantes
        $data = [
            'Nombre' => '',
            'Apellido' => '',
            'FechaContrato' => '',
            'Cargo' => '',
            'Salario' => '',
            'Estado' => ''
        ];

        // Realizamos una solicitud POST a la ruta
        $response = $this->post(route('empleados.store'), $data);

        // Verificamos que la respuesta contenga errores de validación
        $response->assertSessionHasErrors([
            'Nombre', 'Apellido', 'FechaContrato', 'Cargo', 'Salario', 'Estado'
        ]);
    }
}
