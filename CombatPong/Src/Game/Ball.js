/// <reference path="collision/gameobject.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CombatPong;
(function (CombatPong) {
    var Ball = (function (_super) {
        __extends(Ball, _super);
        function Ball(stageData, x, y, radius) {
            _super.call(this, stageData);
            this.spawnWithParamaters(x, y, radius);
        }
        Ball.prototype.spawnWithParamaters = function (x, y, radius) {
            this.circle = new Kinetic.Circle({ x: x, y: y, radius: radius });
            this.circle.fill(Ball.defaultBallColor);
            this.graphic.add(this.circle);
        };

        Ball.prototype.onWallCollision = function (wall, response) {
            this.circle.fill("Red");
        };
        Ball.prototype.triggerAnotherObjectsCollision = function (otherGameObject, response) {
            otherGameObject.onBallCollision(this, this.retreiveCollisionData());
        };
        Ball.prototype.tick = function () {
        };
        Ball.defaultBallColor = "Black";
        return Ball;
    })(CombatPong.GameObject);
    CombatPong.Ball = Ball;
})(CombatPong || (CombatPong = {}));
//# sourceMappingURL=Ball.js.map
