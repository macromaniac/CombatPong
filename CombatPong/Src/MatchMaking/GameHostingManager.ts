
module CombatPong {
	export class GameHostingManager {

		public static gameListRefreshRateInMS: number = 3500;

		private stageData: StageData;
		private updateGameListingCallback: (peerIDS: string[]) => void;
		constructor(stageData: StageData,
				updateGameListingCallback: (peerIDS:string[]) => void) {
			this.stageData = stageData;
			this.updateGameListingCallback = updateGameListingCallback;
			this.connectToGameHostingServer();

		}

        private socket: Socket;

        public requestList = () =>  {
            this.socket.emit('Check If Hosting', {});
            this.socket.emit('Request GameList', {});
			this.timeout = setTimeout(this.requestList, GameHostingManager.gameListRefreshRateInMS);
        }

		public isConnected: boolean = false;
        private timeout: number;
        private amIHosting: boolean = false;

		public connectToGameHostingServer() {
			this.socket = io.connect(Util.Conf.hostURL);

            this.socket.on('connect', ()=> {
                this.isConnected = true;
                this.timeout = setTimeout(this.requestList, GameHostingManager.gameListRefreshRateInMS);
                this.requestList();
            });

            this.socket.on('disconnect', () =>{
                this.isConnected = false;
                clearTimeout(this.timeout);
            });

            this.socket.on('Update Hosting Info', (data) => {
                this.amIHosting = data.amIHosting
            });

            this.socket.on('GameList', this.updateGameListingCallback);
		}

		public onHostingConnected() {
			this.socket.emit('disconnect', {});
		}
        public hostGame(gameID:string) {
            this.socket.emit('Host Game', gameID);
			this.stageData.peerMan.beginHosting(this.onHostingConnected);
            this.amIHosting = true;
        }
        public stopHostingGame() {
            this.socket.emit('Stop Hosting Game', {});
			this.stageData.peerMan.stopHosting();
            this.amIHosting = false;
        }

        public isHosting():boolean {
            return this.amIHosting;
        }

	}
}