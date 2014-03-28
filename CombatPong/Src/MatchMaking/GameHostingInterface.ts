﻿/// <reference path="../utilityfunctions.ts" />


module CombatPong {
	export class GameHostingInterface {
		private stageData: StageData;
		private gameHostingManager: GameHostingManager;
		constructor(stageData: StageData) {
			this.stageData = stageData;
			this.gameHostingManager =
				new GameHostingManager(this.stageData, this.updateGameListing);
			//if (stageData.isNetEnabled)
			//	this.displayButtons();
		}
		private updateGameListing = (peerIDS:string[])=> {
            this.clearInterface();
            Util.Interface.d.appendChild(document.createTextNode("Combat Pong"));
            Util.Interface.d.appendChild(document.createElement("br"));
			if (this.stageData.isNetEnabled == false) {
				this.displayCouldNotContactServer();
				return;
			}
            for (var i = 0; i < peerIDS.length; ++i) {
                this.displayJoinableGame("Game " + i.toString(), peerIDS[i]);
            }
			this.displayHostOption();
		}
		private displayJoinableGame(gameTitle:string, gameID:string) {
			var t: Text = document.createTextNode(gameTitle + "-----");
			Util.Interface.d.appendChild(t);
			var b: HTMLElement = Util.Interface.addStandardButton("Join");
            b.onclick = () => {
                this.joinGame(gameID);
            }
			Util.Interface.d.appendChild(document.createElement("br"));
		}
		private displayHostOption() {
			var b:HTMLElement = Util.Interface.addStandardButton("Host Game");
            b.onclick = this.hostGame;
            if (this.gameHostingManager.isHosting()) {
                Util.Interface.d.appendChild(document.createElement("br"));
                Util.Interface.d.appendChild(document.createTextNode("You are currently hosting a game"));
            }
		}
        private hostGame = () => {
            this.gameHostingManager.hostGame("TEST");
            this.gameHostingManager.requestList();
        }
		private clearInterface() {
			Util.Interface.clearInterface();
		}
        private joinGame(game: string) {
            this.gameHostingManager.stopHostingGame();
            this.gameHostingManager.requestList();

            //alert("Joined game " + game.toString());
        }
		private displayCouldNotContactServer() {
			this.clearInterface();
			var t: Text = document.createTextNode("Could not connect to lobby");
			Util.Interface.d.appendChild(t);
		}
	};
}