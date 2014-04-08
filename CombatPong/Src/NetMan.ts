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
		public tick = ():boolean => {
			if (this.hasRecievedNecissaryData() == false)
				return false;
			Macro.currentState.update();
			if (this.getHostingState() == CombatPong.HostingState.Host)
				this.broadCastData();
			console.log(Macro.currentState.isKeyDown(Button.Code.W));
			this.peerMan.tick();
			return true;
		}
		private hasRecievedNecissaryData = ():boolean =>{
			return true;
		}
		private processUnhandledData = () => {
			//This function processes unhandeled data
		}
		public broadCastData = () => {
			this.processUnhandledData();
		}
	};
}