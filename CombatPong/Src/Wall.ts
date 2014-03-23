module CombatPong {
	export class Wall extends GameObject{
		rect: Kinetic.Line;
		constructor(stageData: StageData) {
			super(stageData);
		}
        speed: number;
		spawn() {
			this.rect = Util.genRectLines(-25, -25, 50, 50);
            this.rect.x(100);
            this.rect.y(100);
            this.rect.scaleX(2);
            this.rect.scaleY(3);
			this.rect.fill("Black");
            this.graphic.add(this.rect);
            this.speed = Math.random();
            this.rect.draggable(true);
            this.rect.rotate(15);

		}
        onWallCollision(wall: Wall, response: SAT.Response) {
            this.rect.fill("Red");
        }
        onBallCollision(ball: Ball, response: SAT.Response) {
            this.rect.scaleX(1);
        }
        triggerAnotherObjectsCollision(otherGameObject: GameObject, response: SAT.Response) {
            otherGameObject.onWallCollision(this, this.retreiveCollisionData());
        }
        tick() {
			this.rect.fill("Black");
            this.rect.scaleX(2);

            this.rect.rotate(this.speed * .25);
        }
	}
}