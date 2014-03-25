module CombatPong {
	export class Game {
		logicFrameLengthInMS: number = 1 / 50 * 1000;

		private stageData: StageData;
		private world: World;
		private peerMan: PeerMan;
		constructor(stageData: StageData) {
			this.stageData = stageData;
			this.world = new World(stageData);
			this.peerMan = new PeerMan();
		}
		public tick() {
			this.regulatedTick();
		}
		tickNumber: number = 0;
		expectedTickNumber: number = 0;
		private regulatedTick() {
			this.expectedTickNumber = this.peerMan.timeSinceStartMS() / this.logicFrameLengthInMS;
			while (this.expectedTickNumber > this.tickNumber) {
				if (this.isNetworkTick(this.tickNumber))
					this.peerMan.tick();
				this.world.tick();
				this.tickNumber++;
			}
		}
		private isNetworkTick(tickNo: number): boolean {
			if (this.stageData.isNetEnabled == false)
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
	};
	export class Timer {
		constructor() { }
	};
}