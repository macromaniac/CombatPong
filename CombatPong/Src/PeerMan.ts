module CombatPong {
	export class PeerMan {
		public static defaultNetworkFrameLengthInMS: number = 1 / 8 * 1000;
		constructor() { }
		public tick() { }
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