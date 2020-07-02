const helpers = {}

helpers.isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()){
        req.flash('succes_msg', 'Bienvenido')
        return next();
    
    }else{
        req.flash('error_msg', 'No estas Autorizado');
        res.redirect('/login')
    }
}

module.exports = helpers;