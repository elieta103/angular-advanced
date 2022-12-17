const jwt = require('jsonwebtoken');


//Esta funcion debe ser sincrona, debe esperar a que concluya para devolver la respuesta
//Se usa la promesa, Con la promesa puedo usar async, await
const generarJWT = (uid)=>{

    //Se convierte la funcion para que retorne una promesa
    return new Promise( (resolve, reject)=>{
        const payload = {
            uid
        }
    
        jwt.sign(payload, 
                process.env.JWT_SECRET, 
                {expiresIn: '12h'}, 
                (err, token)=>{
                    if(err){
                        console.log(err);
                        reject('No se pudo generar el JWT');
                    }else{
                        resolve(token);
                    }
                });
    });

}

module.exports = { generarJWT }