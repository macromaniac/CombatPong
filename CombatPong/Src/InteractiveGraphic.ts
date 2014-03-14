module CombatPong {


	export class InteractiveGraphic {
		stageData: StageData;
		public graphic: Kinetic.Group;

		public parent: GameObject;
		public minX: number; public maxX: number;

		public satCircles: SAT.Circle[];
		public satPolygons: SAT.Polygon[];

		public satResponse: SAT.Response;

		constructor(stageData: StageData, graphic: Kinetic.Group, parent: GameObject) {
			this.stageData = stageData;
			this.graphic = graphic
			this.parent = parent;
			this.satResponse = new SAT.Response();
		}
		private resetCollisionData() {
			this.minX = Number.MAX_VALUE; this.maxX = Number.MIN_VALUE;
			this.satCircles = [];
			this.satPolygons = [];
		}
		private considerPointForMinMax(xPoint: number) {
			if (xPoint < this.minX)
				this.minX = xPoint;
			if (xPoint > this.maxX)
				this.maxX = xPoint;

		}
		public mapPoints() {
			//generates the min max and converts point to SAT format (could not be casted, potential speed boost here but the points need to be analyzed for min max anyways so its not that big. Casting would require modifying SAT.js Vector class)
			this.resetCollisionData();
			for (var child in this.graphic.getChildren()) {
				if (Util.isCircle(child)) {
					var circleChild = <Kinetic.Circle>child;
					this.considerPointForMinMax(circleChild.x() - circleChild.radius());
					this.considerPointForMinMax(circleChild.x() + circleChild.radius());
					this.satCircles.push(
						new SAT.Circle(new SAT.Vector(circleChild.x(),
							circleChild.y()), circleChild.radius()));
				} else if (Util.isPolygon(child)) {
					var polygonChild = <Kinetic.Line>child;
					var polygonSATPoints: SAT.Vector[] = [];
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
		}
		public roughCollisionTest(otherGraphic: InteractiveGraphic): boolean {
			var min = this.minX;
			var max = this.maxX;
			var leftBound = otherGraphic.minX;
			var rightBound = otherGraphic.maxX;
			if (Util.isNumberWithinBounds(min, leftBound, rightBound))
				return true;
			if (Util.isNumberWithinBounds(max, leftBound, rightBound))
				return true;
			return false;
		}
		public SATcollisionTest(otherGraphic: InteractiveGraphic): boolean {
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
		}
	};
}