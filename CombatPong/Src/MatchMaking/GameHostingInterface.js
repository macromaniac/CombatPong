/// <reference path="../utilityfunctions.ts" />
var CombatPong;
(function (CombatPong) {
    var GameHostingInterface = (function () {
        function GameHostingInterface(stageData) {
            this.stageData = stageData;
            this.displayButtons();
            this.gameHostingManager = new CombatPong.GameHostingManager(this.stageData, this.updateGameListing);
            //if (stageData.isNetEnabled)
            //	this.displayButtons();
        }
        GameHostingInterface.prototype.updateGameListing = function (peerIDS) {
            alert("ARRG");
        };
        GameHostingInterface.prototype.displayButtons = function () {
            this.clearInterface();
            if (this.stageData.isNetEnabled == false) {
                this.displayCouldNotContactServer();
                return;
            }

            this.displayJoinableGame("Game 1");
            this.displayJoinableGame("Game 2");
            this.displayHostOption();
        };
        GameHostingInterface.prototype.displayJoinableGame = function (gameTitle) {
            var t = document.createTextNode(gameTitle + "-----");
            Util.Interface.d.appendChild(t);
            var b = Util.Interface.addStandardButton("Join");
            Util.Interface.d.appendChild(document.createElement("br"));
        };
        GameHostingInterface.prototype.displayHostOption = function () {
            Util.Interface.addStandardButton("Host Game");
        };
        GameHostingInterface.prototype.clearInterface = function () {
            Util.Interface.clearInterface();
        };
        GameHostingInterface.prototype.displayCouldNotContactServer = function () {
            this.clearInterface();
            var t = document.createTextNode("Could not connect to lobby");
            Util.Interface.d.appendChild(t);
        };
        return GameHostingInterface;
    })();
    CombatPong.GameHostingInterface = GameHostingInterface;
    ;
})(CombatPong || (CombatPong = {}));
//# sourceMappingURL=GameHostingInterface.js.map
