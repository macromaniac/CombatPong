var CombatPong;
(function (CombatPong) {
    window.onload = function () {
        var screen = new CombatPong.Screen(600, 400, 'content');
    };
})(CombatPong || (CombatPong = {}));
var CombatPong;
(function (CombatPong) {
    var Screen = (function () {
        function Screen(width, height, divID) {
            var _this = this;
            this.tick = function (timestamp) {
                _this.stage.draw();
                requestAnimationFrame(_this.tick);
            };
            this.stage = new Kinetic.Stage({ width: width, height: height, container: divID });
            requestAnimationFrame(this.tick);
        }
        return Screen;
    })();
    CombatPong.Screen = Screen;
    ;
})(CombatPong || (CombatPong = {}));
//# sourceMappingURL=all.js.map
