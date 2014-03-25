module CombatPong {
	export class GameHostingInterface {
		private stageData: StageData;
		constructor(stageData: StageData) {
			this.stageData = stageData;
			this.displayButtons();
			//if (stageData.isNetEnabled)
			//	this.displayButtons();
		}
		private displayButtons() {
			var b:HTMLElement = document.createElement("BUTTON");
			var t:Text = document.createTextNode("CLICK ME");
			b.appendChild(t);
			b.style.margin = "0px";
			b.style.padding = "0px";
			b.style.zIndex = "100";
			b.style.position = "absolute";
			b.style.display = "block";
			b.style.top = "10px";
			b.style.left = "10px";
			b.style.marginTop = "10px";
			document.body.appendChild(b);
			//b.style.margin = "0px";
		}
		private hideButtons() {
		}
	};
}