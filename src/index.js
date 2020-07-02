const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const hbsExpress = require('express-handlebars');
const passport = require('passport');
const socketIo = require('socket.io');

//inicializaciones
const app = express();
require('./database');
require('./config/passport');

//Configuraciones
app.set('port', process.env.PORT || 4050);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', hbsExpress({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layout'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs'); 

//Middlewares
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'mychatapp',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Global Variables
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

//Routes
app.use(require('./routes/index'));
app.use(require('./routes/user'));
app.use(require('./routes/chat'));

//Archivos Estaticos
app.use(express.static(path.join(__dirname, 'public')));

//Servidor
const server = app.listen(app.get('port'), () => {
    console.log('Servidor iniciado en el puerto', app.get('port'));
});

//Socket.io
const io = socketIo.listen(server);
require('./chat')(io);
