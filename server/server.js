const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../public')));
app.use(logRequest);

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('new-message', {
    from: 'SomeServer43',
    text: 'This message originated on the server',
    cretedAt: new Date().getTime()
  });

  socket.on('create-message', (msg) => {
    msg.createdAt = new Date().getTime();
    console.log('Incomming message: ', msg);
  })

  socket.on('disconnect', () => {
    console.log('user disconnected from server')
  });
})

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
