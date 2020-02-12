'use strict'

var bcrypt = require('bcrypt-nodejs');
var Usuario = require('../Models/usuario');
var jwt = require('../servicios/jwt');
var path = require('path');
var fs = require('fs');

var controller = {

	saveUsuario(req, res){
		var params = req.body;
		var usuario = new Usuario();

		if(params.nombre && params.password){
			usuario.nombre = params.nombre;
						
			Usuario.find({nombre: usuario.nombre.toLowerCase()}).exec((err, users)=>{
				if(err) return res.status(500).send({message: 'error en la peticion'});
				if(users && users.length >=1){
					 return res.status(200).send({message: 'el usuario que quieres registrar ya existe'});
				}else{
					bcrypt.hash(params.password, null, null, (err, hash) =>{
						usuario.password = hash;

						usuario.save((err, usuarioGuardado) =>{
							if(err) return res.status(500).send({message: 'error al guardar el usuario'});

							if(usuarioGuardado){
								res.status(200).send({usuario: usuarioGuardado});
							}else{
								res.status(404).send({message: 'no se ha registrado el usuario'});
							}
						
						});
					});
				}
			});


			


		}else{
			res.status(200).send({message: 'faltan campos por rellenar!'});
		}

	},

	loginUsuario(req, res){
		var params = req.body;
		var nombre = params.nombre;
		var password = params.password;

		Usuario.findOne({nombre: nombre}, (err, user)=>{
				if(err) return res.status(500).send({message: 'error al recuperar el usuario'});

				if(user){
					bcrypt.compare(password, user.password, (err, check) =>{
						if(check){

							if(params.gettoken){
								return res.status(200).send({
									token: jwt.createToken(user)
								});
							}else{
								user.password = undefined;
								return res.status(200).send({user});
							}	
						}else{
							return res.status(500).send({message: 'el usuario no se ha podido identificar'});
						}
					});
					
				}else{
					return	res.status(404).send({message: 'el usuario no se ha podido identificar!!'});
				}
		});
	},

	getUsuario(req, res){
		var userId = req.params.id;

		Usuario.findById(userId, (err, usuario) =>{
			if(err) return res.status(500).send({message: 'error en la peticion'});
			if(!usuario) return res.status(404).send({message: 'el usuario no existe'});
			return res.status(200).send({usuario});
		});
	},

	updateUsuario: function(req, res){
		var usuarioId = req.params.id;
		var update = req.body;

		Usuario.findByIdAndUpdate(usuarioId, update, {new:true}, (err, usuarioUpdated) =>{
			if (err) return res.status(500).send({message: 'error al devolver los datos'});
			if (!usuarioUpdated) return res.status(404).send({message: 'no se ha podido encontrar el usuario'});
			return res.status(200).send({usuario: usuarioUpdated});
		});
	},

	getFichas: function(req, res){
		var usuarioId = req.params.id;

		Usuario.findById(usuarioId, (err, usuario) =>{
			if(err) return res.status(500).send({message: 'error en la peticion'});
			if(!usuario) return res.status(404).send({message: 'el usuario no existe'});
				var listado = usuario.fichas;
				var listafichas = listado.split(",");
				var i = 1;
				var fichas = new Array;

				for(i = 1; i < listafichas.length; i++){
					var cadenaficha = listafichas[i].split(":");
					var fichaid = cadenaficha[0];
					var juego = cadenaficha[1];
					var ficha = {id: fichaid, juego: juego};
					fichas.push(ficha);
					
				}
			return res.status(200).send({fichas});
			
		});

		

	},	
	
	ImagenJuego: function(req, res){
		var juego = req.params.juego;
		var ruta = 'uploads/juegos/'+ juego + '.jpg';

		fs.exists(ruta, (exists) =>{
			if(exists){
				return res.sendFile(path.resolve(ruta));
			}else{
				return res.status(200).send({
					message: "no existe la imagen..."
				})
			}
		});

	}

}

module.exports = controller;