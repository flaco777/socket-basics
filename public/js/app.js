var name = getQueryVariable('name') || "Anonymous";
var room = getQueryVariable('room').toLowerCase().trim();
var socket = io();

jQuery(".room-title").text(room);

socket.on('connect', function () {
	console.log('Connected to socket.io server');
	socket.emit('joinRoom', {
		name: name,
		room: room
	});
});

socket.on('message', function (message) {
	var momentTimestamp = moment.utc(message.timestamp);
	var $message = jQuery('.messages');

	console.log('You have a new message: '+ message.text);
	
	$message.prepend(message.text + '<br>');
	$message.prepend('<strong>' + message.name +"@"+ momentTimestamp.local().format('h:mm a:  ') + '</strong>');

});


//Handles submitting of new message
var $form = jQuery('#message-form');

$form.on('submit', function (event) {
	event.preventDefault();

	var $message = $form.find('input[name=message]')

	socket.emit('message', {
		name: name,
		text: $message.val()
	});
	$message.val("");
});


 