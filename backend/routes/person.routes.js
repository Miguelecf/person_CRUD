const express = require('express');
const personController = require('../controllers/person.controller.js');
const router = express.Router();

// Rutas para manejar a las personas
router.post('/', personController.createPerson); // Crear una nueva persona
router.get('/', personController.getAllPersons); // Obtener todas las personas          
router.get('/:id', personController.getPersonById); // Obtener una persona por ID
router.put('/:id', personController.updatePersonById); // Actualizar una persona por ID
router.delete('/:id', personController.deletePersonById); // Eliminar una persona por ID
router.get('/search/:dni',personController.findByDni); // Buscar persona por DNI

module.exports = router; // Exporta el router para usarlo en app.js