var CombatPong;
(function (CombatPong) {
    var Game = (function () {
        function Game(stageData) {
            this.logicFrameLengthInMS = 1 / 50 * 1000;
            this.tickNumber = 0;
            this.expectedTickNumber = 0;
            this.stageData = stageData;
            this.world = new CombatPong.World(stageData);
            this.peerMan = new CombatPong.PeerMan();
            this.gameHostingInterface = new CombatPong.GameHostingInterface(stageData);
        }
        Game.prototype.tick = function () {
            this.regulatedTick();
        };

        Game.prototype.regulatedTick = function () {
            this.expectedTickNumber = this.peerMan.timeSinceStartMS() / this.logicFrameLengthInMS;
            while (this.expectedTickNumber > this.tickNumber) {
                if (this.isNetworkTick(this.tickNumber))
                    this.peerMan.tick();
                this.world.tick();
                this.tickNumber++;
            }
        };
        Game.prototype.isNetworkTick = function (tickNo) {
            if (this.stageData.isNetEnabled == false)
                return false;
            var prevTickTime = this.logicFrameLengthInMS * (tickNo - 1);
            var tickTime = this.logicFrameLengthInMS * tickNo;
            var networkTickForPrevTickTime = Math.floor(prevTickTime / CombatPong.PeerMan.defaultNetworkFrameLengthInMS);
            var networkTickForCurrentTickTime = Math.floor(tickTime / CombatPong.PeerMan.defaultNetworkFrameLengthInMS);
            if (networkTickForCurrentTickTime > networkTickForPrevTickTime)
                return true;
            return false;
        };
        return Game;
    })();
    CombatPong.Game = Game;
    ;
    var Timer = (function () {
        function Timer() {
        }
        return Timer;
    })();
    CombatPong.Timer = Timer;
    ;
})(CombatPong || (CombatPong = {}));
//# sourceMappingURL=Game.js.map
