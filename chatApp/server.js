const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.use(express.static(__dirname));

io.on('connection', (socket) => {
    console.log('A user connected');
  
    socket.on('chat message', (message) => {
      io.emit('chat message', message);
    });
  
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});