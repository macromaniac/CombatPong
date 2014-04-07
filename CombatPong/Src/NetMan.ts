module CombatPong {
	export class NetMan {
		frameData: FrameData;
		stageData: StageData;
		peerMan: PeerMan;
		constructor(stageData: StageData, frameData: FrameData) {
			this.frameData = frameData;
			this.stageData = stageData;
			this.stageData.netMan = this;
			this.peerMan = new PeerMan();

		}
		public sendMessage() {
		}
		public isHosting() {
		}
		public beginHosting(onHostingConnection: () => any) {
			this.peerMan.beginHosting(onHostingConnection);
		}
		public beginJoinging(onJoinConnection: () => any, idToJoin: string) {
			this.peerMan.beginJoining(onJoinConnection,idToJoin);
		}
		public timeSinceStartMS = ():number => {
			return this.peerMan.timeSinceStartMS();
		}
		public tick = () => {
			this.peerMan.tick();
		}
	};
}