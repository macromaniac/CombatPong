module CombatPong {
	export class Util {
		public static isNumberWithinBounds(num: number, leftBound: number, rightBound: number): boolean {
			if (num > leftBound && num < rightBound)
				return true;
			return false;
		}

		public static isCircle(obj: any) {
			var type = <string>obj.getClassName();
			if (type == "Circle")
				return true;
			return false;
		}
		public static isPolygon(obj: any) {
			var type = <string>obj.getClassName();
			if (type == "Line")
				return true;
			return false;
		}
		public static genRectLines(x: number, y: number, width: number, height: number):Kinetic.Line{
			var line = new Kinetic.Line({});
			var points: number[] = [];
			points.push(x, y);
			points.push(x + width, y);
			points.push(x+width, y+height);
			points.push(x, y+height);
			line.setPoints(points);
			line.closed(true);
			return line;
		}
	}
}