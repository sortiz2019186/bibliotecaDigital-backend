'use strict'

const express = require('express');
let usuarioController = require('../controllers/usuario.controller');

// Middleware
let { verificarToken, verificarAdminRole } = require('../middleware/authenticated');

// Rutas
let api = express.Router();

api.post('/crearUsuario', [verificarToken, verificarAdminRole], usuarioController.crearUsuario);
api.post('/login', usuarioController.login);
api.get('/obtenerUsuarios', [verificarToken, verificarAdminRole], usuarioController.obtenerUsuarios);
api.get('/obtenerUsuario/:id', [verificarToken, verificarAdminRole], usuarioController.obtenerUsuario);
api.put('/modificarUsuario/:id', [verificarToken, verificarAdminRole], usuarioController.modificarUsuario);
api.delete('/eliminarUsuario/:id', [verificarToken, verificarAdminRole], usuarioController.eliminarUsuario);

module.exports = api;