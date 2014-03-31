
module CombatPong {
	export class GameHostingManager {

		public static gameListRefreshRateInMS: number = 1500;

		private stageData: StageData;
		private updateGameListingCallback: (peerIDS: string[]) => void;
		constructor(stageData: StageData,
			updateGameListingCallback: (peerIDS: string[]) => void) {
			this.stageData = stageData;
			this.updateGameListingCallback = updateGameListingCallback;
			this.connectToGameHostingServer();

		}

		private socket: Socket;

        public requestList = () => {
			this.socket.emit('Check If Hosting', {});
			this.socket.emit('Request GameList', {});
			this.timeout = setTimeout(this.requestList, GameHostingManager.gameListRefreshRateInMS);
		}

		public isConnected: boolean = false;
		private timeout: number;
		private amITryingToHost: boolean = false;

		public connectToGameHostingServer = () => {
			this.socket = io.connect(Util.Conf.hostURL);

			this.socket.on('connect', () => {
				this.isConnected = true;
				clearTimeout(this.timeout);
				this.requestList();
			});

			this.socket.on('disconnect', () => {
				this.isConnected = false;
				clearTimeout(this.timeout);
			});

			this.socket.on('Update Hosting Info', (data) => {
				this.amITryingToHost = data.amIHosting
            });

			this.socket.on('GameList', this.updateGameListingCallback);
		}

		public disconnectFromGameHostingServer = () => {
			this.socket.disconnect();
		}

		public onHostingConnected = () => {
				this.stageData.game.beginGameAsClient();
				this.removeMM();
		}
		public onJoiningConnected = ()=> {
				this.stageData.game.beginGameAsHost();
				this.removeMM();
		}
		private removeMM = ()=> {
			this.socket.emit('disconnect', {});
			Util.Interface.clearInterface();
			//SHOULD I REMOVE REFERENCES SO THIS CAN BE GARBAGE COLLECTED? IDTS
		}

        public hostGame = (gameID:string) => {
            this.socket.emit('Host Game', gameID);
			this.stageData.peerMan.beginHosting(this.onHostingConnected);
            this.amITryingToHost = true;
        }
        public stopHostingGame = () => {
            this.socket.emit('Stop Hosting Game', {});
            this.amITryingToHost = false;
        }

        public isHosting = (): boolean => {
            return this.amITryingToHost;
        }

	}
}