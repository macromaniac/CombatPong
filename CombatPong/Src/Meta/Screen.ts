/// <reference path="stagedata.ts" />
/// <reference path="../game/game.ts" />


module CombatPong {
	export class Screen {

		stageData: StageData;
		rect: Kinetic.Rect;
		baseWidth: number;
		baseHeight: number;
		stage: Kinetic.Stage;

		game: Game;
		constructor(width: number, height: number, divID: string) {
			this.stage = new Kinetic.Stage({ width: width, height: height, container: divID });
			this.baseHeight = height;
			this.baseWidth = width;

			this.stageData = new StageData(this.stage, this.baseWidth, this.baseHeight);
			this.attachBorder();

			this.game = new Game(this.stageData);

			requestAnimationFrame(this.tick);
		}
        private tick = (timestamp) => {
			this.stage.draw();
			this.game.tick();
			requestAnimationFrame(this.tick);
		}
        private attachBorder() {
			this.rect = new Kinetic.Rect({});
			this.rect.x(0); this.rect.y(0); this.rect.width(this.baseWidth); this.rect.height(this.baseHeight);
			this.rect.stroke("Black");
			this.rect.strokeWidth(3.5);
			this.stageData.UI.add(this.rect);

		}

		// If I don't have this there is occasionally a scrollbar on fullscreen, this is just light padding to prevent that from happening
		private percentage: number = .99;

		private limitStageByWidth(elementWidth: number, elementHeight: number): boolean {
			var scale: number = elementWidth / this.baseWidth;
			this.stageData.stage.scaleX(scale);
			this.stageData.stage.scaleY(scale);

			this.stageData.stage.setWidth(elementWidth);
			this.stageData.stage.setHeight(elementWidth * (this.baseHeight / this.baseWidth));

			if (this.stageData.stage.height() > elementHeight)
				return false;
			return true;
		}
		private limitStageByHeight(elementWidth: number, elementHeight: number): boolean {
			var scale: number = elementHeight / this.baseHeight;
			this.stageData.stage.scaleX(scale);
			this.stageData.stage.scaleY(scale);

			this.stageData.stage.setWidth(elementHeight * (this.baseWidth / this.baseHeight));
			this.stageData.stage.setHeight(elementHeight);

			if (this.stageData.stage.width() > elementHeight)
				return false;
			return true;
		}
		public fitStageToScreen() {
			var elem: HTMLElement = document.getElementById('content');

			var elementWidth: number = window.innerWidth * this.percentage;
			var elementHeight: number = window.innerHeight * this.percentage;
			if (!this.limitStageByWidth(elementWidth, elementHeight)) {
				this.limitStageByHeight(elementWidth, elementHeight);
			}

		}
	}
}