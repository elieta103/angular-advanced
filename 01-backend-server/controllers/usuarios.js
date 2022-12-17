const { response } = require('express');
const Usuario = require('../models/usuario')
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt')


const getUsuarios = async (req, res = response) => {

    //const usuarios = await Usuario.find() // Todos los campos
    const usuarios = await Usuario.find({}, 'nombre email role google')  //Filtra los campos, oculta password


    res.json({
        ok:true,
        usuarios,
        uid: req.uid //Agregado en el middleware por la validacion del token... uid de user que hizo peticion
    })
}


const crearUsuarios = async (req, res = response) => {

    const {email, password} = req.body;

    try{
        const existeEmail = await Usuario.findOne({email});

        if(existeEmail){
           return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado.'
            });
        }

        const usuario = new Usuario(req.body);

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        //Graba en la BD
        const usuarioDB = await usuario.save();   

        // Generar token, generarToken devuelve una Promesa...
        const token = await generarJWT(usuarioDB.id)
    
        //Devolver respuesta
        res.json({
            ok:true,
            usuario,
            token
        })

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado.'
        });
    }   
}

const actualizarUsuario = async (req, res = response) => {

    try{
        //Recuperar parametro
        const uid = req.params.id;
        
        const usuarioDB = await Usuario.findById(uid);
        if(!usuarioDB){
            res.status(404).json({
                ok: false,
                msg: 'No se existe usuario por Id.'
            });
        }

        //Validar token y comprobar si el usuario es correcto
        //Actualizacion de usuario
        // Campos que no se actualizan password, google
        const {password, google, email, ...campos} = req.body;

        //Email no se esta modificando, se puede quitar de los campos que no se actualizan
        if(usuarioDB.email !== email){
        //Esta modificando el mail, verificar que el valor no exista previamente
        const existeEmail = await Usuario.findOne({email});
            if(existeEmail){
                return res.status(400).json({
                    ok: false,
                    msg : 'No se puede actualizar, el email ya esta registrado.'
                });
            }
        }
   
        campos.email = email;

        //Devuelve el usuario antes de la actualizacion, para indicar que devuelva 
        //el campo despues de actualizar se agrega
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new: true});

         //Devolver respuesta
         res.json({
            ok:true,
            usuario: usuarioActualizado
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado.'
        });
    }   

}

const eliminarUsuario = async (req, res = response) =>{

    try{
         //Recuperar parametro
         const uid = req.params.id;
         console.log('Delete id : ',uid)

        const usuarioDB = await Usuario.findById(uid);
        if(!usuarioDB){
            res.status(404).json({
                ok: false,
                msg: 'No se existe usuario por Id.'
            });
        }

        await Usuario.findByIdAndDelete(uid);
        res.status(200).json({
            ok: true,
            msg: 'Usuario Eliminado correctamente'
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado.'
        });
    } 
}


module.exports = { getUsuarios, crearUsuarios, actualizarUsuario, eliminarUsuario}