'use strict'

const express = require('express');
let revistaController = require('../controllers/revista.controller');

// Middleaware
let { verificarToken, verificarAdminRole } = require('../middleware/authenticated');

// Rutas
let api = express.Router();

api.post('/crearRevista', [verificarToken, verificarAdminRole], revistaController.crearRevista);
api.get('/obtenerRevistas', [verificarToken, verificarAdminRole], revistaController.obtenerRevistas);
api.get('/obtenerRevista/:id', [verificarToken, verificarAdminRole], revistaController.obtenerRevista);
api.put('/modificarRevista/:id', [verificarToken, verificarAdminRole], revistaController.modificarRevista);
api.delete('/eliminarRevista/:id', [verificarToken, verificarAdminRole], revistaController.eliminarRevista);

module.exports = api;