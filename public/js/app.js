var socket = io();

//moment.utc(message.timestamp).local().format('hh:mm a');


socket.on('connect', function () {
	console.log('Connected to socket.io server');
});

socket.on('message', function (message) {
	var momentTimestamp = moment.utc(message.timestamp);

	console.log('You have a new message: '+ message.text);

	jQuery('.messages').prepend('<p><strong>' + momentTimestamp.local().format('h:mm a:  ') + '</strong>' + message.text +'</p>')
});


//Handles submitting of new message
var $form = jQuery('#message-form');

$form.on('submit', function (event) {
	event.preventDefault();

	var $message = $form.find('input[name=message]')

	socket.emit('message', {
		text: $message.val()
	});
	$message.val("");
});


 