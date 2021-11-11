'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const secret = 'seed-de-desarrollo';

function createToken(usuario) {
    let payload = {
        sub: usuario._id,
        carnetCUI: usuario.carnetCUI,
        nombres: usuario.nombres,
        apellidos: usuario.apellidos,
        rol: usuario.rol,
        username: usuario.username,
        email: usuario.email,
        iat: moment().unix(),
        exp: moment().day(10, 'days').unix()
    }

    return jwt.encode(payload, secret);
}

module.exports = {
    createToken
}