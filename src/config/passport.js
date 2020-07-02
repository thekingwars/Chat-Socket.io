//Creando variables
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User')


passport.use(new LocalStrategy({
    usernameField: 'usuario'
}, async (usuario,password, done) => {
    const user = await User.findOne({usuario: usuario});
    if(!user){
        return done(null, false, {message: 'Usuario no encontrado'});
    } else{
        const match = await user.matchPassword(password);
        if(match){
            return done(null, user);
        } else{
            return done(null, false, {message: 'Contraseña Incorrecta'});
        }
    }
}));

passport.serializeUser(function(user,done){
    done(null, user.id)
});

passport.deserializeUser(function(id, done){
    User.findById(id, (err,user) => {
        done(err, user)
    })
})