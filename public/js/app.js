var socket = io();

socket.on('connect', function() {
  console.log('connected to server');
});

socket.on('disconnect', function() {
  console.log('disconnected from server');
});

socket.on('new-message', function(msg) {
  console.log('message was received', JSON.stringify(msg, null, 2));
});
