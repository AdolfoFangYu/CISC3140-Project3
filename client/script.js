const socket = io();

const form = document.getElementById('chat-form');
const input = document.getElementById('message-input');
const roomInput = document.getElementById('room-input');
const messagesList = document.getElementById('messages');

socket.emit('connected');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const room = roomInput.value.trim();
    if (room) {
        socket.emit('join room', room); 
    }
    if (input.value) {
        socket.emit('message', input.value, room);
        input.value = '';
    }
});

socket.addEventListener('message', function(msg) {
    const item = document.createElement('li');
    item.textContent = msg;
    messagesList.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});

socket.addEventListener('join room', function(msg) {
    const item = document.createElement('li');
    item.textContent = msg;
    messagesList.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});



