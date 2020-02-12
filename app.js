'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var path = require('path');

//archivos de rutas
var fichas_rutas = require('./routes/fichas');
var usuario_rutas = require('./routes/usuario');
//middlewares 

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//rutas
app.use('/api', fichas_rutas);
app.use('/api', usuario_rutas);
app.use('/', express.static('client', {redirect: false}));

app.get('*', function(req, res, next){
	res.sendFile(path.resolve('client/index.html'));
});

//exportar
module.exports = app;