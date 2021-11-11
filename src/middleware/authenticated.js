'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const secret = 'seed-de-desarrollo';

// ====================
// Verificar Token
// ====================
let verificarToken = (req, res, next) => {
    if (!req.headers.token) {
        return res.status(404).send({ ok: false, message: 'La petición no tiene la cabecera autenticación requerida.' });
    }

    var token = req.headers.token.replace(/['"]+/g, '');

    try {
        var payload = jwt.decode(token, secret);

        if (payload.exp <= moment().unix()) {
            return res.status(404).send({ ok: false, message: 'El token a expirado.' })
        }
    } catch (error) {
        return res.status(404).send({ ok: false, message: 'El token no es válido.' })
    }

    req.usuario = payload;
    next();
}

// ====================
// Verificar admin rol
// ====================
let verificarAdminRole = (req, res, next) => {
    let usuario = req.usuario;

    if (usuario.rol == 'admin') {
        next();
    } else {
        return res.status(500).send({ ok: false, message: 'Sólo el usuario con rol de administrador puede realizar esta acción.' });
    }
}

module.exports = {
    verificarToken,
    verificarAdminRole
}