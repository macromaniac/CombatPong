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
            var heightOfWalls = this.stageData.baseHeight / 20;
            var widthOfWalls = this.stageData.baseWidth;
            this.worldObjects.push(new Wall(this.stageData, 0, 0,
                widthOfWalls, heightOfWalls));

            this.worldObjects.push(new Wall(this.stageData, 0, this.stageData.baseHeight - heightOfWalls,
                widthOfWalls, heightOfWalls));

            this.worldObjects.push(new Ball(this.stageData, this.stageData.baseWidth / 2, this.stageData.baseHeight / 2, this.stageData.baseHeight/50));
        }
        public tick() {
            for (var i: number = 0; i < this.worldObjects.length; ++i) {
                this.worldObjects[i].tick();
            }
            this.collisionManager.updateCollisions();
        }
    };
}