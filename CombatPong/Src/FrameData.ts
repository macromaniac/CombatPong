module CombatPong {
	export class FrameData {

		public player1:Player;
		public player2:Player;

		stageData: StageData;

		constructor(stageData: StageData) {
			this.stageData = stageData;
			this.player1 = new Player();
			this.player2 = new Player();
		}
	};
}