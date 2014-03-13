module CombatPong {
    export class Screen {
        stage: Kinetic.Stage;
        constructor(width: number, height: number, divID: string) {
            this.stage = new Kinetic.Stage({ width: width, height: height, container: divID });
            requestAnimationFrame(this.tick);
        }
        private tick = (timestamp) => {
            this.stage.draw();
            requestAnimationFrame(this.tick);
        }
    };
}