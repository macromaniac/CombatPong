module CombatPong {
	export class NetMan {
		stageData: StageData;
		peerMan: PeerMan;
<<<<<<< HEAD

		constructor(stageData: StageData, frameData: FrameData) {
			this.frameData = frameData;
=======
		constructor(stageData: StageData) {
>>>>>>> a6445a078907353a5e7306e8854783315e32face
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
<<<<<<< HEAD
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
=======
        public timeSinceStartMS(): number {
            return this.peerMan.timeSinceStartMS();
        }
        public tick() {
            this.peerMan.tick();
        }
>>>>>>> a6445a078907353a5e7306e8854783315e32face
	};
}