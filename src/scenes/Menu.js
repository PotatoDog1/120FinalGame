class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    create() {

        console.log("You are in Menu.js meow");

        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.add.text(30, game.config.height/2, 'Press [Space] to start game.', menuConfig);
        this.instructionText = this.add.text(30, game.config.height/1.5, '[Space] to progress,\n[Left click] to choose,\n[Q] to restart.', menuConfig);
        this.instructionText.setFontStyle('bold');
        this.instructionText.setFontSize(18);

    }

    update() {

        if (Phaser.Input.Keyboard.JustDown(keySpace)) {
            this.scene.start('playScene');
        }

    }
}