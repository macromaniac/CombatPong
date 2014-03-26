module Util {
	export class Conf {
		public static hostURL: string = "http://localhost";
		public static peerPort: number = 9000;
		public static socketPort: number = 23156;
	}
	export class Math {
		public static isNumberWithinBounds(num: number, leftBound: number, rightBound: number): boolean {
			if (num >= leftBound && num <= rightBound)
				return true;
			return false;
		}

	};
	export class Graphics {
		public static copyAndFlipResponse(response: SAT.Response): SAT.Response {
			var flippedResponse: SAT.Response = new SAT.Response();
			flippedResponse.overlapV = response.overlapV.reverse();
			flippedResponse.overlapN = response.overlapN.reverse();
			flippedResponse.overlap = response.overlap;
			return flippedResponse;
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
		public static genRectLines(x: number, y: number, width: number, height: number): Kinetic.Line {
			var line = new Kinetic.Line({});
			//line.x(x);
			//line.y(y);
			var points: number[] = [];
			points.push(x, y);
			points.push(x + width, y + 0);
			points.push(x + width, y + height);
			points.push(x + 0, y + height);

			line.setPoints(points);
			line.closed(true);
			return line;
		}
	};
	export class Interface {

		public static d: HTMLDivElement = document.createElement("div");

		public static addStandardButton(buttonText: string): HTMLElement {
			var b: HTMLElement = document.createElement("BUTTON");
			var t: Text = document.createTextNode(buttonText);
			b.appendChild(t);
			b.style.margin = "0px";
			b.style.padding = "0px";
			b.style.zIndex = "100";
			b.style.top = "auto";
			b.style.left = "10px";
			Interface.d.appendChild(b);
			return b;
		}
		public static clearInterface() {
			while (Interface.d.firstChild)
				Interface.d.removeChild(Interface.d.firstChild);
		}
	};
	//here we create the absolute Div that way we can draw things on top of the canvas
	Interface.d.style.position = "absolute";
	Interface.d.style.top = "10px";
	Interface.d.style.margin = "0px";
	document.body.appendChild(Interface.d);


}