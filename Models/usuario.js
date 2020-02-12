'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsuarioSchema = Schema({
	nombre: String,
	password: String,
	role: String,
	vista: String, 
	fichas: String

});

module.exports = mongoose.model('Usuario', UsuarioSchema);