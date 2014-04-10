module CombatPong {
	export class FrameData {
		stageData: StageData;
		player1: Player;
		player2: Player;
		//MAKE IT SO THAT EVENT LISTS ARE TIED TO PLAYERS, I.E THEY HAVE PLAYER NUMBER EMBEDED WITHIN
		//THEM. DO THIS BECAUSE WHEN THE HOST SENDS PLAYER DATA TO CLIENTS THEY NEED TO KNOW 
		//WHAT PLAYER DID WHAT ANYWAYS, ALSO THIS MAKES ORGANIZATION MUCH EASIER
		constructor(stageData: StageData) {
			this.stageData = stageData;
		}
	};
}