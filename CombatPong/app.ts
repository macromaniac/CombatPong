
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