//Handles input for multiple users

module CombatPong {
	export class InputMan {
	};
	//player.setNetFrame(#)
	export class Player {
		eventLists: Macro.EventList[] = [];
		state: Macro.State;
		frameAt: number = 0;

		constructor() { }

		//This will return true if the network data exists, and false if the network data
		//does not exist
		public tryToIncreaseState = (): boolean => {
			if (this.frameAt >= this.eventLists.length)
				return false;
			this.frameAt++;
			this.state.updateFromEventList(this.eventLists[this.frameAt]);
			console.log("FrameAt: " + this.frameAt + " FrameMax: " + this.eventLists.length);
			return true;
		}
		public addEventList = (eventList: Macro.EventList) => {
			this.eventLists.push(eventList);
		}
	};
}