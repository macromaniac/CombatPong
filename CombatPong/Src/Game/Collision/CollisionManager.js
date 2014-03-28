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
//# sourceMappingURL=CollisionManager.js.map
