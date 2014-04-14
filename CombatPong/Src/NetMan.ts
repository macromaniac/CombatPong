module CombatPong {
    export function recvData(data:string) {
    }
	export class NetMan {
		stageData: StageData;
		peerMan: PeerMan;

		unhandledData: DataMessage[];
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
			this.stageData.player1 = new Player(PlayerHostState.PlayerIsHost);
			this.stageData.player2 = new Player(PlayerHostState.PlayerIsNotHost);
			this.stageData.player1.acceptBrowserInput();
			//this.stageData.player2 = new Player();
			console.log(this.getHostingState());
		}
		public onJoiningConnection = () => {
			Macro.record();
			this.stageData.player1 = new Player(PlayerHostState.PlayerIsHost);
			this.stageData.player2 = new Player(PlayerHostState.PlayerIsNotHost);
			this.stageData.player2.acceptBrowserInput();
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
			if (this.stageData.player1.canUpdate() && this.stageData.player2.canUpdate())
				return true;
			return false;
		}
		private processUnhandledData = () => {
			for (var i = 0; i < this.unhandledData.length; ++i) {
				//process data
			}
			//This function processes unhandeled data
		}
        public recieveData(data:string) {
        }
		public broadCastData = () => {
			this.processUnhandledData();
		}
	};
}