//Handles input for multiple users

module CombatPong {
	export class InputMan {
	};
	export enum PlayerHostState { PlayerIsHost, PlayerIsNotHost };
	//player.setNetFrame(#)
	export class Player {
		eventLists: Macro.EventList[] = [];
		state: Macro.State;
		frameAt: number = 0;

		playerHostState: PlayerHostState = PlayerHostState.PlayerIsNotHost;

		uploadPlayerData: boolean = false;
		constructor(hostState:PlayerHostState) {
			this.playerHostState = hostState;
		}

		public acceptBrowserInput = () => {
			this.state = Macro.currentState;
			this.uploadPlayerData = true;
		}
		public canUpdate = (): boolean=> {
			return this.frameAt < this.eventLists.length;
		}

		public update = () => {
			this.frameAt++;
			this.state.updateFromEventList(this.eventLists[this.frameAt]);
			console.log("FrameAt: " + this.frameAt + " FrameMax: " + this.eventLists.length);
		}
		public addEventList = (eventList: Macro.EventList) => {
			this.eventLists.push(eventList);
		}
	};
}