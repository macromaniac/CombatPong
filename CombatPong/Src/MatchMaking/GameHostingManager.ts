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

        private socket: Socket;

        public requestList = () =>  {
            this.socket.emit('Check If Hosting', {});
            this.socket.emit('Request GameList', {});
        }

		public isConnected: boolean = false;
        private timeout: number;
        private amIHosting: boolean = false;

		public connectToGameHostingServer() {
			this.socket = io.connect(Util.Conf.hostURL);

            this.socket.on('connect', ()=> {
                this.isConnected = true;
                this.timeout = setTimeout(this.requestList, 2000);
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

        public hostGame(gameID:string) {
            this.socket.emit('Host Game', gameID);
            this.amIHosting = true;
        }
        public stopHostingGame() {
            this.socket.emit('Stop Hosting Game', {});
            this.amIHosting = false;
        }

        public isHosting():boolean {
            return this.amIHosting;
        }

	}
}