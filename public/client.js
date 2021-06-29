
const socket = io();
 const form = document.getElementById('send-container');
 const messageinput = document.getElementById('message');
 const messagecontainer = document.querySelector('.container');

 const name = prompt("enter your name to join");
 socket.emit('new-user-joined', name);

 const append = (message, position) =>{

    const messageelement = document.createElement('div');
    messageelement.innerText= message;
    messageelement.classList.add('message');
    messageelement.classList.add(position);
    messagecontainer.append(messageelement);
 }

 form.addEventListener('submit', (e)=> {

    e.preventDefault();
    const message= messageinput.value;
    append(` you:   ${message}`, 'right');
    socket.emit('send', message);
    messageinput.value='';
 })

 socket.on('user-joined', name =>{
     append(`${name} joined the chat`, 'right');
 })

 socket.on('receive', data =>{
     append(`  ${data.name}:  ${data.message}`,'left');
 })

 socket.on('left', name =>{
    append(`  ${name} left the chat.`,'left');
})


