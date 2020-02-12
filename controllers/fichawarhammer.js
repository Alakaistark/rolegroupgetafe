'use strict'

var fichaWH = require('../Models/fichawarhammer');
var fs = require('fs');
var path = require('path');


var controller = {
	
	saveFicha: function(req, res){
		var ficha = new fichaWH();
		var params = req.body;

		ficha.jugador = params.jugador;
		ficha.nombre = params.nombre;
		ficha.raza = params.raza;
		ficha.religion = params.religion;
		ficha.profesionActual = params.profesionActual;
		ficha.profecionAnterior = params.profecionAnterior;
		ficha.avances = params.avances;
		ficha.pxGanados = params.pxGanados;
		ficha.descripcion = params.descripcion;
		ficha.historia = params.historia;
		ficha.Hai= params.Hai;
		ficha.Hpi = params.Hpi;
		ficha.Fi = params.Fi;
		ficha.Ri = params.Ri;
		ficha.Agi = params.Agi;
		ficha.Inti = params.Inti;
		ficha.Vi = params.Vi;
		ficha.Emi = params.Emi;
		ficha.Hamejora = params.Hamejora;
		ficha.Hpmejora = params.Hpmejora;
		ficha.Fmejora = params.Fmejora;
		ficha.Rmejora = params.Rmejora;
		ficha.Agmejora = params.Agmejora;
		ficha.Intmejora = params.Intmejora;
		ficha.Vmejora = params.Vmejora;
		ficha.Emmejora = params.Emmejora;
		ficha.Ha = params.Ha;
		ficha.Hp = params.Hp;
		ficha.F = params.F;
		ficha.R = params.R;
		ficha.Ag = params.Ag;
		ficha.Int = params.Int;
		ficha.V = params.V;
		ficha.Em = params.Em;
		ficha.Ai = params.Ai;
		ficha.Hi = params.Hi;
		ficha.Bfi = params.Bfi;
		ficha.Bri = params.Bri;
		ficha.Mi = params.Mi;
		ficha.Magi = params.Magi;
		ficha.Pli = params.Pli;
		ficha.Pdi = params.	Pdi;
		ficha.Amejora = params.Amejora;
		ficha.Hmejora = params.Hmejora;
		ficha.Bfmejora = params.Bfmejora;
		ficha.Brmejora = params.Brmejora;
		ficha.Mmejora = params.Mmejora;
		ficha.Magmejora = params.Magmejora;
		ficha.Plmejora = params.Plmejora;
		ficha.Pdmejora = params.Pdmejora;
		ficha.A = params.A;
		ficha.H = params.H;
		ficha.Bf = params.Bf;
		ficha.Br = params.Br;
		ficha.M = params.M;
		ficha.Mag = params.Mag;
		ficha.Pl = params.Pl;
		ficha.Pd = params.Pd;
		ficha.armasCc = params.armasCc;
		ficha.armasP = params.armasP;
		ficha.movCombate = params.movCombate;
		ficha.heridasRec = params.heridasRec;
		ficha.puntosDestino = params.puntosDestino;
		ficha.cabeza = params.cabeza;
		ficha.bderecho = params.bderecho;
		ficha.bizquierdo = params.bizquierdo;
		ficha.cuerpo = params.cuerpo;
		ficha.pderecha = params.pderecha;
		ficha.pizquierda = params.pizquierda;
		ficha.armaduraAv = params.armaduraAv;
		ficha.armaduraBasica = params.armaduraBasica;
		ficha.puntosLocalizacion = params.puntosLocalizacion;
		ficha.conocimientos = params.conocimientos;
		ficha.habilidadesBasicas = params.habilidadesBasicas;
		ficha.habilidadesSecundarias = params.habilidadesSecundarias;
		ficha.talentos = params.talentos;
		ficha.carga = params.carga;
		ficha.monedero = params.monedero;
		ficha.objetos = params.objetos;
		ficha.avatar = params.avatar;
		ficha.juego = params.juego;
		ficha.master = params.master;
		
		ficha.save((err, fichaStored) =>{
			if (err) return res.status(500).send({message: 'error al guardar'});
			if (!fichaStored) return res.status(404).send({message: 'no se ha podido guardar'});
			return res.status(200).send({ficha: fichaStored});
		});
	},


	getFicha: function(req, res){
		var fichaId = req.params.id;

		fichaWH.findById(fichaId, (err, ficha)=>{
			if (err) return res.status(500).send({message: 'error al devolver los datos'});
			if (!ficha) return res.status(404).send({message: 'no se ha podido encontrar la ficha'});
			return res.status(200).send({ficha});
		});

	},

	getFichas: function(req, res){
		var jugador = req.params.usuario;

		fichaWH.find({jugador}, (err, ficha)=>{
			if (err) return res.status(500).send({message: 'error al devolver los datos'});
			if (!ficha) return res.status(404).send({message: 'no se ha podido encontrar la ficha'});
			return res.status(200).send({ficha});
		});

	},


	updateFicha: function(req, res){
		var fichaId = req.params.id;
		var update = req.body;

		fichaWH.findByIdAndUpdate(fichaId, update, {new:true}, (err, fichaUpdated) =>{
			if (err) return res.status(500).send({message: 'error al devolver los datos'});
			if (!fichaUpdated) return res.status(404).send({message: 'no se ha podido encontrar las fichas'});
			return res.status(200).send({ficha: fichaUpdated});
		});
	},

	deleteFicha: function(req, res){
		var fichaId = req.params.id;
		
		fichaWH.findByIdAndRemove(fichaId, (err, fichaDeleted) =>{
			if (err) return res.status(500).send({message: 'error al devolver los datos'});
			if (!fichaDeleted) return res.status(404).send({message: 'no se ha podido encontrar las fichas'});
			return res.status(200).send({ficha: fichaDeleted});
		});

	},

	imgFicha: function(req, res){
		var fichaId = req.params.id;
		var fileName = 'imagen no subida...';

		if(req.files){
			
			var rutaArchivo = req.files.avatar.path;
			var fileSplit = rutaArchivo.split('/');
			var nombreArchivo = fileSplit[1];
			var extSplit = nombreArchivo.split('\.');
			var fileExt = extSplit[1];

			if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){
				fichaWH.findByIdAndUpdate(fichaId, {avatar: nombreArchivo}, {new:true}, (err, fichaUpdated) =>{
					if (err) return res.status(500).send({message: 'la imagen no se ha subido'});
					if (!fichaUpdated) return res.status(404).send({message: 'no se ha podido encontrar la ficha'});
					return res.status(200).send({ficha: fichaUpdated});
		    	});
			}else{
				fs.unlink(rutaArchivo, (err) =>{
					return res.status(200).send({message: 'el archivo no es una imagen'});
				});
			}

		}else{
			return res.status(200).send({
				message: nombreArchivo
			});
		}

	},

	getImg: function(req, res){

	},

	getFondo: function(req, res){
		var ruta = "uploads/juegos/fondofichawarhammer.jpg";

		return res.sendFile(path.resolve(ruta));
	}
};

module.exports = controller;