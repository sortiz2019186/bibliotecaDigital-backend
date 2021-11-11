'use strict'

const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario.model');
const jwt = require('../services/jwt');

// === CREAR USUARIO ===
function crearUsuario(req, res) {
    let body = req.body;
    let usuario = new Usuario({
        carnetCUI: body.carnetCUI,
        nombres: body.nombres,
        apellidos: body.apellidos,
        username: body.username,
        rol: body.rol,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10)
    });

    Usuario.find({ $or: [{ username: usuario.username }, { email: usuario.email }, { carnetCUI: usuario.carnetCUI }] }).exec((err, usuariosEncontrados) => {
        if (err) {
            return res.status(500).send({ ok: false, message: 'Hubo un error en la petición.' });
        }

        if (usuariosEncontrados && usuariosEncontrados.length >= 1) {
            return res.status(500).send({ ok: false, message: 'El carnet, CUI, usuario o correo ya existe.' });
        } else {
            usuario.save((err, usuarioCreado) => {
                if (err) {
                    return res.status(500).send({ ok: false, message: 'Hubo un error en la petición.' });
                }

                if (!usuarioCreado) {
                    return res.status(500).send({ ok: false, message: 'Error al crear el usuario.' });
                }

                return res.status(200).send({ ok: true, usuarioCreado });
            });
        }
    });
}

// === LOGIN ===
function login(req, res) {
    let body = req.body;

    Usuario.findOne({ username: body.username }, (err, usuarioLogueado) => {
        if (err) {
            return res.status(500).send({ ok: false, message: 'Hubo un error en la petición.' });
        }

        if (!usuarioLogueado) {
            return res.status(400).send({ ok: false, message: 'El usuario ingresado no existe. Por favor, ponerse en contacto con el administrado para solicitar su ingreso.' });
        }

        // Compara las contraseñas
        if (!bcrypt.compareSync(body.password, usuarioLogueado.password)) {
            return res.status(409).send({ ok: false, message: 'La contraseña es incorrecta.' });
        }

        return res.status(200).send({ ok: true, token: jwt.createToken(usuarioLogueado) });
    });
}

// === OBTENER USUARIOS ===
function obtenerUsuarios(req, res) {
    Usuario.find().sort('carnetCUI').exec((err, usuariosEncontrados) => {
        if (err) {
            return res.status(500).send({ ok: false, message: 'Hubo un error en la petición.' });
        }

        if (!usuariosEncontrados) {
            return res.status(404).send({ ok: false, message: 'Hubo un error en la consulta o no existen datos para mostrar.' });
        }

        return res.status(200).send({ ok: true, usuariosEncontrados });
    });
}

// === OBTENER USUARIO POR ID ===
function obtenerUsuario(req, res) {
    let id = req.params.id;

    Usuario.findById(id, (err, usuarioEncontrado) => {
        if (err) {
            return res.status(500).send({ ok: false, message: 'Hubo un error en la petición.' });
        }

        if (!usuarioEncontrado) {
            return res.status(404).send({ ok: false, message: 'El ID ingresado no existe.' });
        }

        return res.status(200).send({ ok: true, usuarioEncontrado });
    });
}

// === MODIFICAR USUARIO ===
function modificarUsuario(req, res) {
    let id = req.params.id;
    let body = req.body;

    delete body.password;

    Usuario.findByIdAndUpdate(id, body, { new: true, useFindAndModify: true }, (err, usuarioModificado) => {
        if (err) {
            return res.status(500).send({ ok: false, message: 'Hubo un error en la petición. El carnet, CUI, username o correo no pueden ser los mismo de usuarios ya existentes. Revise bien los datos.' });
        }

        if (!usuarioModificado) {
            return res.status(404).send({ ok: true, message: 'El ID ingresado no existe.' });
        }

        return res.status(200).send({ ok: true, usuarioModificado });
    });
}

// === ELIMINAR USUARIO ===
function eliminarUsuario(req, res) {
    let id = req.params.id;

    Usuario.findByIdAndDelete(id, { useFindAndModify: true }, (err, usuarioEliminado) => {
        if (err) {
            return res.status(500).send({ ok: false, message: 'Hubo un error en la petición.' });
        }

        if (!usuarioEliminado) {
            return res.status(404).send({ ok: false, message: 'El ID ingresado no existe.' });
        }

        return res.status(200).send({ ok: true, usuarioEliminado });
    });
}


module.exports = {
    crearUsuario,
    login,
    obtenerUsuarios,
    obtenerUsuario,
    modificarUsuario,
    eliminarUsuario
}