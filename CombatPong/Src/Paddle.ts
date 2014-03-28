module CombatPong {
    export class Paddle extends GameObject {
        constructor(stageData: StageData) {
            super(stageData);
        }
        triggerAnotherObjectsCollision(otherGameObject: GameObject, response: SAT.Response) {
            otherGameObject.onPaddleCollision(this, this.retreiveCollisionData());
        }
    }
}