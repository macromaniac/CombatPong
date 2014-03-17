module CombatPong {
    export class World {
        private stageData: StageData;
        private worldObjects: GameObject[];
        private collisionManager: CollisionManager;
        constructor(stageData: StageData) {
            this.stageData = stageData;
            this.worldObjects = [];
            this.createWalls();
            this.collisionManager = new CollisionManager(this.stageData, this.worldObjects);
        }
        private createWalls() {
            this.worldObjects.push(new Wall(this.stageData ));
            this.worldObjects.push(new Wall(this.stageData ));
            this.worldObjects.push(new Wall(this.stageData ));
        }
        public tick() {
            this.collisionManager.updateCollisions();
            for (var i: number = 0; i < this.worldObjects.length; ++i) {
                this.worldObjects[i].tick();
            }
        }
    };
}