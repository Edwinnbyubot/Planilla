import React from 'react';
import Empleados from '@/Components/EmpleadoList';
import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
  const handleImageError = () => {
        document
            .getElementById('screenshot-container')
            ?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document
            .getElementById('docs-card-content')
            ?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };
    return (
        <>
          <Head title="Bienvenido" />
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
              <div className="relative flex min-h-screen flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
                <div className="relative w-full max-w-4xl px-6 lg:max-w-7xl">
                  {/* Header */}
                  <header className="grid grid-cols-2 items-center gap-2 py-10 lg:grid-cols-3">
                    <div className="flex lg:col-start-2 lg:justify-center">
                      <h1 className="text-6xl font-bold text-black dark:text-white">
                        Bienvenido
                      </h1>
                    </div>
                    <nav className="-mx-3 flex flex-1 justify-end">
                      {auth.user ? (
                      <Link
                        href={route('dashboard')}
                        className="border-2 border-green-700 text-green-700 px-4 py-2 rounded transition hover:bg-green-700 hover:text-white  mr-2"
                      >Menu
                      </Link>) : 
                      (<>
                      <Link
                        href={route('login')}
                        className="border-2 border-green-700 text-green-700 px-4 py-2 rounded transition hover:bg-green-700 hover:text-white  mr-2"
                        >Iniciar Sesión
                      </Link>
                      <Link
                        href={route('register')}
                        className="bg-green-700 text-white px-4 py-2 rounded transition hover:bg-green-800"
                        >Registrarse
                      </Link></>
                      )}
                    </nav>
                  </header>
                  {/* Main Content */}
                  <main className="bg-white shadow-md rounded-lg p-10">
                    <h2 className="text-2xl font-semibold text-center text-black dark:text-white mb-6">
                      Gestion de Planilla
                    </h2>
                    <p className="text-center text-lg text-black/70 dark:text-white/70 mb-8">
                      Aquí puedes gestionar todos los empleados de tu organización de manera eficiente. 
                      ¡Explora el menú para comenzar!
                    </p>
                    <div className="flex justify-center space-x-4">
                      <Link
                        href={route('empleados.index')}
                        className="bg-blue-600 text-white px-4 py-2 rounded transition hover:bg-blue-700"
                        >Ver Empleados
                      </Link>
                      <Link
                        href={route('dashboard')}
                        className="bg-red-600 text-white px-4 py-2 rounded transition hover:bg-red-700"
                        >Administrar
                      </Link>
                    </div>
                  </main>
                  {/* Footer */}
                  <footer className="mt-10 text-center text-black/50 dark:text-white/50">
                    <p>Grupo:@Edwin,@Elias,@Peralta</p>
                  </footer>
                </div>
              </div>
            </div>
        </>
    );
}