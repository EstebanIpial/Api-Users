const mongoose = require('mongoose');


let ROLES  = {
    values: ["ADMINISTRADOR", "USUARIO"],
    message: "{VALUE} no es un rol válido",
};

const UserScheme= new mongoose.Schema({
    name: {
        type: String,
        required: [true, "El nombre es obligatorio"],
    },
    email: {
        type: String,
        unique: true,
        required: [true, "El email es obligatorio"],
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, "La contraseña es obligatoria"]
    },
    
    cellphone: {
        type: String,
        required: [true, "El numero de telefono es obligatorio es obligatoria"]
    },
    
    verifyCode: {
        type: String,
        require: false,
    },
    role: {
        type: String,
        default: "USUARIO",
        enum: ROLES,
    },
},{
    timestamps:true,
    versionKey:false

})



module.exports = mongoose.model('users',UserScheme)