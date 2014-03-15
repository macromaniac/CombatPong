module CombatPong {
	class Wall extends GameObject{
		rect: Kinetic.Line;
		constructor(stageData: StageData) {
			super(stageData);
		}
		generateGraphics() {
			this.rect = Util.genRectLines(100, 100, 100, 100);
			this.rect.fill("Black");
			this.graphic.add(this.rect);
		}
	}
}