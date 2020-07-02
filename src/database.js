//Variables
const mongoose = require('mongoose');
var uri = 'mongodb://localhost/pasantia-chat';
//Variable de Conexión
const db = mongoose.connection

//Creando la conexión
mongoose.connect(uri,{
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
    .catch(err => console.error(err));


//Función que verifica si esta conectado a la base de datos
db.once('open',() => {
    console.log('MongoDB Esta conectado en el servidor:',uri)
});

//Funcion que manda un error en caso de que no funcione la bd
db.on('error', (err) => {
    console.error(err)
});