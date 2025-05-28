const mongoose = require("mongoose");

const personSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    dni: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: /^[0-9]{7,8}$/, // Solo números, minimo 7 y máximo 8 dígitos
    },
    age: {
      type: Number,
      required: true,
      min: 0,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Formato de email
    },
  },
  {
    timestamps: true, // Agrega createdAt y updatedAt
  }
);

module.exports = mongoose.model("Person", personSchema);
// Exporta el modelo Person
