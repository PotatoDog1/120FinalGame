/**
 * Lost in Translation
 * A game by:
 * Dany - Writer/Sound Designer
 * Emily - BackgroundArtist
 * Fion - Programmer/Background and UI Artist
 * Gillian - Background and Props Artist
 * 
 * Game Title: Lost in Translation
 * Date Completed:
 * 
 */
 let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 640,
    autoCenter: true,
    scene: [Preload, Menu, Credit, Crossroad, Grotto, BackToGrotto, BeforeBridge, Bridge, Tower]
}

let game = new Phaser.Game(config);

//define font format
let wordConfig = {
    fontFamily: 'Handwriting',
    fontSize: '25px',
    color: '#191919',
    align: 'left',
    lineSpacing: 6
}

let menuConfig = {
    fontFamily: 'Georgia',
    fontSize: '25px',
    align: 'left'
}

//define keyboard keys
let keyQ;
let keySpace;
let keyC;

//define script variables for getNextLine()
let scriptText;
let narrativeText;
let nextLine = 1;
let firstTimer = true;

//emotion variables
let anger = 0;
let stifled = 0;

//main narrative branch check--------------------------------------------------------------
let finishCrossroadNarrative = [false, false, false, false, false, false, false];      //the length of this array will corresond to the number of flags/choices players can make
    //notes:          [crossroad, pickUpShoe, continue/leave, fog/leave, pocket, pocketYes/No, grotto]
let finishCrossroadIndex = 0;     //corresponds to the finishNarrative array

//grotto branch check----------------------------------------------------------------------
let finishGrottoNarrative = [false, false, false, false, false, false, false, false, false, false];
let finishGrottoIndex = 0;

//backToGrotto branch check----------------------------------------------------------------
let finishBackGNarrative = [false, false, false, false, false];
let finishBackGIndex = 0;

//beforeBridge branch check----------------------------------------------------------------
let finishBeforeBNarrative = [false, false, false, false, false];
let finishBeforeBIndex = 0;

//bridge branch check----------------------------------------------------------------------
let finishBridgeNarrative = [false, false, false, false, false, false, false, false, false, false, false];
let finishBridgeIndex = 0;

//tower branch check-----------------------------------------------------------------------
let finishTowerNarrative = [false, false, false, false];
let finishTowerIndex = 0;


//item check - will be updated when items besides shoe got added to the game
let hasItem = [false, false, false, false];
    //notes:  [shoe, notebook, skateboard, polaroid]
let finishItemNarrative = [false, false, false, false];
    //notes:              [shoe, notebook, skateboard, polaroid]

//interactive object check--------------------------------------------------------------
let interactiveNarrative = [false];
    //notes:               [bridge]
let interactiveIndex = 0;

//tween Scale variable
const SCALE = 0.5;

//fade variable
let beforeBridgeMemory = false;

//define sound
let main_bgm;
let sfx_pencil;

function showChoiceButtons(button1, button2, button3) {
    if(button1 != undefined){
        button1.visible = true;
    }
    if(button2 != undefined){
        button2.visible = true;
    }
    if(button3 != undefined){
        button3.visible = true;
    }
}

function destroyChoiceButtons(button1, button2, button3) {
    if(button1 != undefined){
        button1.destroy();
    }
    if(button2 != undefined){
        button2.destroy();
    }
    if(button3 != undefined){
        button3.destroy();
    }
}

function pickingChoice(choice1, choice2, choice3) {
    if(choice3 != undefined) {
        return !choice1 && !choice2 && !choice3;
    } else if (choice3 == undefined) {
        return !choice1 && !choice2;
    }
}

function resetArray(target) {
    for(var i = 0; i < target.length; i++) {       //to loop through the itemNarrative array and reset them to false
        target[i] = false;
    }
}

function resetGame() {

    resetArray(finishCrossroadNarrative); 
    resetArray(hasItem); 
    resetArray(finishItemNarrative); 
    resetArray(finishGrottoNarrative);
    resetArray(finishBackGNarrative);
    resetArray(finishBeforeBNarrative);
    resetArray(finishBridgeNarrative);
    resetArray(finishTowerNarrative);
    resetArray(interactiveNarrative);

    finishCrossroadIndex = 0;     //to reset narrative to the beginning flag
    finishGrottoIndex = 0;
    finishBackGIndex = 0;
    finishBeforeBIndex = 0;
    finishBridgeIndex = 0;
    finishTowerIndex = 0;
    nextLine = 1;           //to reset narrative to the beginning line
    anger = 0;
    stifled = 0;
    beforeBridgeMemory = false;
    main_bgm.stop();        //to stop game bgm when they come back to menu

}