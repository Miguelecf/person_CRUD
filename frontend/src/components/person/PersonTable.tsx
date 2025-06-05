// src/components/person/PersonTable.tsx
import type { Person } from '../../types/person.types';

type Props = {
  persons: Person[];
  onEdit: (person: Person) => void;
  onDelete: (id: string) => void;
};

export default function PersonTable({ persons, onEdit, onDelete }: Props) {
  return (
    <div className="overflow-x-auto rounded-lg shadow border border-gray-800">
      <table className="min-w-full bg-gray-900 text-sm text-white">
        <thead className="bg-gray-800 text-gray-400 uppercase tracking-wider">
          <tr>
            <th className="px-6 py-3 text-center">Nombre</th>
            <th className="px-6 py-3 text-center">Apellido</th>
            <th className="px-6 py-3 text-center">DNI</th>
            <th className="px-6 py-3 text-center">Edad</th>
            <th className="px-6 py-3 text-center">Email</th>
            <th className="px-6 py-3 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800">
          {persons.map((person) => (
            <tr key={person._id} className="hover:bg-gray-800 transition-colors duration-200">
              <td className="px-6 py-4">{person.firstName}</td>
              <td className="px-6 py-4">{person.lastName}</td>
              <td className="px-6 py-4">{person.dni}</td>
              <td className="px-6 py-4">{person.age}</td>
              <td className="px-6 py-4">{person.email}</td>
              <td className="px-6 py-4 space-x-2">
                <button
                  className="text-blue-400 hover:text-blue-300 transition"
                  onClick={() => person._id && onEdit(person)}
                >
                  Editar
                </button>
                <button
                  className="text-red-400 hover:text-red-300 transition"
                  onClick={() => person._id && onDelete(person._id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
