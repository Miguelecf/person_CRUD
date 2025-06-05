import type { Person } from "../types/person.types";

const API_URL = "http://localhost:3001/api/persons";

// Crear una nueva persona en la API
export async function createPerson(person: Person): Promise<Person> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(person),
  });
  if (!response.ok) {
    throw new Error("Failed to create person");
  }
  return response.json();
}

// Obtener todas las peronas desde la API
export async function getAllPersons(): Promise<Person[]> {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch persons");
  }
  return response.json();
}

// Obtener una persona por ID desde la API
export async function getPersonById(id: string): Promise<Person> {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch person with id ${id}`);
  }
  return response.json();
}

// Actualizar una persona por ID en la API
export async function updatePerson(
  id: string,
  person: Person
): Promise<Person> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(person),
  });
  if (!response.ok) {
    throw new Error(`Failed to update person with id ${id}`);
  }
  return response.json();
}

// Eliminar una persona por ID en la API
export async function deletePerson(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(`Failed to delete person with id ${id}`);
  }
}

// Buscar personas por dni
export async function searchPersonsByDni(dni: string): Promise<Person[]> {
  const response = await fetch(`${API_URL}/search/dni=${dni}`);
  if (!response.ok) {
    throw new Error(`Failed to search persons with dni ${dni}`);
  }
  return response.json();
}
