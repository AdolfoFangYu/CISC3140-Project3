const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, '../client')));

io.on('connection', (socket) => {
    console.log(`User ${socket.id} connected`);
    
    socket.on('connected', () => {
        io.emit('message', `User ${socket.id} connected`);
    });
    

    socket.on('join room', (room) => {
        socket.join(room);
    });

    socket.on('message', (msg, room) => {
        if (room) {
            io.to(room).emit('message', `User ${socket.id}: ${msg}`);
        } else {
            io.emit('message', `User ${socket.id}: ${msg}`);
        }
    });

    socket.on('disconnect', () => {
        console.log(`User ${socket.id} disconnected`);
        io.emit('message', `User ${socket.id} disconnected`);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
