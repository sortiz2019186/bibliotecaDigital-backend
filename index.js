'use strict'

const mongoose = require('mongoose');

const app = require('./app');

// === Conexión a MongoDB ===
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/bibliotecaOnline_v2', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('Base de datos ONLINE!');

    app.listen(3000, function() {
        console.log('Aplicación corriendo en el puerto 3000');
    });
}).catch(err => console.log(err));