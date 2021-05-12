let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 640,
    scene: [Preload, Menu]
}

let game = new Phaser.Game(config);
