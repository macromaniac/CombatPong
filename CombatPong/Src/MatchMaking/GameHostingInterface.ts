

module CombatPong {
	export class GameHostingInterface {
		private stageData: StageData;
		private gameHostingManager: GameHostingManager;

		private peerIDS: string[];

		constructor(stageData: StageData) {
			this.stageData = stageData;
			this.gameHostingManager =
				new GameHostingManager(this.stageData, this.updateGameListing);
			//if (stageData.isNetEnabled)
			//	this.displayButtons();
		}
		private updateGameListing = (peerIDS:string[])=> {
            this.clearInterface();
			this.peerIDS = peerIDS;
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
                this.onJoinButtonClicked(gameID);
            }
			Util.Interface.d.appendChild(document.createElement("br"));
		}
		private displayHostOption() {
			var b:HTMLElement = Util.Interface.addStandardButton("Host Game");
            b.onclick = this.onHostButtonClicked;
            if (this.gameHostingManager.isHosting()) {
                Util.Interface.d.appendChild(document.createElement("br"));
				Util.Interface.d.appendChild(document.createTextNode("You are currently hosting game " + this.peerIDS.indexOf(Util.Conf.uniqueID)));
            }
		}
        private onHostButtonClicked = () => {
            this.gameHostingManager.hostGame(Util.Conf.uniqueID);
            this.gameHostingManager.requestList();
        }
		private clearInterface() {
			Util.Interface.clearInterface();
		}
        private onJoinButtonClicked(peerIDToJoin: string) {
            this.gameHostingManager.stopHostingGame();
            this.gameHostingManager.requestList();

			this.stageData.peerMan.beginJoining(
				this.gameHostingManager.onJoiningConnected, peerIDToJoin);
            //alert("Joined game " + game.toString());
        }
		private displayCouldNotContactServer() {
			this.clearInterface();
			var t: Text = document.createTextNode("Could not connect to lobby");
			Util.Interface.d.appendChild(t);
		}
	};
}