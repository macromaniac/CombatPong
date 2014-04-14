module CombatPong {
	//Data message should send the key presses, the player number is assigned
	//using the SYS message enum
	export enum MSGType { SYS, KEYPRESS };
	class DataMessage {
		constructor() { }
	}
}