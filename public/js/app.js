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
  li.text(message.from + ': ' + message.text);

  jQuery('#messages').append(li);
});

socket.on('new-location-message', function(message) {
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My location</a>');
  a.attr('href', message.url)
  li.text(message.from + ': ')
  li.append(a);

  jQuery('#messages').append(li)
})

jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();

  var msgInput = jQuery('[name=message]');

  socket.emit('create-message', {
    from: 'User',
    text: msgInput.val()
  }, function(resp) {
    msgInput.val('');
  });
});

var locationButton = jQuery('[name=send-location]');

locationButton.on('click', function(e) {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported.');
  }

  locationButton.attr('disabled', 'disabled').text('Sending...');

  navigator.geolocation.getCurrentPosition(function(position) {
    socket.emit('create-location-message', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    }, function() {
      locationButton.removeAttr('disabled').text('Send Location');
    });
  }, function() {
    locationButton.removeAttr('disabled').text('Send Location');
    alert('Unable to fetch location');
  })
});
