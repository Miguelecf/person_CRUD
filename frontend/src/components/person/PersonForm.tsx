// src/components/person/PersonForm.tsx
import { useState, useEffect } from 'react';
import type { Person } from '../../types/person.types';

type Props = {
  initialData?: Person;
  onSubmit: (data: Person) => void;
};

export default function PersonForm({ initialData, onSubmit }: Props) {
  const [formData, setFormData] = useState<Person>(
    initialData ?? {
      firstName: '',
      lastName: '',
      dni: '',
      age: 0,
      email: ''
    }
  );

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: name === 'age' ? Number(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {['firstName', 'lastName', 'dni', 'email', 'age'].map((field) => (
        <div key={field}>
          <label className="block capitalize mb-1">{field}</label>
          <input
            type={field === 'age' ? 'number' : 'text'}
            name={field}
            value={(formData as any)[field]}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white"
            required
          />
        </div>
      ))}
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded"
      >
        Guardar
      </button>
    </form>
  );
}
