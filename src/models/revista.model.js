'use strict'

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

// Validaciones
let frecuenciasValidas = {
    values: ['Baja', 'Media', 'Alta'],
    message: '{VALUE} no es una frecuencia válida.'
}

// Modelo
let revistaSchema = new Schema({
    autor: { type: String, required: [true, 'El autor es necesario.'] },
    titulo: { type: String, unique: true, required: [true, 'El título es necesario.'] },
    edicion: { type: Number, required: [true, 'La edición es necesaria.'] },
    descripcion: { type: String, required: [true, 'La descripción es necesaria.'] },
    frecuenciaActual: { type: String, default: 'Baja', enum: frecuenciasValidas },
    ejemplares: { type: Number, required: [true, 'El número de ejemplares es necesario.'] },
    temas: { type: [], required: [true, 'Los temas son necesarios.'] },
    palabrasClave: { type: [], required: [true, 'Las palabras clave son necesarias.'] },
    copias: { type: Number, required: [true, 'El número de copias totales es necesario.'] },
    disponibles: { type: Number, required: [true, 'El númeos de copias disponibles físicamente es necesario.'] }
});

revistaSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único.' });

module.exports = mongoose.model('revistas', revistaSchema);