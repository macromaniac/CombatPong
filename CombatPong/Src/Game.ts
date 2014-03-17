module CombatPong {
    export class Game {
        private stageData: StageData;
        private world: World;
        constructor(stageData:StageData) {
            this.stageData = stageData;
            this.world = new World(stageData);
        }
        tick() {
            this.world.tick();
        }
    };
}