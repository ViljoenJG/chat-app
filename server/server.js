const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage, generateLocationMessage } = require('./utils/message');

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../public')));
app.use(logRequest);

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('new-message', generateMessage('Admin', 'Welcome to the chat app'));
  socket.broadcast.emit('new-message', generateMessage('Admin', 'New user joined'));

  socket.on('create-message', ({ text, from }, callback) => {
    const message = generateMessage(from, text);

    console.log('Incomming message: ', message);
    io.emit('new-message', message);
    callback('Message received');
  });

  socket.on('create-location-message', (coords) => {
    io.emit('new-location-message', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });

  socket.on('disconnect', () => {
    console.log('user disconnected from server')
  });
});

app.use(notFound404);
app.use(errorHandler);

server.listen(port, () => {
  console.log(`server running on port ${ port }`);
});

/************
  Methods
*************/

function notFound404(req, res, next){
  res.status(404);
  res.type('txt').send('Not found');
}

function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
}

function log(line) {
  let timeStamp = new Date().toString();
  console.log(`${ timeStamp } ${ line }`);
}

function logRequest(req, res, next) {
  log(`${ req.method } ${ req.url }`);
  next();
}
