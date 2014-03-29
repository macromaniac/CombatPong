
module CombatPong {
    export class Ball extends GameObject {
        static defaultBallColor = "Black";
        circle: Kinetic.Circle;
        constructor(stageData: StageData, x:number, y:number, radius:number) {
            super(stageData);
            this.spawnWithParamaters(x,y,radius);
        }

        spawnWithParamaters(x:number, y:number, radius: number) {
            this.circle = new Kinetic.Circle({x:x, y:y, radius:radius});
            this.circle.fill(Ball.defaultBallColor);
            this.graphic.add(this.circle);
        }

        onWallCollision(wall: Wall, response: SAT.Response) {
            this.circle.fill("Red");
        }
        triggerAnotherObjectsCollision(otherGameObject: GameObject, response: SAT.Response) {
            otherGameObject.onBallCollision(this, this.retreiveCollisionData());
        }
        tick() {
        }
    }
}