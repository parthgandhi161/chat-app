const io = require('socket.io')(8888);

const users={};

io.on('connection', socket =>{

    socket.on('new-user-joined',name =>{
        console.log("new user", name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined');
    });

    socket.on('send',message =>{
        message.broadcast.emit('receive', {message: message, name: users[socket.id]})
    });

});

