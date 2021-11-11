'use strict'

const Libro = require('../models/libro.model');

// === CREAR LIBRO ===
function crearLibro(req, res) {
    let body = req.body;
    let libro = new Libro({
        autor: body.autor,
        titulo: body.titulo,
        edicion: body.edicion,
        palabrasClave: body.palabrasClave,
        descripcion: body.descripcion,
        temas: body.temas,
        copias: body.copias,
        disponibles: body.disponibles
    });

    libro.save((err, libroCreado) => {
        if (err) {
            return res.status(500).send({ ok: false, message: 'Hubo un error en la petición.' });
        }

        if (!libroCreado) {
            return res.status(500).send({ ok: false, message: 'Error al crear el libro.' });
        }

        return res.status(200).send({ ok: true, libroCreado });
    });
}

// === OBTENER LIBROS ===
function obtenerLibros(req, res) {
    Libro.find().exec((err, librosEncontrados) => {
        if (err) {
            return res.status(500).send({ ok: false, message: 'Hubo un error en la petición.' });
        }

        if (!librosEncontrados) {
            return res.status(404).send({ ok: false, message: 'Hubo un error en la consulta o no existen datos para mostrar.' });
        }

        return res.status(200).send({ ok: true, librosEncontrados });
    });
}

// === OBTENER LIBRO POR ID ===
function obtenerLibro(req, res) {
    let id = req.params.id;

    Libro.findById(id, (err, libroEncontrado) => {
        if (err) {
            return res.status(500).send({ ok: false, message: 'Hubo un error en la petición.' });
        }

        if (!libroEncontrado) {
            return res.status(404).send({ ok: false, message: 'El ID del libro no existe.' });
        }

        return res.status(200).send({ ok: true, libroEncontrado });
    });
}

// === MODIFICAR LIBRO ===
function modificarLibro(req, res) {
    let id = req.params.id;
    let body = req.body;

    Libro.findByIdAndUpdate(id, body, { new: true, useFindAndModify: true }, (err, libroModificado) => {
        if (err) {
            return res.status(500).send({ ok: false, message: 'Hubo un error en la petición. Recuerde que el título del libro debe ser único y puede que el título ya esté registrado.' });
        }

        if (!libroModificado) {
            return res.status(404).send({ ok: false, message: 'El ID ingresado no existe.' });
        }

        return res.status(200).send({ ok: true, libroModificado });
    });
}

// === ELIMINAR LIBRO ===
function eliminarLibro(req, res) {
    let id = req.params.id;

    Libro.findByIdAndDelete(id, { useFindAndModify: true }, (err, libroEliminado) => {
        if (err) {
            return res.status(500).send({ ok: false, message: 'Hubo un error en la petición.' });
        }

        if (!libroEliminado) {
            return res.statsu(404).send({ ok: false, message: 'El ID ingresado no existe.' });
        }

        return res.status(200).send({ ok: true, libroEliminado });
    });
}

module.exports = {
    crearLibro,
    obtenerLibros,
    obtenerLibro,
    modificarLibro,
    eliminarLibro
}