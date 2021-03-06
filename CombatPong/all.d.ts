﻿declare module CombatPong {
    class CollisionManager {
        private stageData;
        private gameObjects;
        constructor(stageData: StageData, gameObjects: GameObject[]);
        public updateCollisions: () => void;
        private updateObjectMappings;
        private sortGameObjectsByMinX;
        private updateCollisionFromIndex;
        private doTheseIndecesRoughlyCollide;
        private doTheseIndecesCollide;
    }
}
declare module CombatPong {
    class GameObject {
        public interactiveGraphic: InteractiveGraphic;
        public graphic: Kinetic.Group;
        public stageData: StageData;
        constructor(stageData: StageData);
        public spawn(): void;
        public triggerAnotherObjectsCollision(receiver: GameObject, response: SAT.Response): void;
        public tick(): void;
        public checkForCollision(otherGameObject: GameObject): boolean;
        public retreiveCollisionData(): SAT.Response;
        public checkForRoughCollision(otherGameObject: GameObject): boolean;
        public onWallCollision(wall: Wall, response: SAT.Response): void;
        public onBallCollision(ball: Ball, response: SAT.Response): void;
    }
}
declare module CombatPong {
    class FrameData {
        public stageData: StageData;
        public player1: Player;
        public player2: Player;
        constructor(stageData: StageData);
    }
}
declare module CombatPong {
    function recvData(data: string): void;
    class NetMan {
        public stageData: StageData;
        public peerMan: PeerMan;
        public unhandledData: DataMessage[];
        constructor(stageData: StageData);
        public sendMessage(): void;
        public getHostingState: () => HostingState;
        public beginHosting(onHostingConnection: () => any): void;
        public beginJoining(onJoinConnection: () => any, idToJoin: string): void;
        public onHostingConnection: () => void;
        public onJoiningConnection: () => void;
        public timeSinceStartMS: () => number;
        public tick: () => boolean;
        private hasRecievedNecissaryData;
        private processUnhandledData;
        public recieveData(data: string): void;
        public broadCastData: () => void;
    }
}
declare module CombatPong {
    class InteractiveGraphic {
        public stageData: StageData;
        public graphic: Kinetic.Group;
        public minX: number;
        public maxX: number;
        public satCircles: SAT.Circle[];
        public satPolygons: SAT.Polygon[];
        public satResponse: SAT.Response;
        constructor(stageData: StageData, graphic: Kinetic.Group);
        private resetCollisionData();
        private considerPointForMinMax(xPoint);
        public displayPolygons(): void;
        public mapPoints(): void;
        public roughCollisionTest(otherGraphic: InteractiveGraphic): boolean;
        public SATcollisionTest(otherGraphic: InteractiveGraphic): boolean;
    }
}
declare module CombatPong {
    class Ball extends GameObject {
        static defaultBallColor: string;
        public circle: Kinetic.Circle;
        constructor(stageData: StageData, x: number, y: number, radius: number);
        public spawnWithParamaters(x: number, y: number, radius: number): void;
        public onWallCollision(wall: Wall, response: SAT.Response): void;
        public triggerAnotherObjectsCollision(otherGameObject: GameObject, response: SAT.Response): void;
        public tick(): void;
    }
}
declare module CombatPong {
    class Game {
        public logicFrameLengthInMS: number;
        private stageData;
        private world;
        private gameHostingInterface;
        private netMan;
        constructor(stageData: StageData);
        public tick: () => void;
        public tickNumber: number;
        public expectedTickNumber: number;
        private regulatedTick;
        private isNetworkTick;
        public beginGameAsHost: () => void;
        public beginGameAsClient: () => void;
    }
}
declare module CombatPong {
    class Wall extends GameObject {
        static defaultWallColor: string;
        public rect: Kinetic.Line;
        constructor(stageData: StageData, x: number, y: number, width: number, height: number);
        public spawnWithParams(x: number, y: number, width: number, height: number): void;
        public onBallCollision(ball: Ball, response: SAT.Response): void;
        public triggerAnotherObjectsCollision(otherGameObject: GameObject, response: SAT.Response): void;
    }
}
declare module CombatPong {
    class World {
        private stageData;
        private worldObjects;
        private collisionManager;
        constructor(stageData: StageData);
        private createWalls();
        public tick(): void;
    }
}
declare module CombatPong {
    class GameHostingInterface {
        private stageData;
        private gameHostingManager;
        private peerIDS;
        constructor(stageData: StageData);
        private updateGameListing;
        private displayJoinableGame;
        private displayHostOption;
        private onHostButtonClicked;
        private clearInterface;
        private onJoinButtonClicked(peerIDToJoin);
        private displayCouldNotContactServer();
        public stopMM(): void;
    }
}
declare module CombatPong {
    class GameHostingManager {
        static gameListRefreshRateInMS: number;
        private stageData;
        private updateGameListingCallback;
        constructor(stageData: StageData, updateGameListingCallback: (peerIDS: string[]) => void);
        private socket;
        public requestList: () => void;
        public isConnected: boolean;
        private timeout;
        private amITryingToHost;
        public connectToGameHostingServer: () => void;
        public disconnectFromGameHostingServer: () => void;
        public onHostingConnected: () => void;
        public onJoiningConnected: () => void;
        private removeMM();
        public hostGame: (gameID: string) => void;
        public stopHostingGame: () => void;
        public isHosting: () => boolean;
    }
}
declare module Button {
    var buttonMax: number;
    enum Code {
        Shift = 16,
        Ctrl = 17,
        Alt = 18,
        Left = 37,
        Up = 38,
        Right = 39,
        Down = 40,
        Zero = 48,
        One = 49,
        Two = 50,
        Three = 51,
        Four = 52,
        Five = 53,
        Six = 54,
        Seven = 55,
        Eight = 56,
        Nine = 57,
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
        Z = 90,
    }
}
declare module Macro {
    var currentState: State;
    function record(): void;
    function stopRecording(): void;
    class Event {
        public execute: (state: State) => void;
        public isKey(): boolean;
    }
    class KeyEvent extends Event {
        public kCode: number;
        public isKeyDown: boolean;
        constructor(keyCode: number, isKeyDown: boolean);
        public execute: (state: State) => void;
        public isKey(): boolean;
    }
    class MouseEvent extends Event {
        public x: number;
        public y: number;
        public mouseClick: boolean;
        constructor(x: number, y: number, mouseClick?: boolean);
        public isKey(): boolean;
        public execute: (state: State) => void;
    }
    class EventList {
        public frameAt: number;
        constructor(frameAt: number);
        public list: Event[];
        private nextEventList;
        public immediatelyAddEvent(e: Event): void;
        public addEvent(e: Event): void;
        public getNextEventList(): EventList;
    }
    class State {
        public buttonDownBooleans: boolean[];
        public wasKeyReleased: boolean[];
        public mouseEventList: MouseEvent[];
        public eventList: EventList;
        constructor();
        private generateButtonMapArray();
        private undoReleaseKeys();
        public updateFromEventList: (eventList: EventList) => void;
        public update: () => void;
        public isKeyDown: (key: Button.Code) => boolean;
        public isKeyUp: (key: Button.Code) => boolean;
        public isKeyReleased: (key: Button.Code) => boolean;
        public getMouseEvents: () => MouseEvent[];
        public getFrame: () => number;
    }
}
declare module CombatPong {
    class Screen {
        public stageData: StageData;
        public rect: Kinetic.Rect;
        public baseWidth: number;
        public baseHeight: number;
        public stage: Kinetic.Stage;
        public game: Game;
        constructor(width: number, height: number, divID: string);
        private tick;
        private attachBorder;
        private percentage;
        private limitStageByWidth(elementWidth, elementHeight);
        private limitStageByHeight(elementWidth, elementHeight);
        public fitStageToScreen(): void;
    }
}
declare module CombatPong {
    enum HostingState {
        Host = 0,
        Client = 1,
        Neither = 2,
    }
    class PeerMan {
        static defaultNetworkFrameLengthInMS: number;
        static networkPaddingFrameNumber: number;
        public hostingState: HostingState;
        public timeStart: number;
        private peer;
        private generatePeer;
        constructor();
        public networkTickCount: number;
        public tick: () => void;
        public beginJoining: (onJoinConnection: () => any, idToJoin: string) => void;
        public beginHosting: (onHostingConnection: () => any) => void;
        private zeroOutTheTime;
        public timeSinceStartMS: () => number;
    }
}
declare module CombatPong {
    class StageData {
        public isNetEnabled: boolean;
        public UI: Kinetic.Layer;
        public foreground: Kinetic.Layer;
        public background: Kinetic.Layer;
        public stage: Kinetic.Stage;
        public baseWidth: number;
        public baseHeight: number;
        public game: Game;
        public netMan: NetMan;
        public player1: Player;
        public player2: Player;
        private findNetworkSettings();
        constructor(stage: Kinetic.Stage, baseWidth: number, baseHeight: number);
    }
}
declare module MWG {
    enum ButtonCode {
        Shift = 16,
        Ctrl = 17,
        Alt = 18,
        Left = 37,
        Up = 38,
        Right = 39,
        Down = 40,
        Zero = 48,
        One = 49,
        Two = 50,
        Three = 51,
        Four = 52,
        Five = 53,
        Six = 54,
        Seven = 55,
        Eight = 56,
        Nine = 57,
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
        Z = 90,
    }
    class KeyMan {
        static isButtonDown(buttonCode: ButtonCode): boolean;
    }
}
declare module Util {
    class Conf {
        static hostURL: string;
        static peerPort: number;
        static socketPort: number;
        static forceDisableNet: boolean;
        static forceEnableNet: boolean;
        static uniqueID: string;
    }
    class Algorithms {
        static isNumberWithinBounds(num: number, leftBound: number, rightBound: number): boolean;
        static genID(): string;
    }
    class Graphics {
        static copyAndFlipResponse(response: SAT.Response): SAT.Response;
        static isCircle(obj: any): boolean;
        static isPolygon(obj: any): boolean;
        static genRectLines(x: number, y: number, width: number, height: number): Kinetic.Line;
    }
    class Interface {
        static d: HTMLDivElement;
        static addStandardButton(buttonText: string): HTMLElement;
        static clearInterface(): void;
    }
}
declare module CombatPong {
}
declare module CombatPong {
    enum MSGType {
        SYS = 0,
        KEYPRESS = 1,
    }
    class DataMessage {
        constructor();
    }
}
declare module CombatPong {
    class InputMan {
    }
    enum PlayerHostState {
        PlayerIsHost = 0,
        PlayerIsNotHost = 1,
    }
    class Player {
        public eventLists: Macro.EventList[];
        public state: Macro.State;
        public frameAt: number;
        public playerHostState: PlayerHostState;
        public uploadPlayerData: boolean;
        constructor(hostState: PlayerHostState);
        public acceptBrowserInput: () => void;
        public canUpdate: () => boolean;
        public update: () => void;
        public addEventList: (eventList: Macro.EventList) => void;
    }
}
