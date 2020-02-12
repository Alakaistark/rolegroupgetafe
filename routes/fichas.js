'use strict'

var express = require('express');
var warhammerController = require('../controllers/fichawarhammer');


var router = express.Router();

var multipart = require('connect-multiparty');

var multipartMiddleware = multipart({uploadDir: './uploads'});

var md_auth = require('../middlewares/autenticate');


//rutas warhammer
router.post('/guardarwarhammer', warhammerController.saveFicha); //guardar ficha
router.get('/fichawarhammer/:id', warhammerController.getFicha); //get ficha
router.put('/actualizafichawarhammer/:id', md_auth.ensureAuth, warhammerController.updateFicha); //actualiza ficha
router.delete('/borrafichawarhammer/:id', md_auth.ensureAuth, warhammerController.deleteFicha); //borra ficha
router.post('/imagenfichawarhammer/:id', md_auth.ensureAuth, multipartMiddleware, warhammerController.imgFicha); //imagen ficha
router.get('/fondowarhammer', warhammerController.getFondo); //get fondo

module.exports = router;