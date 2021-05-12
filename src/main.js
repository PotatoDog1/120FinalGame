let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 640,
    scene: [Preload, Menu, Play]
}

let game = new Phaser.Game(config);

//define font format
let wordConfig = {
    fontFamily: 'Georgia',
    fontSize: '27px',
    color: '#191919',
    align: 'left',
    fixedWidth: 500
}

let menuConfig = {
    fontFamily: 'Georgia',
    fontSize: '25px',
    align: 'left'
}

//define keyboard keys
let keyQ;