const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport')

//Iniciar Sesion

//Renderizando el archivo
router.get('/login', (req,res) => {
    res.render('users/signin')
});

//Creando información de la ruta login
router.post('/login', passport.authenticate('local', {
    successRedirect: '/chat',
    failureRedirect: '/login',
    failureFlash: true
}));

//Registro

//Renderizando archivo
router.get('/register',(req,res) => {
    res.render('users/signup')
});

//Creando información de la ruta register
router.post('/register', async (req,res) => {
    const { usuario, password, confirm_pass } = req.body
    const errors = [];

    //Validando el usuario y la contraseña
    if(usuario.length <= 0 ){
        errors.push({text: 'El usuario no puede estar vacio'})
    }
    if(password.length <= 0 ){
        errors.push({text: 'La contraseña no puede estar vacio'})
    }
    if(password!=confirm_pass){
        errors.push({text: 'Las contraseña no coinciden'});
    }
    if(password.length < 8){
        errors.push({text: 'La contraseña debe tener 8 o más caracteres'});
    }
    if(errors.length > 0){
        res.render('users/signup',{
            errors,
            usuario,
            password,
            confirm_pass
        });
    }else{
        //Validando si 2 usuario ya existen
        const usuarioUser = await User.findOne({usuario: usuario});
        if(usuarioUser){
            req.flash('error_msg','El usuario ya existe');
            res.redirect('/register');
        }
        //Creando la base de datos de los usuarios
        const newUSer = new User({usuario,password});
        //encryptando la contraseña
        newUSer.password = await newUSer.encryptPassword(password);
        //Guardando la base de datos
        await newUSer.save();
        //Mandando un mensaje de que ya esta registrado, una vez registrado
        req.flash('success_msg', 'Estás registrado');
        //Redireccionando a login
        res.redirect('/login');
    }
    console.log(req.body)
});

//Ruta para deslogearse
router.get('/logout', (req,res)=> {
    req.logout();
    req.flash('success_msg', 'Sesión Cerrada');
    res.redirect('/');
});

module.exports = router