module CombatPong {
	export class Wall extends GameObject{
        static defaultWallColor = "Black";

		rect: Kinetic.Line;
		constructor(stageData: StageData, x:number, y:number, width:number, height:number) {
			super(stageData);
            this.spawnWithParams(x, y, width, height);
		}
        spawnWithParams(x: number, y: number, width: number, height: number) {
            this.rect = Util.genRectLines(0, 0, width, height);
            this.rect.x(x);
            this.rect.y(y);
			this.rect.fill(Wall.defaultWallColor);
            this.graphic.add(this.rect);
        }
        onBallCollision(ball: Ball, response: SAT.Response) {
        }
        triggerAnotherObjectsCollision(otherGameObject: GameObject, response: SAT.Response) {
            otherGameObject.onWallCollision(this, this.retreiveCollisionData());
        }
	}
}