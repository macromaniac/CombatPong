/// <reference path="../../socket.io-client.d.ts" />
var CombatPong;
(function (CombatPong) {
    var GameHostingManager = (function () {
        function GameHostingManager(stageData, updateGameListingCallback) {
            this.isConnected = false;
            this.stageData = stageData;
            this.updateGameListingCallback = updateGameListingCallback;
            this.connectToGameHostingServer();
        }
        GameHostingManager.prototype.connectToGameHostingServer = function () {
            var socket = io.connect(Util.Conf.hostURL);
            socket.on('news', function (data) {
                console.log(data);
                socket.emit('my other event', { my: 'data' });
            });
            socket.emit('my other event', { my: 'data' });
            //socket.on('GameListing', this.getGameListing);
        };
        GameHostingManager.prototype.getGameListing = function (data) {
            var peerIDS = [];
            this.updateGameListingCallback(peerIDS);
        };
        return GameHostingManager;
    })();
    CombatPong.GameHostingManager = GameHostingManager;
})(CombatPong || (CombatPong = {}));
//# sourceMappingURL=GameHostingManager.js.map
