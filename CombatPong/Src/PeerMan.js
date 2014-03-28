var CombatPong;
(function (CombatPong) {
    var PeerMan = (function () {
        function PeerMan() {
        }
        PeerMan.prototype.tick = function () {
        };
        PeerMan.prototype.timeSinceStartMS = function () {
            return 1;
        };
        PeerMan.defaultNetworkFrameLengthInMS = 1 / 8 * 1000;
        return PeerMan;
    })();
    CombatPong.PeerMan = PeerMan;
    ;
    var PeerManServer = (function () {
        function PeerManServer() {
        }
        return PeerManServer;
    })();
    CombatPong.PeerManServer = PeerManServer;
    ;
    var PeerManClient = (function () {
        function PeerManClient(serverID) {
            this.serverID = serverID;
        }
        return PeerManClient;
    })();
    CombatPong.PeerManClient = PeerManClient;
    ;
})(CombatPong || (CombatPong = {}));
//# sourceMappingURL=PeerMan.js.map
