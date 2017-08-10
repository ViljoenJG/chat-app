var socket = io();

socket.on('connect', function() {
  console.log('connected to server');

  socket.emit('create-message', {
    from: 'GreatClient21',
    text: 'This is new message from the client'
  })
});

socket.on('disconnect', function() {
  console.log('disconnected from server')
});

socket.on('new-message', function(msg) {
  console.log('message was received', JSON.stringify(msg, null, 2))
});
