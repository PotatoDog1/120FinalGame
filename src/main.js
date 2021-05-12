let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 640,
    scene: [Preload, Menu, Play]
}

let game = new Phaser.Game(config);

//main game font format
let wordConfig = {
    fontFamily: 'Georgia',
    fontSize: '27px',
    color: '#191919',
    align: 'left'
}

let menuConfig = {
    fontFamily: 'Georgia',
    fontSize: '25px',
    align: 'left'
}