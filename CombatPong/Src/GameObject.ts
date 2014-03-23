module CombatPong {
    export class GameObject {
        public interactiveGraphic: InteractiveGraphic;
        public graphic: Kinetic.Group;
        stageData: StageData;
        constructor(stageData: StageData) {
            this.stageData = stageData;
            this.graphic = new Kinetic.Group({});
            this.spawn();
            this.stageData.foreground.add(this.graphic);
            this.interactiveGraphic = new InteractiveGraphic(this.stageData, this.graphic);
        }
        spawn() { } //override this
        triggerAnotherObjectsCollision(receiver: GameObject, response: SAT.Response) {
            var i = 4;
        }

        public tick() { }
        public checkForCollision(otherGameObject: GameObject): boolean {
            return this.interactiveGraphic.SATcollisionTest(otherGameObject.interactiveGraphic);
        }
        retreiveCollisionData(): SAT.Response {
            return this.interactiveGraphic.satResponse;
        }
        public checkForRoughCollision(otherGameObject: GameObject): boolean {
            return this.interactiveGraphic.roughCollisionTest(otherGameObject.interactiveGraphic);
        }
        onWallCollision(wall: Wall, response: SAT.Response) { }
        onBallCollision(ball: Ball, response: SAT.Response) { }
    }
}