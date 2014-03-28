var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CombatPong;
(function (CombatPong) {
    var Wall = (function (_super) {
        __extends(Wall, _super);
        function Wall(stageData, x, y, width, height) {
            _super.call(this, stageData);
            this.spawnWithParams(x, y, width, height);
        }
        Wall.prototype.spawnWithParams = function (x, y, width, height) {
            this.rect = Util.Graphics.genRectLines(0, 0, width, height);
            this.rect.x(x);
            this.rect.y(y);
            this.rect.fill(Wall.defaultWallColor);
            this.graphic.add(this.rect);
        };
        Wall.prototype.onBallCollision = function (ball, response) {
        };
        Wall.prototype.triggerAnotherObjectsCollision = function (otherGameObject, response) {
            otherGameObject.onWallCollision(this, this.retreiveCollisionData());
        };
        Wall.defaultWallColor = "Black";
        return Wall;
    })(CombatPong.GameObject);
    CombatPong.Wall = Wall;
})(CombatPong || (CombatPong = {}));
//# sourceMappingURL=Wall.js.map
