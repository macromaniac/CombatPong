/// <reference path="../../socket.io-client.d.ts" />

module CombatPong {
	export class GameHostingManager {
		private stageData: StageData;
		private updateGameListingCallback: (peerIDS: string[]) => void;
		constructor(stageData: StageData,
				updateGameListingCallback: (peerIDS:string[]) => void) {
			this.stageData = stageData;
			this.updateGameListingCallback = updateGameListingCallback;
			this.connectToGameHostingServer();
		}

		public isConnected: boolean = false;
		public connectToGameHostingServer() {
			var socket = io.connect(Util.Conf.hostURL);
			socket.on('news', function (data) {
				console.log(data);
				socket.emit('my other event', { my: 'data' });
			});
			socket.emit('my other event', { my: 'data' });
			//socket.on('GameListing', this.getGameListing);
		}
		private getGameListing(data){
			var peerIDS: string[] = [];
			this.updateGameListingCallback(peerIDS);
		}
	}
}