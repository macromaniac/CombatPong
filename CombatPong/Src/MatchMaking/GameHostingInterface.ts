/// <reference path="../utilityfunctions.ts" />


module CombatPong {
	export class GameHostingInterface {
		private stageData: StageData;
		private gameHostingManager: GameHostingManager;
		constructor(stageData: StageData) {
			this.stageData = stageData;
			this.displayButtons();
			this.gameHostingManager =
				new GameHostingManager(this.stageData, this.updateGameListing);
			//if (stageData.isNetEnabled)
			//	this.displayButtons();
		}
		private updateGameListing(peerIDS:string[]) {
			alert("ARRG");
		}
		private displayButtons() {
			this.clearInterface();
			if (this.stageData.isNetEnabled == false) {
				this.displayCouldNotContactServer();
				return;
			}

			this.displayJoinableGame("Game 1");
			this.displayJoinableGame("Game 2");
			this.displayHostOption();
		}
		private displayJoinableGame(gameTitle:string) {
			var t: Text = document.createTextNode(gameTitle + "-----");
			Util.Interface.d.appendChild(t);
			var b: HTMLElement = Util.Interface.addStandardButton("Join");
			Util.Interface.d.appendChild(document.createElement("br"));
		}
		private displayHostOption() {
			Util.Interface.addStandardButton("Host Game");
		}
		private clearInterface() {
			Util.Interface.clearInterface();
		}
		private displayCouldNotContactServer() {
			this.clearInterface();
			var t: Text = document.createTextNode("Could not connect to lobby");
			Util.Interface.d.appendChild(t);
		}
	};
}