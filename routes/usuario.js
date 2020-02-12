var express = require('express');
var usuarioController = require('../controllers/usuario');

var router = express.Router();

var multipart = require('connect-multiparty');

var multipartMiddleware = multipart({uploadDir: './uploads'});

var md_auth = require('../middlewares/autenticate');

router.post('/guardarUsuario', usuarioController.saveUsuario);
router.post('/login', usuarioController.loginUsuario);
router.get('/usuario/:id', usuarioController.getUsuario);
router.get('/fichas/:id', usuarioController.getFichas);
router.put('/actualizausuario/:id', md_auth.ensureAuth, usuarioController.updateUsuario);
router.get('/imgjuego/:juego', usuarioController.ImagenJuego);

module.exports = router;

