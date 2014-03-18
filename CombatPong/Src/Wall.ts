module CombatPong {
	export class Wall extends GameObject{
		rect: Kinetic.Line;
		constructor(stageData: StageData) {
			super(stageData);
		}
        speed: number;
		spawn() {
			this.rect = Util.genRectLines(0, 0, 50, 50);
			this.rect.fill("Black");
            this.graphic.add(this.rect);
            this.speed = Math.random();
            this.rect.draggable(true);
            this.rect.rotate(15);

		}
        onWallCollision(wall: Wall, response: SAT.Response) {
            this.rect.fill("Red");
        }
        triggerAnotherObjectsCollision(otherGameObject: GameObject, response: SAT.Response) {
            otherGameObject.onWallCollision(this, this.retreiveCollisionData());
        }
        tick() {
			this.rect.fill("Black");

            this.rect.rotate(this.speed * .25);
        }
	}
}