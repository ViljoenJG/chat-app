var socket = io();

socket.on('connect', function() {
  console.log('connected to server');
});

socket.on('disconnect', function() {
  console.log('disconnected from server');
});

socket.on('new-message', function(message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);
});

socket.on('new-location-message', function(message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html)
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
