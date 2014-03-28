var CombatPong;
(function (CombatPong) {
    var StageData = (function () {
        function StageData(stage, baseWidth, baseHeight) {
            this.isNetEnabled = true;
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

            this.peerMan = new CombatPong.PeerMan();
        }
        StageData.prototype.findNetworkSettings = function () {
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
        };
        return StageData;
    })();
    CombatPong.StageData = StageData;
    ;
})(CombatPong || (CombatPong = {}));
//# sourceMappingURL=StageData.js.map
