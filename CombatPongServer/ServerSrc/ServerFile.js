﻿    //var io = require('socket.io').listen(80);
var io = require('socket.io').listen(23156);
io.set('log level', 1); 
var gameList = [];

console.log("Starting Socket Server");

io.sockets.on('connection', function (socket) {

    var hostVal = "";

    socket.on('Request GameList', function (data) {
        socket.emit('GameList', gameList);
    });

    socket.on('Host Game', function (data) {
        hostVal = data;
        if(gameList.indexOf(data)==-1)
            gameList.push(data);
    });

    socket.on('Check If Hosting', function () {
        if (hostVal === "")
            socket.emit("Update Hosting Info", { amIHosting: false });
        else
            socket.emit("Update Hosting Info", { amIHosting: true });
    });
    socket.on('Stop Hosting Game', StopHostingGame);
    socket.on('disconnect', StopHostingGame);

    function StopHostingGame(){
    	if (hostVal != "") {
    		delElementFromGameList(hostVal);
        	hostVal = "";
        }
	}
});


function delElementFromGameList(elemValue) {
    var index = gameList.indexOf(elemValue);
    gameList.splice(index, 1);
}


console.log("Starting peer service..");
var PeerServer = require('peer').PeerServer;
var server = new PeerServer({ port: 9000, path: '/', key: 'peerjs' });
server.on('connection', function (id) {
    console.log("Peer connected to server");
});
server.on("disconnect", function (id) {
    console.log("Peer disconnected from server");
});

