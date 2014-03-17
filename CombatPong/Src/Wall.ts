module CombatPong {
	export class Wall extends GameObject{
		rect: Kinetic.Line;
		constructor(stageData: StageData) {
			super(stageData);
		}
        speed: number;
		spawn() {
			this.rect = Util.genRectLines(100, 100, 100, 100);
			this.rect.fill("Black");
            this.graphic.add(this.rect);
            this.speed = Math.random()

		}
        onWallCollision(wall: Wall, response: SAT.Response) {
            this.rect.fill("Red");
            this.rect.y(this.rect.y() + .1);
        }
        triggerAnotherObjectsCollision(otherGameObject: GameObject, response: SAT.Response) {
            otherGameObject.onWallCollision(this, this.retreiveCollisionData());
        }
        tick() {
            this.rect.x(this.rect.x() + this.speed);
        }
	}
}