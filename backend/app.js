const express = require('express');
const mongoose = require('mongoose');
const personRoutes = require('./routes/person.routes.js');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json()); // Middleware para parsear JSON

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log('Conectado a MongoDB');
})
.catch(err => {
    console.error('Error al conectar a MongoDB:', err);
});

app.use('/api/persons', personRoutes); // Usar las rutas de personas

module.exports = app; // Exporta la aplicación para usarla en otros archivos