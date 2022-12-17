/*
    Ruta : /api/usuarios
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { getUsuarios, crearUsuarios, actualizarUsuario, eliminarUsuario } = require('../controllers/usuarios');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

// middleware : validarJWT
router.get('/', [validarJWT],  getUsuarios);

router.post('/', 
    [
        check('nombre', 'El nombre es un campo requerido.').not().isEmpty(),
        check('password', 'El password es un campo requerido.').not().isEmpty(),
        check('email', 'El email es un campo requerido.').isEmail(),
        validarCampos   //Este Middleware Personalizado, Deberia siempre ser el ultimo, ya que valida los errores creados
    ],  
    crearUsuarios);

router.put('/:id', 
    [
        validarJWT,
        check('nombre', 'El nombre es un campo requerido.').not().isEmpty(),
        check('email', 'El email es un campo requerido.').isEmail(),
        check('role', 'El role es un campo requerido.'),
        validarCampos   //Este Middleware Personalizado, Deberia siempre ser el ultimo, ya que valida los errores creados
    ],  
    actualizarUsuario)


router.delete('/:id', [validarJWT], eliminarUsuario);

module.exports = router;