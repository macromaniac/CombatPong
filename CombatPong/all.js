var CombatPong;
(function (CombatPong) {
    var screen;
    window.onload = function () {
        screen = new CombatPong.Screen(960, 540, 'content');
        screen.fitStageToScreen();
    };
    window.onresize = function () {
        if (screen)
            screen.fitStageToScreen();
    };
})(CombatPong || (CombatPong = {}));
var CombatPong;
(function (CombatPong) {
    var Game = (function () {
        function Game(stageData) {
            this.stageData = stageData;
        }
        return Game;
    })();
    CombatPong.Game = Game;
    ;
})(CombatPong || (CombatPong = {}));
var CombatPong;
(function (CombatPong) {
    var GameObject = (function () {
        function GameObject(stageData) {
            this.stageData = stageData;
        }
        GameObject.prototype.generateGraphic = function () {
        };
        GameObject.prototype.sendCollisionMessage = function (receiver, response) {
        };
        GameObject.prototype.checkForCollision = function () {
            return false;
        };
        return GameObject;
    })();
    CombatPong.GameObject = GameObject;
})(CombatPong || (CombatPong = {}));
var CombatPong;
(function (CombatPong) {
    var InteractiveGraphic = (function () {
        function InteractiveGraphic(stageData, graphic, parent) {
            this.stageData = stageData;
            this.graphic = graphic;
            this.parent = parent;
            this.satResponse = new SAT.Response();
        }
        InteractiveGraphic.prototype.resetCollisionData = function () {
            this.minX = Number.MAX_VALUE;
            this.maxX = Number.MIN_VALUE;
            this.satCircles = [];
            this.satPolygons = [];
        };
        InteractiveGraphic.prototype.considerPointForMinMax = function (xPoint) {
            if (xPoint < this.minX)
                this.minX = xPoint;
            if (xPoint > this.maxX)
                this.maxX = xPoint;
        };
        InteractiveGraphic.prototype.mapPoints = function () {
            //generates the min max and converts point to SAT format (could not be casted, potential speed boost here but the points need to be analyzed for min max anyways so its not that big. Casting would require modifying SAT.js Vector class)
            this.resetCollisionData();
            for (var child in this.graphic.getChildren()) {
                if (CombatPong.Util.isCircle(child)) {
                    var circleChild = child;
                    this.considerPointForMinMax(circleChild.x() - circleChild.radius());
                    this.considerPointForMinMax(circleChild.x() + circleChild.radius());
                    this.satCircles.push(new SAT.Circle(new SAT.Vector(circleChild.x(), circleChild.y()), circleChild.radius()));
                } else if (CombatPong.Util.isPolygon(child)) {
                    var polygonChild = child;
                    var polygonSATPoints = [];
                    for (var i = 0; i < polygonChild.points().length / 2; ++i) {
                        var x = polygonChild.points()[i * 2];
                        var y = polygonChild.points()[i * 2 + 1];
                        polygonSATPoints.push(new SAT.Vector(x, y));
                        this.considerPointForMinMax(x);
                    }
                    var satPolygon = new SAT.Polygon(new SAT.Vector(0, 0), polygonSATPoints);
                    this.satPolygons.push(satPolygon);
                }
            }
        };
        InteractiveGraphic.prototype.roughCollisionTest = function (otherGraphic) {
            var min = this.minX;
            var max = this.maxX;
            var leftBound = otherGraphic.minX;
            var rightBound = otherGraphic.maxX;
            if (CombatPong.Util.isNumberWithinBounds(min, leftBound, rightBound))
                return true;
            if (CombatPong.Util.isNumberWithinBounds(max, leftBound, rightBound))
                return true;
            return false;
        };
        InteractiveGraphic.prototype.SATcollisionTest = function (otherGraphic) {
            //Check each component with each other component. n^2, so don't have hundreds of collidable vectors within objects. You can do a rough polygon and make it invisible if this is a problem.
            this.satResponse = new SAT.Response();
            for (var circle in this.satCircles) {
                for (var otherCircle in otherGraphic.satCircles) {
                    if (SAT.testCircleCircle(circle, otherCircle, this.satResponse))
                        return true;
                }
                for (var otherPolygon in otherGraphic.satPolygons) {
                    if (SAT.testCirclePolygon(circle, otherPolygon, this.satResponse))
                        return true;
                }
            }
            for (var polygon in this.satPolygons) {
                for (var otherCircle in otherGraphic.satCircles) {
                    if (SAT.testPolygonCircle(polygon, otherCircle, this.satResponse))
                        return true;
                }
                for (var otherPolygon in otherGraphic.satPolygons) {
                    if (SAT.testPolygonPolygon(polygon, otherPolygon, this.satResponse))
                        return true;
                }
            }
            return false;
        };
        return InteractiveGraphic;
    })();
    CombatPong.InteractiveGraphic = InteractiveGraphic;
    ;
})(CombatPong || (CombatPong = {}));
var MWG;
(function (MWG) {
    (function (ButtonCode) {
        ButtonCode[ButtonCode["Shift"] = 16] = "Shift";
        ButtonCode[ButtonCode["Ctrl"] = 17] = "Ctrl";
        ButtonCode[ButtonCode["Alt"] = 18] = "Alt";
        ButtonCode[ButtonCode["Left"] = 37] = "Left";
        ButtonCode[ButtonCode["Up"] = 38] = "Up";
        ButtonCode[ButtonCode["Right"] = 39] = "Right";
        ButtonCode[ButtonCode["Down"] = 40] = "Down";
        ButtonCode[ButtonCode["Zero"] = 48] = "Zero";
        ButtonCode[ButtonCode["One"] = 49] = "One";
        ButtonCode[ButtonCode["Two"] = 50] = "Two";
        ButtonCode[ButtonCode["Three"] = 51] = "Three";
        ButtonCode[ButtonCode["Four"] = 52] = "Four";
        ButtonCode[ButtonCode["Five"] = 53] = "Five";
        ButtonCode[ButtonCode["Six"] = 54] = "Six";
        ButtonCode[ButtonCode["Seven"] = 55] = "Seven";
        ButtonCode[ButtonCode["Eight"] = 56] = "Eight";
        ButtonCode[ButtonCode["Nine"] = 57] = "Nine";
        ButtonCode[ButtonCode["A"] = 65] = "A";
        ButtonCode[ButtonCode["B"] = 66] = "B";
        ButtonCode[ButtonCode["C"] = 67] = "C";
        ButtonCode[ButtonCode["D"] = 68] = "D";
        ButtonCode[ButtonCode["E"] = 69] = "E";
        ButtonCode[ButtonCode["F"] = 70] = "F";
        ButtonCode[ButtonCode["G"] = 71] = "G";
        ButtonCode[ButtonCode["H"] = 72] = "H";
        ButtonCode[ButtonCode["I"] = 73] = "I";
        ButtonCode[ButtonCode["J"] = 74] = "J";
        ButtonCode[ButtonCode["K"] = 75] = "K";
        ButtonCode[ButtonCode["L"] = 76] = "L";
        ButtonCode[ButtonCode["M"] = 77] = "M";
        ButtonCode[ButtonCode["N"] = 78] = "N";
        ButtonCode[ButtonCode["O"] = 79] = "O";
        ButtonCode[ButtonCode["P"] = 80] = "P";
        ButtonCode[ButtonCode["Q"] = 81] = "Q";
        ButtonCode[ButtonCode["R"] = 82] = "R";
        ButtonCode[ButtonCode["S"] = 83] = "S";
        ButtonCode[ButtonCode["T"] = 84] = "T";
        ButtonCode[ButtonCode["U"] = 85] = "U";
        ButtonCode[ButtonCode["V"] = 86] = "V";
        ButtonCode[ButtonCode["W"] = 87] = "W";
        ButtonCode[ButtonCode["X"] = 88] = "X";
        ButtonCode[ButtonCode["Y"] = 89] = "Y";
        ButtonCode[ButtonCode["Z"] = 90] = "Z";
    })(MWG.ButtonCode || (MWG.ButtonCode = {}));
    var ButtonCode = MWG.ButtonCode;
    var buttonMax = 100;
    var KeyMan = (function () {
        function KeyMan() {
        }
        KeyMan.isButtonDown = function (buttonCode) {
            return KeyManUtil.buttonDownBooleans[buttonCode];
        };
        return KeyMan;
    })();
    MWG.KeyMan = KeyMan;

    //Hide this class
    var KeyManUtil = (function () {
        function KeyManUtil() {
        }
        KeyManUtil.generateButtonMapArray = function () {
            while (this.buttonDownBooleans.length < buttonMax) {
                KeyManUtil.buttonDownBooleans.push(false);
            }
        };
        KeyManUtil.keyUpListener = function (e) {
            KeyManUtil.buttonDownBooleans[e.keyCode] = false;
        };
        KeyManUtil.keyDownListener = function (e) {
            KeyManUtil.buttonDownBooleans[e.keyCode] = true;
        };
        KeyManUtil.buttonDownBooleans = [];
        return KeyManUtil;
    })();
    KeyManUtil.generateButtonMapArray();
    document.onkeyup = KeyManUtil.keyUpListener;
    document.onkeydown = KeyManUtil.keyDownListener;
})(MWG || (MWG = {}));
var CombatPong;
(function (CombatPong) {
    var Screen = (function () {
        function Screen(width, height, divID) {
            var _this = this;
            this.tick = function (timestamp) {
                _this.stage.draw();
                requestAnimationFrame(_this.tick);
            };
            // If I don't have this there is occasionally a scrollbar on fullscreen, this is just light padding to prevent that from happening
            this.percentage = .99;
            this.stage = new Kinetic.Stage({ width: width, height: height, container: divID });
            this.baseHeight = height;
            this.baseWidth = width;

            this.stageData = new CombatPong.StageData(this.stage);
            var rect2 = new Kinetic.Rect({});
            rect2.x(100);
            rect2.y(100);
            rect2.width(100);
            rect2.height(100);
            rect2.fill("Blue");
            var layer = new Kinetic.Layer();
            layer.add(rect2);
            this.stage.add(layer);
            this.attachBorder();
            requestAnimationFrame(this.tick);
        }
        Screen.prototype.attachBorder = function () {
            this.rect = new Kinetic.Rect({});
            this.rect.x(0);
            this.rect.y(0);
            this.rect.width(this.baseWidth);
            this.rect.height(this.baseHeight);
            this.rect.stroke("Black");
            this.rect.strokeWidth(3.5);
            this.stageData.UI.add(this.rect);
        };

        Screen.prototype.limitStageByWidth = function (elementWidth, elementHeight) {
            var scale = elementWidth / this.baseWidth;
            this.stageData.stage.scaleX(scale);
            this.stageData.stage.scaleY(scale);

            this.stageData.stage.setWidth(elementWidth);
            this.stageData.stage.setHeight(elementWidth * (this.baseHeight / this.baseWidth));

            if (this.stageData.stage.height() > elementHeight)
                return false;
            return true;
        };
        Screen.prototype.limitStageByHeight = function (elementWidth, elementHeight) {
            var scale = elementHeight / this.baseHeight;
            this.stageData.stage.scaleX(scale);
            this.stageData.stage.scaleY(scale);

            this.stageData.stage.setWidth(elementHeight * (this.baseWidth / this.baseHeight));
            this.stageData.stage.setHeight(elementHeight);

            if (this.stageData.stage.width() > elementHeight)
                return false;
            return true;
        };
        Screen.prototype.fitStageToScreen = function () {
            var elem = document.getElementById('content');

            var elementWidth = window.innerWidth * this.percentage;
            var elementHeight = window.innerHeight * this.percentage;
            if (!this.limitStageByWidth(elementWidth, elementHeight)) {
                this.limitStageByHeight(elementWidth, elementHeight);
            }
        };
        return Screen;
    })();
    CombatPong.Screen = Screen;
})(CombatPong || (CombatPong = {}));
var CombatPong;
(function (CombatPong) {
    var StageData = (function () {
        function StageData(stage) {
            this.stage = stage;

            this.UI = new Kinetic.Layer();
            this.stage.add(this.UI);

            this.foreground = new Kinetic.Layer();
            this.stage.add(this.foreground);

            this.background = new Kinetic.Layer();
            this.stage.add(this.background);
        }
        return StageData;
    })();
    CombatPong.StageData = StageData;
    ;
})(CombatPong || (CombatPong = {}));
var CombatPong;
(function (CombatPong) {
    var Util = (function () {
        function Util() {
        }
        Util.isNumberWithinBounds = function (num, leftBound, rightBound) {
            if (num > leftBound && num < rightBound)
                return true;
            return false;
        };

        Util.isCircle = function (obj) {
            var type = obj.getClassName();
            if (type == "Circle")
                return true;
            return false;
        };
        Util.isPolygon = function (obj) {
            var type = obj.getClassName();
            if (type == "Line")
                return true;
            return false;
        };
        return Util;
    })();
    CombatPong.Util = Util;
})(CombatPong || (CombatPong = {}));
//# sourceMappingURL=all.js.map
