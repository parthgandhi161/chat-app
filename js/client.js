const socket = io('http://127.0.0.1:8888');

const form = document.getElementById('send-container');
const message = document.getElementById('message');
const messagecontainer = document.querySelector('.container');

const name = prompt("enter your name to join");
socket.emit('new-user-joined', name);