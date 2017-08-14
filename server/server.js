const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');
const { Users } = require('./utils/users');

let app = express();
let server = http.createServer(app);
let io = socketIO(server);
let users = new Users();

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../public')));
app.use(logRequest);

io.on('connection', (socket) => {

  socket.on('join', ({ room, name }, callback) => {
    if (!isRealString(room) || !isRealString(name)) {
      return callback('Name and room name required');
    }

    socket.join(room);
    users.removeUser(socket.id);
    users.addUser(socket.id, name, room);

    io.to(room).emit('update-user-list', users.getUserList(room));

    socket.emit('new-message', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.to(room).emit('new-message', generateMessage('Admin', `${ name } has joined.`));

    callback();
  })

  socket.on('create-message', ({ text, from }, callback) => {
    const message = generateMessage(from, text);

    console.log('Incomming message: ', message);
    io.emit('new-message', message);
    callback();
  });

  socket.on('create-location-message', (coords, callback) => {
    io.emit('new-location-message', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    callback();
  });

  socket.on('disconnect', () => {
    let user = users.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('update-user-list', users.getUserList(user.room));
      io.to(user.room).emit('new-message', generateMessage('Admin', `${user.name} has left.`));
    }
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
