module CombatPong {
    export class StageData {
        public UI: Kinetic.Layer;
        public foreground: Kinetic.Layer;
        public background: Kinetic.Layer;
        public stage: Kinetic.Stage;

        public baseWidth: number;
        public baseHeight: number;

		public isNetEnabled: boolean = true;

		public peerMan: PeerMan;

        constructor(stage: Kinetic.Stage, baseWidth:number, baseHeight:number) {
            this.stage = stage;

            this.UI = new Kinetic.Layer();
            this.stage.add(this.UI);

            this.foreground = new Kinetic.Layer();
            this.stage.add(this.foreground);

            this.background = new Kinetic.Layer();
            this.stage.add(this.background);

            this.baseWidth = baseWidth;
            this.baseHeight = baseHeight;

			this.peerMan = new PeerMan();
        }
    };
}