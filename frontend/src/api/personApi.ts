import type { Person } from "../types/person.types";

const API_URL = "http://localhost:3001/api/persons";

export async function getAllPersons(): Promise<Person[]> {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch persons");
  }
  return response.json();
}
