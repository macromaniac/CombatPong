/// <reference path="game/collision/collisionmanager.ts" />
/// <reference path="game/collision/gameobject.ts" />
/// <reference path="framedata.ts" />
/// <reference path="netman.ts" />
/// <reference path="game/collision/interactivegraphic.ts" />
/// <reference path="game/ball.ts" />
/// <reference path="game/game.ts" />
/// <reference path="game/wall.ts" />
/// <reference path="game/world.ts" />
/// <reference path="matchmaking/gamehostinginterface.ts" />
/// <reference path="matchmaking/gamehostingmanager.ts" />
/// <reference path="meta/screen.ts" />
/// <reference path="meta/stagedata.ts" />
/// <reference path="keyman.ts" />
/// <reference path="peerman.ts" />
/// <reference path="utilityfunctions.ts" />

//make sure this file is ran last!



module CombatPong {
    var screen: Screen;
    window.onload = () => {
        screen = new Screen(960, 540, 'content');
        screen.fitStageToScreen();
    };
    window.onresize = () => {
        if(screen)
            screen.fitStageToScreen();
    };
}