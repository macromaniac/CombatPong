declare module CombatPong {
    class CollisionManager {
        private stageData;
        private gameObjects;
        constructor(stageData: StageData, gameObjects: GameObject[]);
        public updateCollisions(): void;
        private updateObjectMappings();
        private sortGameObjectsByMinX();
        private updateCollisionFromIndex(index);
        private doTheseIndecesRoughlyCollide(indexA, indexB);
        private doTheseIndecesCollide(indexA, indexB);
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
        private peerMan;
        private gameHostingInterface;
        constructor(stageData: StageData);
        public tick(): void;
        public tickNumber: number;
        public expectedTickNumber: number;
        private regulatedTick();
        private isNetworkTick(tickNo);
    }
    class Timer {
        constructor();
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
        private displayJoinableGame(gameTitle, gameID);
        private displayHostOption();
        private hostGame;
        private clearInterface();
        private joinGame(game);
        private displayCouldNotContactServer();
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
        private amIHosting;
        public connectToGameHostingServer(): void;
        public onHostingConnected(): void;
        public hostGame(gameID: string): void;
        public stopHostingGame(): void;
        public isHosting(): boolean;
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
        private attachBorder();
        private percentage;
        private limitStageByWidth(elementWidth, elementHeight);
        private limitStageByHeight(elementWidth, elementHeight);
        public fitStageToScreen(): void;
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
        public peerMan: PeerMan;
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
declare module CombatPong {
    class PeerMan {
        static defaultNetworkFrameLengthInMS: number;
        private peer;
        private generatePeer();
        constructor();
        public tick(): void;
        public beginHosting(onHostingConnection: () => any): void;
        public stopHosting(): void;
        private stopAcceptingConnections();
        public timeSinceStartMS(): number;
    }
    class PeerManServer {
        constructor();
    }
    class PeerManClient {
        public serverID: string;
        constructor(serverID: string);
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
