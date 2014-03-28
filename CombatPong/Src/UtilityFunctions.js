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
        return Conf;
    })();
    Util.Conf = Conf;
    var Math = (function () {
        function Math() {
        }
        Math.isNumberWithinBounds = function (num, leftBound, rightBound) {
            if (num >= leftBound && num <= rightBound)
                return true;
            return false;
        };
        return Math;
    })();
    Util.Math = Math;
    ;
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
    Interface.d.style.margin = "0px";
    document.body.appendChild(Interface.d);
})(Util || (Util = {}));
//# sourceMappingURL=UtilityFunctions.js.map
