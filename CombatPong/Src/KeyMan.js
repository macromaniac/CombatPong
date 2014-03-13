///<reference path="LibraryIncludes.ts" />
var MWG;
(function (MWG) {
    var ButtonCode;
    (function (ButtonCode) {
        ButtonCode[ButtonCode["Left"] = 37] = "Left";
        ButtonCode[ButtonCode["Right"] = 39] = "Right";
        ButtonCode[ButtonCode["Down"] = 40] = "Down";
        ButtonCode[ButtonCode["Up"] = 38] = "Up";
    })(ButtonCode || (ButtonCode = {}));
    var KeyMan = (function () {
        function KeyMan() {
        }
        KeyMan.generateButtonMapArray = function () {
            while (this.buttonNames.length > 0) {
                this.buttonNames.pop();
                this.buttonDownBooleans.pop();
            }
            for (var buttonMember in ButtonCode) {
                if (typeof ButtonCode[buttonMember] === 'number') {
                    this.buttonNames.push(buttonMember);
                    this.buttonDownBooleans.push(false);
                }
            }
        };
        KeyMan.keyUpListener = function (e) {
            var i = 0;
            for (var buttonMember in KeyMan.buttonNames) {
                if (ButtonCode[KeyMan.buttonNames[buttonMember]] == e.keyCode)
                    KeyMan.buttonDownBooleans[i] = false;
                i++;
            }
        };
        KeyMan.keyDownListener = function (e) {
            var i = 0;
            for (var buttonMember in KeyMan.buttonNames) {
                if (ButtonCode[KeyMan.buttonNames[buttonMember]] == e.keyCode)
                    KeyMan.buttonDownBooleans[i] = true;
                i++;
            }
        };
        KeyMan.isButtonDown = function (buttonCode) {
            return false;
        };
        KeyMan.buttonNames = [];
        KeyMan.buttonDownBooleans = [];
        return KeyMan;
    })();
    KeyMan.generateButtonMapArray();
    document.onkeyup = KeyMan.keyUpListener;
    document.onkeydown = KeyMan.keyDownListener;
})(MWG || (MWG = {}));
//# sourceMappingURL=KeyMan.js.map
