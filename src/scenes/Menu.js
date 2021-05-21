class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    create() {

        console.log("You are in Menu.js meow");

        //create pointer
        this.mouse = this.input.activePointer;

        this.add.text(30, game.config.height/2, 'Left click to start game.', menuConfig);
        this.instructionText = this.add.text(30, game.config.height/1.5, '[Space] to progress,\n[left/right] to choose,\n[Q] to restart.', menuConfig);
        this.instructionText.setFontStyle('bold');
        this.instructionText.setFontSize(18);

    }

    update() {

        if (this.mouse.isDown) {
            this.scene.start('playScene');
        }

    }
}