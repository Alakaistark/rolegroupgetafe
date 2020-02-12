'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta_alakai';

exports.createToken = function(user){
	var payload = {
		sub: user._id,
		nombre: user.nombre,
		role: user.role,
		fichas: user.fichas,
		iat: moment().unix(),
		exp: moment().add(30, 'days').unix
	};
	return jwt.encode(payload, secret);
};