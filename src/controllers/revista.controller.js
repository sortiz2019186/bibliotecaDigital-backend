'use strict'

const Revista = require('../models/revista.model');

// === CREAR REVISTA ===
function crearRevista(req, res) {
    let body = req.body;
    let revista = new Revista({
        autor: body.autor,
        titulo: body.titulo,
        edicion: body.edicion,
        descripcion: body.descripcion,
        frecuenciaActual: body.frecuenciaActual,
        ejemplares: body.ejemplares,
        temas: body.temas,
        palabrasClave: body.palabrasClave,
        copias: body.copias,
        disponibles: body.disponibles
    });

    revista.save((err, revistaCreada) => {
        if (err) {
            return res.status(500).send({ ok: false, err });
        }

        if (!revistaCreada) {
            return res.status(500).send({ ok: false, message: 'Error al crear la revista.' });
        }

        return res.status(200).send({ ok: true, revistaCreada });
    });
}

// === OBTENER REVISTAS ===
function obtenerRevistas(req, res) {
    Revista.find().exec((err, revistasEncontradas) => {
        if (err) {
            return res.status(500).send({ ok: false, message: 'Hubo un error en la petición.' });
        }

        if (!revistasEncontradas) {
            return res.status(404).send({ ok: false, message: 'Hubo un error en la consulta o no existen datos para mostrar.' });
        }

        return res.status(200).send({ ok: true, revistasEncontradas });
    });
}

// === OBTENER REVISTA POR ID ===
function obtenerRevista(req, res) {
    let id = req.params.id;

    Revista.findById(id, (err, revistaEncontrada) => {
        if (err) {
            return res.status(500).send({ ok: false, message: 'Hubo un error en la petición.' });
        }

        if (!revistaEncontrada) {
            return res.status(404).send({ ok: false, message: 'El ID ingresado no existe.' });
        }

        return res.status(200).send({ ok: true, revistaEncontrada });
    });
}

// === MODIFICAR REVISTA ===
function modificarRevista(req, res) {
    let id = req.params.id;
    let body = req.body;

    Revista.findByIdAndUpdate(id, body, { new: true, useFindAndModify: true }, (err, revistaModificada) => {
        if (err) {
            return res.status(500).send({ ok: false, message: 'Hubo un error en la petición.' });
        }

        if (!revistaModificada) {
            return res.status(404).send({ ok: false, message: 'El ID ingresado no existe.' });
        }

        return res.status(200).send({ ok: true, revistaModificada });
    });
}

// === ELIMINAR REVISTA ===
function eliminarRevista(req, res) {
    let id = req.params.id;

    Revista.findByIdAndDelete(id, { useFindAndModify: true }, (err, revistaEliminada) => {
        if (err) {
            return res.status(500).send({ ok: false, message: 'Hubo un error en la petición.' });
        }

        if (!revistaEliminada) {
            return res.status(404).send({ ok: false, message: 'El ID ingresado no existe.' });
        }

        return res.status(200).send({ ok: true, revistaEliminada });
    });
}

module.exports = {
    crearRevista,
    obtenerRevistas,
    obtenerRevista,
    modificarRevista,
    eliminarRevista
}