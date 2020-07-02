module.exports = function(io){
    io.on('connection', socket => {
        console.log('nuevo usuario conectado', socket.id);
        id = socket.id
        //En caso de que se desconecte
        socket.on('disconnect', function(){
            console.log('Usuario desconectado', id)
        })

        socket.on('send message', function(data){
            io.sockets.emit('new message', data);
        });
    });
}