// src/components/Layout.tsx
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-white transition-colors duration-300">
      <header className="border-b border-gray-800">
        <div className="mx-auto w-full max-w-7xl px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight text-white" >
            Admin de Personas
          </h1>
        </div>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-8">
        {children}
      </main>

      <footer className="border-t border-gray-800 py-4 text-sm text-gray-400 text-center">
        &copy; {new Date().getFullYear()} Miguel Dev — Todos los derechos reservados
      </footer>
    </div>
  );
}
// Layout.tsx
