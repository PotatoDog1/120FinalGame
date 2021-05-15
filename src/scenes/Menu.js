class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    create() {

        console.log("You are in Menu.js meow");

        //create pointer
        this.mouse = this.input.activePointer;

        this.add.text(game.config.width/2, game.config.height/2, 'Click to start game.', menuConfig);

    }

    update() {

        if (this.mouse.isDown) {
            this.scene.start('playScene');
        }

    }
}