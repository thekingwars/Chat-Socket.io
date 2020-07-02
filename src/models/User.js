//Creando las variables
const mongoose = require('mongoose');
//Destructurando los objetos Schema y model
const { Schema, model } = mongoose;
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
    usuario: {type: String, required: true},
    password: {type: String, required: true},
    date: {type: Date, default: Date.now()}
});


//Encryptando la contraseña
userSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, salt);
    return hash;
}

//Comparando si la contraseña insertada es igual a la de la base de datos
userSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

//Exportando el modelo de la base de dato
module.exports = model('User', userSchema);