//var io = require('socket.io').listen(80);
var io = require('socket.io').listen(23156);
console.log("Starting Socket Server");
io.sockets.on('connection', function (socket) {
	console.log("A");
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
//io.sockets.on('connect', function (socket) {
//	console.log("F");
//	var timeout = setTimeout(emitListing, 5000);

//	var emitListing = function() {
//		var list = [];
//		list.push("Game 1");
//		list.push("Game 2");
//		socket.emit('GameListing', list);
//		console.log("Emitted Listing.");
//	}
//});
//console.log("Starting peer service..");
//var PeerServer = require('peer').PeerServer;
//var server = new PeerServer({ port: 9000, path: '/', key: 'peerjs' });
//server.on('connection', function (id) {
//	console.log("Connection Brokered");
//});
//server.on("disconnect", function (id) {
//	console.log("Peer disconnected from server");
//});
