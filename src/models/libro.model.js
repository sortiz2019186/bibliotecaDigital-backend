'use strict'

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

// Modelo
let libroSchema = new Schema({
    autor: { type: String, required: [true, 'El autor es necesario.'] },
    titulo: { type: String, unique: true, required: [true, 'El título es necesario.'] },
    edicion: { type: Number, required: [true, 'La edición es necesario.'] },
    palabrasClave: { type: [], required: [true, 'Las palabras clave son necesarias.'] },
    descripcion: { type: String, required: [true, 'La descripción es necesaria.'] },
    temas: { type: [], required: [true, 'Los temas importantes del libro son necesarios.'] },
    copias: { type: Number, required: [true, 'El número de copias totales es necesario.'] },
    disponibles: { type: Number, required: [true, 'El número de copias disponibles físicamente es necesario.'] }
});

libroSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único.' });

module.exports = mongoose.model('libros', libroSchema);