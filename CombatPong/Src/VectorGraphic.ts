module CombatPong {

    export enum CollisionID { nothing, wall, paddle };

    export class VectorGraphic {
        stageData: StageData;
        public graphic: Kinetic.Group;

        public collisionID: CollisionID;

        public minX: number;
        public maxX: number;
        constructor(stageData: StageData) {
            this.stageData = stageData;
            this.graphic = new Kinetic.Group();
            this.collisionID = CollisionID.nothing;
        }
        private resetMinMax() {
            this.minX = Number.MAX_VALUE; this.maxX = Number.MIN_VALUE;
        }
        private considerPointForMinMax(xPoint: number) {
            if (xPoint < this.minX)
                this.minX = xPoint;
            if (xPoint > this.maxX)
                this.maxX = xPoint;

        }
        public mapPoints() {
            this.resetMinMax();

            for (var child in this.graphic.getChildren()) {
                var type = <string>child.getClassName();
                if (type == "Circle") {
                    var circleChild = <Kinetic.Circle>child;
                    this.considerPointForMinMax(circleChild.x() - circleChild.radius());
                    this.considerPointForMinMax(circleChild.x() + circleChild.radius());
                } else {
                    var polygonChild = <Kinetic.Line>child;
                    for (var i = 0; i < polygonChild.points().length / 2; ++i) {
                        var x = polygonChild.points()[i * 2];
                        var y = polygonChild.points()[i * 2 + 1];
                        this.considerPointForMinMax(x);
                        //add to sat
                    }
                }
            }
        }
        public roughCollisionTest(otherGraphic: VectorGraphic) {
            if (this.collisionID == CollisionID.nothing || otherGraphic.collisionID == CollisionID.nothing)
                return;

        }
        public collisionTest(otherGraphic: VectorGraphic) {
            if (this.collisionID == CollisionID.nothing || otherGraphic.collisionID == CollisionID.nothing)
                return;
        }
    };
}