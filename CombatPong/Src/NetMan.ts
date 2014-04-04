module CombatPong {
	export class NetMan {
		frameData: FrameData;
		stageData: StageData;
		constructor(stageData: StageData, frameData: FrameData) {
			this.frameData = frameData;
			this.stageData = stageData;
			this.stageData.netMan = this;
		}
		public sendMessage() {
		}
		public isHosting() {
		}
	};
}