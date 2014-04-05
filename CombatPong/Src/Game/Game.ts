module CombatPong {
	export class Game {
		logicFrameLengthInMS: number = (1 / 48) * 1000;

		private stageData: StageData;
		private world: World;
		private peerMan: PeerMan;
		private gameHostingInterface: GameHostingInterface;
		constructor(stageData: StageData) {
			this.stageData = stageData;
			this.stageData.game = this;
			//this.world = new World(stageData);
			this.gameHostingInterface = new GameHostingInterface(stageData);

		}
		public tick = () => {
			if (this.peerMan.timeSinceStartMS() > 0)
				this.regulatedTick();
		}
		tickNumber: number = 0;
		expectedTickNumber: number = 0;
		private regulatedTick = () => {
			this.expectedTickNumber = this.peerMan.timeSinceStartMS() / this.logicFrameLengthInMS;

			while (this.expectedTickNumber > this.tickNumber) {
				if (this.isNetworkTick(this.tickNumber))
					this.peerMan.tick();
				if(this.world)
					this.world.tick();
				this.tickNumber++;
			}
		}
		private isNetworkTick = (tickNo: number): boolean => {
			if (this.stageData.isNetEnabled == false || tickNo==0)
				return false;
			var prevTickTime: number = this.logicFrameLengthInMS * (tickNo - 1);
			var tickTime: number = this.logicFrameLengthInMS * tickNo;
			var networkTickForPrevTickTime: number = Math.floor(
				prevTickTime / PeerMan.defaultNetworkFrameLengthInMS);
			var networkTickForCurrentTickTime: number = Math.floor(
				tickTime / PeerMan.defaultNetworkFrameLengthInMS);
			if (networkTickForCurrentTickTime > networkTickForPrevTickTime)
				return true;
			return false;
		}
		public beginGameAsHost = () => {
			this.gameHostingInterface.stopMM();
		}
		public beginGameAsClient = () => {
			this.gameHostingInterface.stopMM();

			//this.stageData.executeNetAction(new NetAction(gameobjectid, 
			//executeNetAction(function
		}
	};
}