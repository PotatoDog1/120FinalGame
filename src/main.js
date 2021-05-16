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
    scene: [Preload, Menu, Play]
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
let keyLeft;
let keyRight;

//define script variables for getNextLine()
let scriptText;
let narrativeText;
let nextLine = 1;

//branch check
let finishNarrative = [false, false];      //the length of this array will corresond to the number of flags/choices players can make
    //notes:          [crossroad, continue/leave]
let finishNarrativeIndex = 0;     //corresponds to the finishNarrative array

//item check
let hasItem = [false];
    //notes:  [shoe]
let finishItemNarrative = [false];
    //notes:              [shoeNarrative]

//tween Scale variable
const SCALE = 0.5;

//define sound
let main_bgm;