$(document).ready(function(){
    const socket = io();

    //Declarando las variables
    
    const message = $('#message');
    const messageForm = $('#message-form');
    const chat = $('#chat');

    //Escuchando los eventos
    messageForm.submit(e => {
        e.preventDefault();
        socket.emit('send message', message.val());
        message.val('');
    });

    socket.on('new message', function(data){
        chat.append(data + '<br>');
    });
});