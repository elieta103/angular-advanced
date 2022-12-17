const {Schema, model} = require('mongoose')

//Definicion de los registros
const UsuarioSchema = Schema({
    nombre:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    img:{
        type: String
    },
    role:{
        type: String,
        require: true,
        default: 'USER_ROLE'
    },
    google: {
        type: Boolean,
        default: false
    },
})


//Apariencia del objeto que se lee de la BD
//sustituye _id  por uid
//password no se devuelve
UsuarioSchema.method('toJSON', function(){
    const {__v, _id, password, ...object} = this.toObject();
    object.uid = _id;
    return object;
})



//Exponer el modelo
module.exports = model('Usuario', UsuarioSchema)