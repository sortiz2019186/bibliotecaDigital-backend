'use strict'

const express = require('express');
let libroController = require('../controllers/libro.controller');

// Middleware
let { verificarToken, verificarAdminRole } = require('../middleware/authenticated');

// Rutas
let api = express.Router();

api.post('/crearLibro', [verificarToken, verificarAdminRole], libroController.crearLibro);
api.get('/obtenerLibros', [verificarToken, verificarAdminRole], libroController.obtenerLibros);
api.get('/obtenerLibro/:id', [verificarToken, verificarAdminRole], libroController.obtenerLibro);
api.put('/modificarLibro/:id', [verificarToken, verificarAdminRole], libroController.modificarLibro);
api.delete('/eliminarLibro/:id', [verificarToken, verificarAdminRole], libroController.eliminarLibro);

module.exports = api;