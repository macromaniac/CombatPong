/// <reference path="node-0.8.8.d.ts" />

console.log("Starting peer service..");
var PeerServer = require('peer').PeerServer;
var server = new PeerServer({ port: 9000, path: '/', key: 'peerjs' });
server.on('connection', function (id) { console.log("Connection Brokered"); });
server.on("disconnect", function (id) { console.log("Peer disconnected from server"); });



var io = require('socket.io').listen(23156);

io.sockets.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
});

