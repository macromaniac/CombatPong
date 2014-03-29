module CombatPong {
	export class PeerMan {
		public static defaultNetworkFrameLengthInMS: number = 1 / 8 * 1000;

		private peer: Peer;

		private generatePeer() {
			this.peer = new Peer(Util.Conf.uniqueID,
				{ host: 'localhost', port: 9000, path: '/myapp' });
		}
		constructor() {
			this.generatePeer();
		}
		public tick() { }
		public beginHosting(onHostingConnection: () => any) {
			this.peer.on('connection', (dataConnection) => {
				this.stopAcceptingConnections();
				onHostingConnection();
			});
		}
		public stopHosting() {
			this.peer.destroy();
			this.generatePeer();
		}
		private stopAcceptingConnections() {
			this.peer.destroy();
		}
		public timeSinceStartMS(): number {
			return 1;
		}
	};
	export class PeerManServer {
		constructor() { }
	};
	export class PeerManClient {
		serverID: string;
		constructor(serverID: string) {
			this.serverID = serverID;
		}
	};
}