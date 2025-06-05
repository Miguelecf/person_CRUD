import { useState, useEffect } from "react";
import PersonTable from "../components/person/PersonTable";
import PersonForm from "../components/person/PersonForm";
import Layout from "../components/Layout";
import { getAllPersons, createPerson, updatePerson, deletePerson } from "../api/personApi";
import type { Person } from "../types/person.types";

export default function PersonListPage() {
  const [persons, setPersons] = useState<Person[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPerson, setEditingPerson] = useState<Person | null>(null);

  useEffect(() => {
    getAllPersons().then(setPersons).catch(console.error);
  }, []);

  // Crear nueva persona
  const handleCreate = async (person: Person) => {
    try {
      const created = await createPerson(person); // Llamada a API
      setPersons((prev) => [...prev, created]);   // Actualizo lista
      setIsModalOpen(false);                       // Cierro modal
    } catch (error) {
      console.error("Error creando persona:", error);
    }
  };

  // Editar persona existente
  const handleUpdate = async (person: Person) => {
    if (!person._id) return; // Seguridad

    try {
      const updated = await updatePerson(person._id, person);
      setPersons((prev) =>
        prev.map((p) => (p._id === updated._id ? updated : p))
      );
      setEditingPerson(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error actualizando persona:", error);
    }
  };

  // Abrir modal para crear persona
  const openCreateModal = () => {
    setEditingPerson(null); // No hay persona a editar, es creación
    setIsModalOpen(true);
  };

  // Abrir modal para editar persona
  const openEditModal = (person: Person) => {
    setEditingPerson(person);
    setIsModalOpen(true);
  };

  // Borrar persona
  const handleDelete = async (id: string) => {
    try {
      await deletePerson(id);
      setPersons((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Error eliminando persona:", error);
    }
  };

  // El submit del formulario decide si crea o actualiza
  const handleSubmit = (person: Person) => {
    if (person._id) {
      handleUpdate(person);
    } else {
      handleCreate(person);
    }
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Lista de Personas</h2>
        <button
          onClick={openCreateModal}
          className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded"
        >
          Crear Persona
        </button>
      </div>

      <PersonTable
        persons={persons}
        onEdit={openEditModal}
        onDelete={handleDelete}
      />

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-gray-900 p-6 rounded shadow-lg w-full max-w-md">
            <h3 className="text-lg mb-4 text-white">
              {editingPerson ? "Editar Persona" : "Crear Persona"}
            </h3>
            <PersonForm
              initialData={editingPerson ?? undefined}
              onSubmit={handleSubmit}
            />
            <button
              className="mt-4 text-gray-400 hover:text-gray-200"
              onClick={() => setIsModalOpen(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
}
