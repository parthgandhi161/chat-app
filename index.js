// node server 

const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

let users={};

const publicPath = path.join(__dirname, '/public');
console.log(path.join(__dirname, '/public'));
const port = process.env.PORT || 3000
let app = express();
let server = http.createServer(app);
let io = socketIO(server);


app.use(express.static(publicPath));


io.on('connection', (socket) => {
  console.log("A new user just connected");

  socket.on('disconnect', () => {
    console.log('User was disconnected');
    socket.broadcast.emit('left', users[socket.id]);
    delete users[socket.id];
  });

  socket.on('new-user-joined', name => {
    users[socket.id] = name;
    console.log(users[socket.id]);
    socket.broadcast.emit('user-joined', name);
  })

  socket.on('send', message =>{
    socket.broadcast.emit('receive', {message: message, name: users[socket.id]});
  })

})

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
})












































// const express= require('express');
// const socket= require('socket.io');

// const users= {};

// const app = express();
// const server = app.listen(8000, () => console.log('Server started on port 8000 '));

// const io= socket(server);

// // app.use(express.static("public"));

// app.get("/", (req,res) => {

//   res.write("conneted");

// })

// io.on('connection', socket =>{
//   console.log("made connection");
// })
































// io.on('connection', socket =>{

//   socket.on('new-user-joined', name =>{

//     users[socket.id] = name;
//     socket.broadcast.emit('user-joined', name);

//   })

//   socket.on('send', message =>{

//     socket.broadcast.emit('receive', {message: message, name: users[socket.id]});

//   })

// })















// const express = require("express");
// const socket = require("socket.io");

// const users={};

// // App setup
// const PORT = 5500;
// const app = express();
// const server = app.listen(PORT, function () {
//   console.log(`Listening on port ${PORT}`);
//   console.log(`http://localhost:${PORT}`);
// });

// // Static files
// app.use(express.static("public"));

// // Socket setup
// const io = socket(server);



//     io.on('connection', socket =>{

//              socket.on('new-user-joined',name =>{
//                  console.log("new user", name);
//                  users[socket.id] = name;
//                 //  socket.broadcast.emit('user-joined');
//              });
//             });

// // io.on('connection', socket =>{

// //     socket.on('new-user-joined',name =>{
// //         console.log("new user", name);
// //         users[socket.id] = name;
// //         socket.broadcast.emit('user-joined');
// //     });

// //     socket.on('send',message =>{
// //         message.broadcast.emit('receive', {message: message, name: users[socket.id]})
// //     });

// // });

// const io = require("socket.io")(5000,{
//     cors:{
//         origin:["http://localhost:5500"],
//     }
// });

// const users={};

// io.on('connection', socket =>{

//     socket.on('new-user-joined',name =>{
//         console.log("new user", name);
//         users[socket.id] = name;
//        //  socket.broadcast.emit('user-joined');
//     });
//    });