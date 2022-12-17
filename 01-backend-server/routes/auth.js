
/*
    Ruta : /api/auth
*/

const { Router } = require('express');
const { login } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();


router.post('/', 
    [
    check('password', 'El password es un campo requerido.').not().isEmpty(),
    check('email', 'El email es un campo requerido.').isEmail(),
    validarCampos
    ], 
    login);


module.exports = router;