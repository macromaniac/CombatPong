module CombatPong {
	export enum HostingState { Host, Client, Neither };
	export class PeerMan {
		public static defaultNetworkFrameLengthInMS: number = (1 / 8) * 1000;
		public static networkPaddingFrameNumber: number = 2;

		public hostingState: HostingState = HostingState.Neither;

		public timeStart: number = -1;

		private peer: Peer;

		private generatePeer = () => {
			this.hostingState = HostingState.Neither;
			this.peer = new Peer(Util.Conf.uniqueID,
				{ host: 'localhost', port: 9000, path: '/', key: 'peerjs' });
		}

		constructor() {
			this.generatePeer();
		}

		networkTickCount: number = 0;
		public tick = () => {
			this.networkTickCount++;
		}

		public beginJoining = (onJoinConnection: () => any, idToJoin: string) => {
			var conn = this.peer.connect(idToJoin);
			conn.on('open', () => {
				this.hostingState = HostingState.Client;
				this.zeroOutTheTime(); //Syncs time between client and host
				onJoinConnection(); //trigger callback
			});
			conn.on('data', (data) => {
				alert(data);
			});
		}

		public beginHosting = (onHostingConnection: () => any) => {
			this.peer.on('connection', (dataConnection) => {
				var conn = <DataConnection>dataConnection;
				conn.on('open', () => {
					//conn.send('HELLO PERSON :]');
					this.hostingState = HostingState.Host;
					this.zeroOutTheTime(); //Syncs time between client and host
					onHostingConnection(); //trigger callback
				});
			});
		}

		private zeroOutTheTime = () => {
			this.timeStart = (new Date()).getTime();
		}
		public timeSinceStartMS = (): number => {
			if (this.timeStart < 0)
				return this.timeStart;

			return (new Date()).getTime() - this.timeStart;
		}
	};
}