'use strict'

const mongoose = require('mongoose');
const uniqueValitator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

// Validaciones
let rolesValidos = {
    values: ['admin', 'estudiante', 'bibliotecario'],
    message: '{VALUE} no es un rol válido'
}

// Modelo
let usuarioSchema = new Schema({
    carnetCUI: { type: Number, unique: true, required: [true, 'El carnet o CUI es necesario.'] },
    nombres: { type: String, required: [true, 'Los nombres son necesarios.'] },
    apellidos: { type: String, required: [true, 'Los apellidos son necesarios.'] },
    username: { type: String, unique: true, required: [true, 'El username es necesario.'] },
    rol: { type: String, default: 'estudiante', enum: rolesValidos },
    email: { type: String, unique: true, required: [true, 'El email es necesario.'] },
    password: { type: String, required: [true, 'La contraseña es necesaria.'] },
});

// Eliminar "password" de la respuesta
usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}

usuarioSchema.plugin(uniqueValitator, { message: '{PATH} debe ser único.' });

module.exports = mongoose.model('usuarios', usuarioSchema);