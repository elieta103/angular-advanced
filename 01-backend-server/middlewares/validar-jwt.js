const { request } = require('express');
const jwt = require('jsonwebtoken')

const validarJWT = (req = request, res, next) =>{

    //leer token de los headers x-token
    const token = req.header('x-token');
    console.log('Token recuperado del header: ', token);

    if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        });
    }

    try{
        // uid Es el valor con el que se crea el payload del token
        //{ uid: '6398e679961e121c7cae1751', iat: 1671236201, exp: 1671279401 } 
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        
        //Se puede enviar informacion hacia el controller,  es decir que se agrega en el middleware y se envia al controller
        //solo si el token es correcto, agrega el uid al request
        req.uid = uid;

         //Todos los middleware, traen el next(), ya que se pueden encadenar varios, si todo ok se llama next()
        next();
    }catch(error){
        return res.status(401).json({
            ok: false,
            msg: 'Token invalido.'
        });
    }
}

module.exports = { validarJWT }