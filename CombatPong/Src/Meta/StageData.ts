module CombatPong {
    export class StageData {
		public isNetEnabled: boolean = true;

        public UI: Kinetic.Layer;
        public foreground: Kinetic.Layer;
        public background: Kinetic.Layer;
        public stage: Kinetic.Stage;

        public baseWidth: number;
        public baseHeight: number;

		public peerMan: PeerMan;
		public game: Game;
		public netMan: NetMan;

		private findNetworkSettings() {

			if (navigator.appName === "Netscape")
				this.isNetEnabled = true;
			if (navigator.appName === "Microsoft Internet Explorer")
				this.isNetEnabled = false;
			if (navigator.appName === "Safari")
				this.isNetEnabled = false;

			if (Util.Conf.forceEnableNet == true)
				this.isNetEnabled = true;
			if (Util.Conf.forceDisableNet == true)
				this.isNetEnabled = false;
		}
        constructor(stage: Kinetic.Stage, baseWidth:number, baseHeight:number) {

			this.findNetworkSettings();

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