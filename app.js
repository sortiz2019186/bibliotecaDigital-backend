'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// === Importación de Rutas ===
let usuarioRutas = require('./src/routes/usuario.route');
let libroRutas = require('./src/routes/libro.route');
let revistaRutas = require('./src/routes/revista.route');

// === Middlewares ===
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// === Cabeceras ===
app.use(cors());

// === Aplicación de Rutas ===
app.use('/api', usuarioRutas, libroRutas, revistaRutas);

module.exports = app;