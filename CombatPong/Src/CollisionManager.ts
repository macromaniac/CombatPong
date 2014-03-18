module CombatPong {
    export class CollisionManager {
        private stageData: StageData;
        private gameObjects: GameObject[];
        constructor(stageData: StageData, gameObjects: GameObject[]) {
            this.stageData = stageData;
            this.gameObjects = gameObjects;
        }

        public updateCollisions() {
            this.updateObjectMappings();
            this.sortGameObjectsByMinX();
            for (var i: number = 0; i < this.gameObjects.length; ++i) {
                this.updateCollisionFromIndex(i);
            }
        }

        private updateObjectMappings() {
            for (var i: number = 0; i < this.gameObjects.length; ++i)
                this.gameObjects[i].interactiveGraphic.mapPoints();
        }
        private sortGameObjectsByMinX() {
            //We use insertion here because the list is mostly sorted already (Should average o(n))
            var j: number = 1;
            for (var i: number = 1; i < this.gameObjects.length; ++i) {
                j = i;
                while (j > 0 && this.gameObjects[j - 1].interactiveGraphic.minX > this.gameObjects[j].interactiveGraphic.minX) {
                    var temp = this.gameObjects[j-1];
                    this.gameObjects[j-1] = this.gameObjects[j];
                    this.gameObjects[j] = temp;
                    j--;
                }
            }
            var a = 0;
        }
        private updateCollisionFromIndex(index: number) {
            var center: number = index;
            //Since the gameObjectsAre sorted by min X we can roughly collide them going to the right
            //until they no longer roughly collied (when their min X is greater than our max X)

            var rightBound: number = center;
            while (this.doTheseIndecesRoughlyCollide(center, rightBound+1))
                rightBound++;
            while (rightBound > center) {
                if (this.doTheseIndecesCollide(center, rightBound)) {

                    var a: GameObject = this.gameObjects[center];
                    var b: GameObject = this.gameObjects[rightBound];

                    var response: SAT.Response = a.retreiveCollisionData();
                    var flippedResponse: SAT.Response = Util.copyAndFlipResponse(response);

                    a.triggerAnotherObjectsCollision(b, response);
                    b.triggerAnotherObjectsCollision(a, flippedResponse);
                }
                rightBound--;
            }
        }

        private doTheseIndecesRoughlyCollide(indexA: number, indexB: number): boolean {
            if (indexA < 0 || indexA > this.gameObjects.length -1)
                return false;
            if (indexB < 0 || indexB > this.gameObjects.length -1)
                return false;
            return true;
            var a: GameObject = this.gameObjects[indexA];
            var b: GameObject = this.gameObjects[indexB];

            return (a.checkForRoughCollision(b));
        }
        private doTheseIndecesCollide(indexA: number, indexB: number): boolean {
            //We do not check for index  because we have checked in the rough collision test
            var a: GameObject = this.gameObjects[indexA];
            var b: GameObject = this.gameObjects[indexB];

            return a.checkForCollision(b);
        }
    }
} 