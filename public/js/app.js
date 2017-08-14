var socket = io();

socket.on('connect', function() {
  console.log('connected to server');
});

socket.on('disconnect', function() {
  console.log('disconnected from server');
});

socket.on('new-message', function(message) {
  console.log('message was received', JSON.stringify(message, null, 2));

  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();

  socket.emit('create-message', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function(resp) {
    console.log('server resp: ', resp);
    jQuery('[name=message]').val('');
  })
})
