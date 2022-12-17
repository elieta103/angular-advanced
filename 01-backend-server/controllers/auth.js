const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt')


const login = async (req, res = response ) => {
    const {email, password} = req.body;
    try{

        //Verificar email
        const usuarioDB = await Usuario.findOne({email});
        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe user con ese mail'
            });    
        }

        //Verificar password
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if(!validPassword){
            return res.status(404).json({
                ok: false,
                msg: 'Pwd incorrecto'
            }); 
        }

        // Generar token, generarToken devuelve una Promesa...
        const token = await generarJWT(usuarioDB.id)

        
        res.status(200).json({
            ok: true,
            token
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado.'
        });
    }   
}


module.exports = { login }