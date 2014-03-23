/// <reference path="gameobject.ts" />

module CombatPong {
    export class Ball extends GameObject {
        circle: Kinetic.Circle;
        constructor(stageData: StageData) {
            super(stageData);
        }
        spawn() {
            this.circle = new Kinetic.Circle({});
            this.circle.radius(100);
            this.circle.x(100)
            this.circle.y(100);
            this.circle.fill("Blue");
            this.circle.draggable(true);
            this.graphic.add(this.circle);

        }
        onWallCollision(wall: Wall, response: SAT.Response) {
            this.circle.fill("Red");
        }
        triggerAnotherObjectsCollision(otherGameObject: GameObject, response: SAT.Response) {
            otherGameObject.onBallCollision(this, this.retreiveCollisionData());
        }
        tick() {
            this.circle.fill("Blue");
        }
    }
}