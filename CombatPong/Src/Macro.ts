module Macro {
	//How to use:
	//Record for one network tick, then call state.update() for your own network tick
	//The problem is there needs to be a list of current event lists, and the list needs
	//to be addable to easily. This is the next step.


	var currentEventList = new EventList(0);

	var recording: boolean = false;

	export function record() {
		recording = true;
	}
	export function stopRecording() {
		recording = false;
	}

	function handleKeyPress(key: number) {
		if (recording == false) return;
		currentEventList.addEvent(new KeyEvent(key, true));
	}
	function handleKeyUp(key: number) {
		if (recording == false) return;
		currentEventList.addEvent(new KeyEvent(key, false));
	}

	function handleMouseUp(event:JQueryEventObject) {
		if (recording == false) return;
		currentEventList.addEvent(new MouseEvent(event.screenX, event.screenY, false));
	}
	function handleMouseDown(event:JQueryEventObject) {
		if (recording == false) return;
		currentEventList.addEvent(new MouseEvent(event.screenX, event.screenY, true));
	}


	export class KeyEvent extends Event {
		keyCode: number;
		isKeyDown: boolean;
		constructor(keyCode: number, isKeyDown:boolean) {
			this.keyCode = keyCode;
			this.isKeyDown = isKeyDown;
			super();
		}
		public execute(state: State) {
			if (this.keyCode < Button.buttonMax) {
				state.buttonDownBooleans[this.keyCode] = this.isKeyDown;
				if (this.isKeyDown == false)
					state.wasKeyReleased[this.keyCode] = true;
			}
		}
	};
	export class MouseEvent extends Event {
		x: number; y: number; mouseClick: boolean;
		constructor(x: number, y: number, mouseClick: boolean = false) {
			this.x = x; this.y = y; this.mouseClick = mouseClick;
			super();
		}
		public execute(state: State) {
			state.mouseEventList.push(this);
		}
	};
	export class Event {
		public execute(state: State) { }
	};

	var lastX: number = 0; var lastY: number = 0;
	export class EventList {
		frameAt: number;
		constructor(frameAt:number) {
			this.frameAt = frameAt;
		}
		list: Event[] = [];
		private nextEventList: EventList;
		public addEvent(e:Event) {
			if (!this.nextEventList)
				this.nextEventList = new EventList(this.frameAt+1);
			this.nextEventList.immediatelyAddEvent(e);
		}
		public immediatelyAddEvent(e:Event) {
			this.list.push(e);
		}
		public getNextEventList(): EventList {
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
		private eventList: EventList = new EventList(0);
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
		public updateFromRecording = () => {
			this.eventList = currentEventList;
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
	};

	$(document).keydown(handleKeyPress);
	$(document).keyup(handleKeyPress);
	$(document).mouseup(handleMouseUp);
	$(document).mousedown(handleMouseDown);
	$(document).mousemove((event) => { lastX = event.pageX; lastY=event.pageY });
}