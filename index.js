'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3700;

mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Role', {useNewUrlParser: true, useUnifiedTopology: true})
		.then(()=>{
			console.log("conexion correcta a la Bd");
			// creacion del servidor
			app.listen(port, ()=> {
				console.log("todo correcto, servidor arrancado en puerto "+ port);
				var momentoActual = new Date(); 
				console.log(momentoActual);
			});

		})
		.catch(err => console.log(err));
