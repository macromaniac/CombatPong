module MWG {
    export enum ButtonCode {
        Shift= 16,
        Ctrl = 17,
        Alt= 18,
        Left= 37,
        Up= 38,
        Right= 39,
        Down= 40,
        Zero= 48,
        One= 49,
        Two= 50,
        Three= 51,
        Four= 52,
        Five= 53,
        Six= 54,
        Seven= 55,
        Eight= 56,
        Nine= 57,
        A = 65,
        B = 66,
        C = 67,
        D = 68,
        E = 69,
        F = 70,
        G = 71,
        H = 72,
        I = 73,
        J = 74,
        K = 75,
        L = 76,
        M = 77,
        N = 78,
        O = 79,
        P = 80,
        Q = 81,
        R = 82,
        S = 83,
        T = 84,
        U = 85,
        V = 86,
        W = 87,
        X = 88,
        Y = 89,
        Z = 90
    }
    var buttonMax: number = 100;
    export class KeyMan {
        public static isButtonDown(buttonCode: ButtonCode): boolean {
            return KeyManUtil.buttonDownBooleans[buttonCode];
        }

    }
    //Hide this class
    class KeyManUtil {
        public static buttonDownBooleans: boolean[] = [];
        static generateButtonMapArray() {
            while (this.buttonDownBooleans.length < buttonMax) {
                KeyManUtil.buttonDownBooleans.push(false);
            }
        }
        static keyUpListener(e: KeyboardEvent) {
            KeyManUtil.buttonDownBooleans[e.keyCode] = false;
        }
        static keyDownListener(e: KeyboardEvent) {
            KeyManUtil.buttonDownBooleans[e.keyCode] = true;
        }
    }
    KeyManUtil.generateButtonMapArray();
    document.onkeyup = KeyManUtil.keyUpListener;
    document.onkeydown = KeyManUtil.keyDownListener;
}