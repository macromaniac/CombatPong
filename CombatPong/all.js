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
                    var flippedResponse = Util.Graphics.copyAndFlipResponse(response);

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
                if (Util.Graphics.isCircle(child)) {
                    var circleChild = child;
                    var scale = circleChild.scale();
                    this.considerPointForMinMax(circleChild.x() - circleChild.radius() * scale.x);
                    this.considerPointForMinMax(circleChild.x() + circleChild.radius() * scale.y);
                    this.satCircles.push(new SAT.Circle(new SAT.Vector(circleChild.x(), circleChild.y()), circleChild.radius() * scale.x));
                } else if (Util.Graphics.isPolygon(child)) {
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
            if (Util.Algorithms.isNumberWithinBounds(min, leftBound, rightBound))
                return true;
            if (Util.Algorithms.isNumberWithinBounds(max, leftBound, rightBound))
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
    var Game = (function () {
        function Game(stageData) {
            this.logicFrameLengthInMS = 1 / 50 * 1000;
            this.tickNumber = 0;
            this.expectedTickNumber = 0;
            this.stageData = stageData;

            //this.world = new World(stageData);
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
                if (this.world)
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
var CombatPong;
(function (CombatPong) {
    var GameHostingInterface = (function () {
        function GameHostingInterface(stageData) {
            var _this = this;
            this.updateGameListing = function (peerIDS) {
                _this.clearInterface();
                _this.peerIDS = peerIDS;
                Util.Interface.d.appendChild(document.createTextNode("Combat Pong"));
                Util.Interface.d.appendChild(document.createElement("br"));
                if (_this.stageData.isNetEnabled == false) {
                    _this.displayCouldNotContactServer();
                    return;
                }
                for (var i = 0; i < peerIDS.length; ++i) {
                    _this.displayJoinableGame("Game " + i.toString(), peerIDS[i]);
                }
                _this.displayHostOption();
            };
            this.hostGame = function () {
                _this.gameHostingManager.hostGame(Util.Conf.uniqueID);
                _this.gameHostingManager.requestList();
            };
            this.stageData = stageData;
            this.gameHostingManager = new CombatPong.GameHostingManager(this.stageData, this.updateGameListing);
            //if (stageData.isNetEnabled)
            //	this.displayButtons();
        }
        GameHostingInterface.prototype.displayJoinableGame = function (gameTitle, gameID) {
            var _this = this;
            var t = document.createTextNode(gameTitle + "-----");
            Util.Interface.d.appendChild(t);
            var b = Util.Interface.addStandardButton("Join");
            b.onclick = function () {
                _this.joinGame(gameID);
            };
            Util.Interface.d.appendChild(document.createElement("br"));
        };
        GameHostingInterface.prototype.displayHostOption = function () {
            var b = Util.Interface.addStandardButton("Host Game");
            b.onclick = this.hostGame;
            if (this.gameHostingManager.isHosting()) {
                Util.Interface.d.appendChild(document.createElement("br"));
                Util.Interface.d.appendChild(document.createTextNode("You are currently hosting game " + this.peerIDS.indexOf(Util.Conf.uniqueID)));
            }
        };

        GameHostingInterface.prototype.clearInterface = function () {
            Util.Interface.clearInterface();
        };
        GameHostingInterface.prototype.joinGame = function (game) {
            this.gameHostingManager.stopHostingGame();
            this.gameHostingManager.requestList();
            //alert("Joined game " + game.toString());
        };
        GameHostingInterface.prototype.displayCouldNotContactServer = function () {
            this.clearInterface();
            var t = document.createTextNode("Could not connect to lobby");
            Util.Interface.d.appendChild(t);
        };
        return GameHostingInterface;
    })();
    CombatPong.GameHostingInterface = GameHostingInterface;
    ;
})(CombatPong || (CombatPong = {}));
var CombatPong;
(function (CombatPong) {
    var GameHostingManager = (function () {
        function GameHostingManager(stageData, updateGameListingCallback) {
            var _this = this;
            this.requestList = function () {
                _this.socket.emit('Check If Hosting', {});
                _this.socket.emit('Request GameList', {});
                _this.timeout = setTimeout(_this.requestList, GameHostingManager.gameListRefreshRateInMS);
            };
            this.isConnected = false;
            this.amIHosting = false;
            this.stageData = stageData;
            this.updateGameListingCallback = updateGameListingCallback;
            this.connectToGameHostingServer();
        }
        GameHostingManager.prototype.connectToGameHostingServer = function () {
            var _this = this;
            this.socket = io.connect(Util.Conf.hostURL);

            this.socket.on('connect', function () {
                _this.isConnected = true;
                _this.timeout = setTimeout(_this.requestList, GameHostingManager.gameListRefreshRateInMS);
                _this.requestList();
            });

            this.socket.on('disconnect', function () {
                _this.isConnected = false;
                clearTimeout(_this.timeout);
            });

            this.socket.on('Update Hosting Info', function (data) {
                _this.amIHosting = data.amIHosting;
            });

            this.socket.on('GameList', this.updateGameListingCallback);
        };

        GameHostingManager.prototype.onHostingConnected = function () {
            this.socket.emit('disconnect', {});
        };
        GameHostingManager.prototype.hostGame = function (gameID) {
            this.socket.emit('Host Game', gameID);
            this.stageData.peerMan.beginHosting(this.onHostingConnected);
            this.amIHosting = true;
        };
        GameHostingManager.prototype.stopHostingGame = function () {
            this.socket.emit('Stop Hosting Game', {});
            this.stageData.peerMan.stopHosting();
            this.amIHosting = false;
        };

        GameHostingManager.prototype.isHosting = function () {
            return this.amIHosting;
        };
        GameHostingManager.gameListRefreshRateInMS = 3500;
        return GameHostingManager;
    })();
    CombatPong.GameHostingManager = GameHostingManager;
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
            this.generatePeer();
        }
        PeerMan.prototype.generatePeer = function () {
            this.peer = new Peer(Util.Conf.uniqueID, { host: 'localhost', port: 9000, path: '/myapp' });
        };

        PeerMan.prototype.tick = function () {
        };
        PeerMan.prototype.beginHosting = function (onHostingConnection) {
            var _this = this;
            this.peer.on('connection', function (dataConnection) {
                _this.stopAcceptingConnections();
                onHostingConnection();
            });
        };
        PeerMan.prototype.stopHosting = function () {
            this.peer.destroy();
            this.generatePeer();
        };
        PeerMan.prototype.stopAcceptingConnections = function () {
            this.peer.destroy();
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
var Util;
(function (Util) {
    var Conf = (function () {
        function Conf() {
        }
        Conf.hostURL = "http://localhost:23156";
        Conf.peerPort = 9000;
        Conf.socketPort = 23156;
        Conf.forceDisableNet = false;
        Conf.forceEnableNet = false;
        Conf.uniqueID = "";
        return Conf;
    })();
    Util.Conf = Conf;

    var Algorithms = (function () {
        function Algorithms() {
        }
        Algorithms.isNumberWithinBounds = function (num, leftBound, rightBound) {
            if (num >= leftBound && num <= rightBound)
                return true;
            return false;
        };
        Algorithms.genID = function () {
            // always start with a letter (for DOM friendlyness)
            var idstr = String.fromCharCode(Math.floor((Math.random() * 25) + 65));
            do {
                // between numbers and characters (48 is 0 and 90 is Z (42-48 = 90)
                var ascicode = Math.floor((Math.random() * 42) + 48);
                if (ascicode < 58 || ascicode > 64) {
                    // exclude all chars between : (58) and @ (64)
                    idstr += String.fromCharCode(ascicode);
                }
            } while(idstr.length < 32);

            return (idstr);
        };
        return Algorithms;
    })();
    Util.Algorithms = Algorithms;
    ;

    //generate a unique ID for the user at the start
    Util.Conf.uniqueID = Algorithms.genID();

    var Graphics = (function () {
        function Graphics() {
        }
        Graphics.copyAndFlipResponse = function (response) {
            var flippedResponse = new SAT.Response();
            flippedResponse.overlapV = response.overlapV.reverse();
            flippedResponse.overlapN = response.overlapN.reverse();
            flippedResponse.overlap = response.overlap;
            return flippedResponse;
        };
        Graphics.isCircle = function (obj) {
            var type = obj.getClassName();
            if (type == "Circle")
                return true;
            return false;
        };
        Graphics.isPolygon = function (obj) {
            var type = obj.getClassName();
            if (type == "Line")
                return true;
            return false;
        };
        Graphics.genRectLines = function (x, y, width, height) {
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
        return Graphics;
    })();
    Util.Graphics = Graphics;
    ;
    var Interface = (function () {
        function Interface() {
        }
        Interface.addStandardButton = function (buttonText) {
            var b = document.createElement("BUTTON");
            var t = document.createTextNode(buttonText);
            b.appendChild(t);
            b.style.margin = "0px";
            b.style.padding = "0px";
            b.style.zIndex = "100";
            b.style.top = "auto";
            b.style.left = "10px";
            Interface.d.appendChild(b);
            return b;
        };
        Interface.clearInterface = function () {
            while (Interface.d.firstChild)
                Interface.d.removeChild(Interface.d.firstChild);
        };
        Interface.d = document.createElement("div");
        return Interface;
    })();
    Util.Interface = Interface;
    ;

    //here we create the absolute Div that way we can draw things on top of the canvas
    Interface.d.style.position = "absolute";
    Interface.d.style.top = "10px";
    Interface.d.style.width = "100%";
    Interface.d.style.margin = "0 auto";
    document.body.appendChild(Interface.d);
})(Util || (Util = {}));
//make sure this file is ran last!
/// <reference path="game/collision/collisionmanager.ts" />
/// <reference path="game/collision/gameobject.ts" />
/// <reference path="game/collision/interactivegraphic.ts" />
/// <reference path="game/ball.ts" />
/// <reference path="game/game.ts" />
/// <reference path="game/wall.ts" />
/// <reference path="game/world.ts" />
/// <reference path="matchmaking/gamehostinginterface.ts" />
/// <reference path="matchmaking/gamehostingmanager.ts" />
/// <reference path="meta/screen.ts" />
/// <reference path="meta/stagedata.ts" />
/// <reference path="keyman.ts" />
/// <reference path="peerman.ts" />
/// <reference path="utilityfunctions.ts" />
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
//# sourceMappingURL=all.js.map
