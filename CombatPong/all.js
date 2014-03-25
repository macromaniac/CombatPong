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
    var GameObject = (function () {
        function GameObject(stageData) {
            this.stageData = stageData;
            this.graphic = new Kinetic.Group({});
            this.spawn();
            this.stageData.foreground.add(this.graphic);
            this.interactiveGraphic = new CombatPong.InteractiveGraphic(this.stageData, this.graphic);
        }
        GameObject.prototype.spawn = function () {
        };
        GameObject.prototype.triggerAnotherObjectsCollision = function (receiver, response) {
            var i = 4;
        };

        GameObject.prototype.tick = function () {
        };
        GameObject.prototype.checkForCollision = function (otherGameObject) {
            return this.interactiveGraphic.SATcollisionTest(otherGameObject.interactiveGraphic);
        };
        GameObject.prototype.retreiveCollisionData = function () {
            return this.interactiveGraphic.satResponse;
        };
        GameObject.prototype.checkForRoughCollision = function (otherGameObject) {
            return this.interactiveGraphic.roughCollisionTest(otherGameObject.interactiveGraphic);
        };
        GameObject.prototype.onWallCollision = function (wall, response) {
        };
        GameObject.prototype.onBallCollision = function (ball, response) {
        };
        return GameObject;
    })();
    CombatPong.GameObject = GameObject;
})(CombatPong || (CombatPong = {}));
/// <reference path="gameobject.ts" />
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
var CombatPong;
(function (CombatPong) {
    var CollisionManager = (function () {
        function CollisionManager(stageData, gameObjects) {
            this.stageData = stageData;
            this.gameObjects = gameObjects;
        }
        CollisionManager.prototype.updateCollisions = function () {
            this.updateObjectMappings();
            this.sortGameObjectsByMinX();
            for (var i = 0; i < this.gameObjects.length; ++i) {
                this.updateCollisionFromIndex(i);
            }
        };

        CollisionManager.prototype.updateObjectMappings = function () {
            for (var i = 0; i < this.gameObjects.length; ++i)
                this.gameObjects[i].interactiveGraphic.mapPoints();
        };
        CollisionManager.prototype.sortGameObjectsByMinX = function () {
            //We use insertion here because the list is mostly sorted already (Should average o(n))
            var j = 1;
            for (var i = 1; i < this.gameObjects.length; ++i) {
                j = i;
                while (j > 0 && this.gameObjects[j - 1].interactiveGraphic.minX > this.gameObjects[j].interactiveGraphic.minX) {
                    var temp = this.gameObjects[j - 1];
                    this.gameObjects[j - 1] = this.gameObjects[j];
                    this.gameObjects[j] = temp;
                    j--;
                }
            }
            var a = 0;
        };
        CollisionManager.prototype.updateCollisionFromIndex = function (index) {
            var center = index;

            //Since the gameObjectsAre sorted by min X we can roughly collide them going to the right
            //until they no longer roughly collied (when their min X is greater than our max X)
            var rightBound = center;
            while (this.doTheseIndecesRoughlyCollide(center, rightBound + 1))
                rightBound++;
            while (rightBound > center) {
                if (this.doTheseIndecesCollide(center, rightBound)) {
                    var a = this.gameObjects[center];
                    var b = this.gameObjects[rightBound];

                    var response = a.retreiveCollisionData();
                    var flippedResponse = CombatPong.Util.copyAndFlipResponse(response);

                    a.triggerAnotherObjectsCollision(b, response);
                    b.triggerAnotherObjectsCollision(a, flippedResponse);
                }
                rightBound--;
            }
        };

        CollisionManager.prototype.doTheseIndecesRoughlyCollide = function (indexA, indexB) {
            if (indexA < 0 || indexA > this.gameObjects.length - 1)
                return false;
            if (indexB < 0 || indexB > this.gameObjects.length - 1)
                return false;
            return true;
            var a = this.gameObjects[indexA];
            var b = this.gameObjects[indexB];

            return (a.checkForRoughCollision(b));
        };
        CollisionManager.prototype.doTheseIndecesCollide = function (indexA, indexB) {
            //We do not check for index  because we have checked in the rough collision test
            var a = this.gameObjects[indexA];
            var b = this.gameObjects[indexB];

            return a.checkForCollision(b);
        };
        return CollisionManager;
    })();
    CombatPong.CollisionManager = CollisionManager;
})(CombatPong || (CombatPong = {}));
var CombatPong;
(function (CombatPong) {
    var Game = (function () {
        function Game(stageData) {
            this.logicFrameLengthInMS = 1 / 50 * 1000;
            this.tickNumber = 0;
            this.expectedTickNumber = 0;
            this.stageData = stageData;
            this.world = new CombatPong.World(stageData);
            this.peerMan = new CombatPong.PeerMan();
            this.gameHostingInterface = new CombatPong.GameHostingInterface(stageData);
        }
        Game.prototype.tick = function () {
            this.regulatedTick();
        };

        Game.prototype.regulatedTick = function () {
            this.expectedTickNumber = this.peerMan.timeSinceStartMS() / this.logicFrameLengthInMS;
            while (this.expectedTickNumber > this.tickNumber) {
                if (this.isNetworkTick(this.tickNumber))
                    this.peerMan.tick();
                this.world.tick();
                this.tickNumber++;
            }
        };
        Game.prototype.isNetworkTick = function (tickNo) {
            if (this.stageData.isNetEnabled == false)
                return false;
            var prevTickTime = this.logicFrameLengthInMS * (tickNo - 1);
            var tickTime = this.logicFrameLengthInMS * tickNo;
            var networkTickForPrevTickTime = Math.floor(prevTickTime / CombatPong.PeerMan.defaultNetworkFrameLengthInMS);
            var networkTickForCurrentTickTime = Math.floor(tickTime / CombatPong.PeerMan.defaultNetworkFrameLengthInMS);
            if (networkTickForCurrentTickTime > networkTickForPrevTickTime)
                return true;
            return false;
        };
        return Game;
    })();
    CombatPong.Game = Game;
    ;
    var Timer = (function () {
        function Timer() {
        }
        return Timer;
    })();
    CombatPong.Timer = Timer;
    ;
})(CombatPong || (CombatPong = {}));
var CombatPong;
(function (CombatPong) {
    var GameHostingInterface = (function () {
        function GameHostingInterface(stageData) {
            this.stageData = stageData;
            this.displayButtons();
            //if (stageData.isNetEnabled)
            //	this.displayButtons();
        }
        GameHostingInterface.prototype.displayButtons = function () {
            var b = document.createElement("BUTTON");
            var t = document.createTextNode("CLICK ME");
            b.appendChild(t);
            b.style.zIndex = "100";
            b.style.position = "absolute";
            b.style.top = "10px";
            b.style.bottom = "10px";
            b.style.marginTop = "10px";
            b.style.margin = "0px";
        };
        GameHostingInterface.prototype.hideButtons = function () {
        };
        return GameHostingInterface;
    })();
    CombatPong.GameHostingInterface = GameHostingInterface;
    ;
})(CombatPong || (CombatPong = {}));
var CombatPong;
(function (CombatPong) {
    var InteractiveGraphic = (function () {
        function InteractiveGraphic(stageData, graphic) {
            this.stageData = stageData;
            this.graphic = graphic;
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
        InteractiveGraphic.prototype.displayPolygons = function () {
        };
        InteractiveGraphic.prototype.mapPoints = function () {
            //generates the min max and converts point to SAT format (could not be casted, potential speed boost here but the points need to be analyzed for min max anyways so its not that big. Casting would require modifying SAT.js Vector class)
            this.resetCollisionData();

            var container = this.graphic.getChildren();
            var objList = container.toArray();
            for (var i = 0; i < objList.length; ++i) {
                var child = objList[i];
                if (CombatPong.Util.isCircle(child)) {
                    var circleChild = child;
                    var scale = circleChild.scale();
                    this.considerPointForMinMax(circleChild.x() - circleChild.radius() * scale.x);
                    this.considerPointForMinMax(circleChild.x() + circleChild.radius() * scale.y);
                    this.satCircles.push(new SAT.Circle(new SAT.Vector(circleChild.x(), circleChild.y()), circleChild.radius() * scale.x));
                } else if (CombatPong.Util.isPolygon(child)) {
                    var polygonChild = child;

                    var disp = new SAT.Vector(polygonChild.getX(), polygonChild.getY());

                    var rotation = polygonChild.rotation();

                    var scale = polygonChild.scale();
                    var polygonSATPoints = [];
                    for (var i = 0; i < polygonChild.points().length / 2; ++i) {
                        var x = polygonChild.points()[i * 2] * scale.x;
                        var y = polygonChild.points()[i * 2 + 1] * scale.y;
                        var satV = new SAT.Vector(x, y);
                        polygonSATPoints.push(satV);
                    }

                    //var satPolygon = new SAT.Polygon(new SAT.Vector(disp.x, disp.y), polygonSATPoints);
                    var satPolygon = new SAT.Polygon(new SAT.Vector(disp.x, disp.y), polygonSATPoints);

                    //var offsetVector: SAT.Vector = new SAT.Vector(polygonChild.offsetX(), polygonChild.offsetY());
                    var check = polygonChild.offsetX();
                    satPolygon.setOffset(new SAT.Vector(polygonChild.offsetX(), polygonChild.offsetY()));
                    satPolygon.rotate(polygonChild.rotation() * 0.0174532925);

                    for (var i = 0; i < satPolygon.points.length; ++i)
                        this.considerPointForMinMax(satPolygon.points[i].x);

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
                    if (SAT.testCircleCircle(this.satCircles[circle], otherGraphic.satCircles[otherCircle], this.satResponse))
                        return true;
                }
                for (var otherPolygon in otherGraphic.satPolygons) {
                    if (SAT.testCirclePolygon(this.satCircles[circle], otherGraphic.satPolygons[otherPolygon], this.satResponse))
                        return true;
                }
            }
            for (var polygon in this.satPolygons) {
                for (var otherCircle in otherGraphic.satCircles) {
                    if (SAT.testPolygonCircle(this.satPolygons[polygon], otherGraphic.satCircles[otherCircle], this.satResponse))
                        return true;
                }
                for (var otherPolygon in otherGraphic.satPolygons) {
                    if (SAT.testPolygonPolygon(this.satPolygons[polygon], otherGraphic.satPolygons[otherPolygon], this.satResponse))
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
    var PeerMan = (function () {
        function PeerMan() {
        }
        PeerMan.prototype.tick = function () {
        };
        PeerMan.prototype.timeSinceStartMS = function () {
            return 1;
        };
        PeerMan.defaultNetworkFrameLengthInMS = 1 / 8 * 1000;
        return PeerMan;
    })();
    CombatPong.PeerMan = PeerMan;
    ;
    var PeerManServer = (function () {
        function PeerManServer() {
        }
        return PeerManServer;
    })();
    CombatPong.PeerManServer = PeerManServer;
    ;
    var PeerManClient = (function () {
        function PeerManClient(serverID) {
            this.serverID = serverID;
        }
        return PeerManClient;
    })();
    CombatPong.PeerManClient = PeerManClient;
    ;
})(CombatPong || (CombatPong = {}));
var CombatPong;
(function (CombatPong) {
    var Screen = (function () {
        function Screen(width, height, divID) {
            var _this = this;
            this.tick = function (timestamp) {
                _this.stage.draw();
                _this.game.tick();
                requestAnimationFrame(_this.tick);
            };
            // If I don't have this there is occasionally a scrollbar on fullscreen, this is just light padding to prevent that from happening
            this.percentage = .99;
            this.stage = new Kinetic.Stage({ width: width, height: height, container: divID });
            this.baseHeight = height;
            this.baseWidth = width;

            this.stageData = new CombatPong.StageData(this.stage, this.baseWidth, this.baseHeight);
            this.attachBorder();

            this.game = new CombatPong.Game(this.stageData);

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
        function StageData(stage, baseWidth, baseHeight) {
            this.isNetEnabled = true;
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
            if (num >= leftBound && num <= rightBound)
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
        Util.genRectLines = function (x, y, width, height) {
            var line = new Kinetic.Line({});

            //line.x(x);
            //line.y(y);
            var points = [];
            points.push(x, y);
            points.push(x + width, y + 0);
            points.push(x + width, y + height);
            points.push(x + 0, y + height);

            line.setPoints(points);
            line.closed(true);
            return line;
        };
        Util.copyAndFlipResponse = function (response) {
            var flippedResponse = new SAT.Response();
            flippedResponse.overlapV = response.overlapV.reverse();
            flippedResponse.overlapN = response.overlapN.reverse();
            flippedResponse.overlap = response.overlap;
            return flippedResponse;
        };
        return Util;
    })();
    CombatPong.Util = Util;
})(CombatPong || (CombatPong = {}));
var CombatPong;
(function (CombatPong) {
    var Wall = (function (_super) {
        __extends(Wall, _super);
        function Wall(stageData, x, y, width, height) {
            _super.call(this, stageData);
            this.spawnWithParams(x, y, width, height);
        }
        Wall.prototype.spawnWithParams = function (x, y, width, height) {
            this.rect = CombatPong.Util.genRectLines(0, 0, width, height);
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
var CombatPong;
(function (CombatPong) {
    var World = (function () {
        function World(stageData) {
            this.stageData = stageData;
            this.worldObjects = [];
            this.createWalls();
            this.collisionManager = new CombatPong.CollisionManager(this.stageData, this.worldObjects);
        }
        World.prototype.createWalls = function () {
            var heightOfWalls = this.stageData.baseHeight / 20;
            var widthOfWalls = this.stageData.baseWidth;
            this.worldObjects.push(new CombatPong.Wall(this.stageData, 0, 0, widthOfWalls, heightOfWalls));

            this.worldObjects.push(new CombatPong.Wall(this.stageData, 0, this.stageData.baseHeight - heightOfWalls, widthOfWalls, heightOfWalls));

            this.worldObjects.push(new CombatPong.Ball(this.stageData, this.stageData.baseWidth / 2, this.stageData.baseHeight / 2, this.stageData.baseHeight / 50));
        };
        World.prototype.tick = function () {
            for (var i = 0; i < this.worldObjects.length; ++i) {
                this.worldObjects[i].tick();
            }
            this.collisionManager.updateCollisions();
        };
        return World;
    })();
    CombatPong.World = World;
    ;
})(CombatPong || (CombatPong = {}));
//# sourceMappingURL=all.js.map
