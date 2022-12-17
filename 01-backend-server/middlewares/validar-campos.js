const { validationResult } = require('express-validator');

const validarCampos  = (req, res, next) =>{

    //Paso por las validaciones del middleware check
    //Mostrar los mensajes de error
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({
            ok: false,
            errores : errores.mapped()
        });
    }

    //Todos los middleware, traen el next(), ya que se pueden encadenar varios, si todo ok, se llama
    next();
}

module.exports = { validarCampos }