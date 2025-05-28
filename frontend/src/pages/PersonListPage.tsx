import { useEffect, useState } from "react";
import { getAllPersons } from "../api/personApi";
import type { Person } from "../types/person.types";

function PersonListPage() {
    const [persons, setPersons] = useState<Person[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchPersons() {
            try {
                const data = await getAllPersons();
                setPersons(data);
            } catch (err) {
                setError("Failed to load persons");
            } finally {
                setLoading(false);
            }
        }
        fetchPersons();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Person List</h1>
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>DNI</th>
                        <th>Age</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {persons.map((person) => (
                        <tr key={person._id}>
                            <td>{person.firstName}</td>
                            <td>{person.lastName}</td>
                            <td>{person.dni}</td>
                            <td>{person.age}</td>
                            <td>{person.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default PersonListPage;