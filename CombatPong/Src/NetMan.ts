module CombatPong {
	export class NetMan {
		stageData: StageData;
		peerMan: PeerMan;
		constructor(stageData: StageData) {
			this.stageData = stageData;
			this.stageData.netMan = this;
			this.peerMan = new PeerMan();
		}
		public sendMessage() {
		}
		public getHostingState = (): HostingState=>{
			return this.peerMan.hostingState;
		}
		public beginHosting(onHostingConnection: () => any) {
			this.peerMan.beginHosting(onHostingConnection);
		}
		public beginJoining(onJoinConnection: () => any, idToJoin: string) {
			this.peerMan.beginJoining(onJoinConnection,idToJoin);
		}
		public onHostingConnection = () => {
			Macro.record();
			console.log(this.getHostingState());
		}
		public onJoiningConnection = () => {
			Macro.record();
			console.log(this.getHostingState());
		}
		public timeSinceStartMS = ():number => {
			return this.peerMan.timeSinceStartMS();
		}
		public tick = () => {
			Macro.currentState.update();
			console.log(Macro.currentState.isKeyDown(Button.Code.W));
			this.peerMan.tick();
		}
	};
}