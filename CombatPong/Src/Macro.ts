
module Macro {
	//How to use:
	//Record for one network tick, then call state.update() for your own network tick
	//The problem is there needs to be a list of current event lists, and the list needs
	//to be addable to easily. This is the next step.



	var recording: boolean = false;
	export var currentState: State;


	export function record() {
		recording = true;
	}
	export function stopRecording() {
		recording = false;
	}

	export class Event {
		public execute = (state: State) => { }
		public isKey(): boolean {
			return false;
		}
	};

	export class KeyEvent extends Event {
		kCode: number;
		isKeyDown: boolean;
		constructor(keyCode: number, isKeyDown:boolean) {
			super();
			this.kCode = keyCode;
			this.isKeyDown = isKeyDown;
		}
		public execute = (state: State) => {
			if (this.kCode < Button.buttonMax) {
				state.buttonDownBooleans[this.kCode] = this.isKeyDown;
				if (this.isKeyDown == false)
					state.wasKeyReleased[this.kCode] = true;
			}
		}
		public isKey(): boolean {
			return true;
		}
	};
	export class MouseEvent extends Event {
		x: number; y: number; mouseClick: boolean;
		constructor(x: number, y: number, mouseClick: boolean = false) {
			super();
			this.x = x; this.y = y; this.mouseClick = mouseClick;
		}
		public isKey(): boolean {
			return false;
		}
		public execute = (state: State)=> {
			state.mouseEventList.push(this);
		}
	};
	var lastX: number = 0; var lastY: number = 0;
	export class EventList {
		frameAt: number;
		constructor(frameAt:number) {
			this.frameAt = frameAt;
		}
		list: Event[] = [];
		private nextEventList: EventList;

		public immediatelyAddEvent(e:Event) {
			this.list.push(e);
		}

		public addEvent(e:Event) {
			if (!this.nextEventList)
				this.nextEventList = new EventList(this.frameAt+1);
			this.nextEventList.immediatelyAddEvent(e);
		}
		public getNextEventList(): EventList {
			if (!this.nextEventList)
				this.nextEventList = new EventList(this.frameAt+1);
			//theoretically, multiple get calls could add multiple mouse events,
			//but thats honestly not a big deal
			this.nextEventList.immediatelyAddEvent(new MouseEvent(lastX, lastY));
			return this.nextEventList;
		}
	};
	export class State {
		public buttonDownBooleans: boolean[] = [];
		public wasKeyReleased: boolean[] = [];
		public mouseEventList: MouseEvent[] = [];
		public eventList: EventList = new EventList(0);
		constructor() {
			this.generateButtonMapArray();
		}
		private generateButtonMapArray() {
			while (this.buttonDownBooleans.length < Button.buttonMax) {
				this.buttonDownBooleans.push(false);
				this.wasKeyReleased.push(false);
			}
		}
		private undoReleaseKeys() {
			for (var i = 0; i < Button.buttonMax; ++i) {
				this.wasKeyReleased[i] = false;
			}
		}

		public updateFromEventList = (eventList: EventList) => {
			this.eventList = eventList;
			this.update();
		}

		public update = () => {
			this.mouseEventList = [];
			for (var i = 0; i < this.eventList.list.length; ++i) {
				this.eventList.list[i].execute(this);
			}
			this.eventList = this.eventList.getNextEventList();
		}
		public isKeyDown = (key: Button.Code) :boolean =>{
			return this.buttonDownBooleans[key];
		}
		public isKeyUp = (key: Button.Code) :boolean =>{
			return this.buttonDownBooleans[key];
		}
		public isKeyReleased = (key: Button.Code): boolean=> {
			return this.wasKeyReleased[key];
		}
		public getMouseEvents = ():MouseEvent[]=> {
			return this.mouseEventList;
		}
		public getFrame = (): number => {
			return this.eventList.frameAt;
		}


	};
	currentState = new State();

	function handleKeyPress(event:JQueryEventObject) {
		if (recording == false) return;
		currentState.eventList.addEvent(new KeyEvent(event.keyCode, true));
	}
	function handleKeyUp(event: JQueryEventObject) {
		if (recording == false) return;
		currentState.eventList.addEvent(new KeyEvent(event.keyCode, false));
	}

	function handleMouseUp(event:JQueryEventObject) {
		if (recording == false) return;
		currentState.eventList.addEvent(new MouseEvent(event.screenX, event.screenY, false));
	}
	function handleMouseDown(event:JQueryEventObject) {
		if (recording == false) return;
		currentState.eventList.addEvent(new MouseEvent(event.screenX, event.screenY, true));
	}

	$(document).keydown(handleKeyPress);
	$(document).keyup(handleKeyUp);
	$(document).mouseup(handleMouseUp);
	$(document).mousedown(handleMouseDown);
	$(document).mousemove((event) => { lastX = event.pageX; lastY=event.pageY });
}