/**
 * Lost in Translation
 * A game by:
 * Dany
 * Emily
 * Fion
 * Gillian
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
    scene: [Preload, Menu, Crossroad, Grotto, BackToGrotto, BeforeBridge, Bridge, Tower]
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
let keyW;
let keyE;
let keyR;
let keyT;
let keySpace;

//define script variables for getNextLine()
let scriptText;
let narrativeText;
let nextLine = 1;
let firstTimer = true;

//main narrative branch check--------------------------------------------------------------
let finishCrossroadNarrative = [false, false, false, false, false, false, false];      //the length of this array will corresond to the number of flags/choices players can make
    //notes:          [crossroad, pickUpShoe, continue/leave, fog/leave, pocket, pocketYes/No, grotto]
let finishCrossroadIndex = 0;     //corresponds to the finishNarrative array

//grotto branch check----------------------------------------------------------------------
let finishGrottoNarrative = [false, false, false, false, false, false, false, false, false, false];
let finishGrottoIndex = 0;

//backToGrotto branch check----------------------------------------------------------------
let finishBackGNarrative = [false, false, false, false];
let finishBackGIndex = 0;

//beforeBridge branch check----------------------------------------------------------------
let finishBeforeBNarrative = [false, false, false, false, false];
let finishBeforeBIndex = 0;

//bridge branch check----------------------------------------------------------------------
let finishBridgeNarrative = [false, false, false, false, false, false, false, false, false, false];
let finishBridgeIndex = 0;

//item check - will be updated when items besides shoe got added to the game
let hasItem = [false];
    //notes:  [shoe]
let finishItemNarrative = [false];
    //notes:              [XXXXX]

//interactive object check--------------------------------------------------------------
let interactiveNarrative = [false];
    //notes:               [bridge]
let interactiveIndex = 0;


//tween Scale variable
const SCALE = 0.5;

//define sound
let main_bgm;
let sfx_pencil;