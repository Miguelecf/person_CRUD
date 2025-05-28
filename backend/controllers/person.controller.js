const Person = require("../models/person.model.js");

// No se hace un module.exports porque se exportan funciones individuales

// Crear una nueva persona
exports.createPerson = async (req, res) => {
  try {
    const person = new Person(req.body);
    await person.save();
    res.status(201).json(person);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtener todas las personas
exports.getAllPersons = async (req, res) => {
  try {
    const persons = await Person.find();
    res.status(200).json(persons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener una persona por ID
exports.getPersonById = async (req, res) => {
  try {
    const person = await Person.findById(req.params.id);
    if (!person) {
      return res.status(404).json({ message: "Persona no encontrada" });
    }
    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar una persona por ID
exports.updatePersonById = async (req, res) => {
  try {
    const person = await Person.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!person) {
      return res.status(404).json({ message: "Persona no encontrada" });
    }
    res.status(200).json(person);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar una persona por ID
exports.deletePersonById = async (req, res) => {
  try {
    const person = await Person.findByIdAndDelete(req.params.id);
    if (!person) {
      return res.status(404).json({ message: "Persona no encontrada" });
    }
    res.status(204).json({ message: "Persona eliminada con éxito" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Buscar personas por dni
exports.findByDni = async (req, res) => {
    const dni = req.params.dni;
    try {
        const person = await Person.findOne({ dni: dni });
        if (!person) {
            return res.status(404).json({ message: "Persona no encontrada" });
        }
        res.status(200).json(person);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
