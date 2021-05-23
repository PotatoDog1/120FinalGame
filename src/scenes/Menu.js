class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    create() {

        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        this.add.text(30, game.config.height/2, 'Press [Space] to start game.', menuConfig);
        this.instructionText = this.add.text(30, game.config.height/1.5, 'Press [Space] to progress,\nPress [Left click] to choose.', menuConfig);
        this.instructionText.setFontStyle('bold');
        this.instructionText.setFontSize(18);
        this.instructionText2 = this.add.text(30, game.config.height/1.2, 'For Debug:\nPress [Q] to go back to Menu\nPress [E] to go to Grotto Scene', menuConfig);
        this.instructionText2.setFontSize(14);

    }

    update() {

        if(Phaser.Input.Keyboard.JustDown(keySpace)) {
            this.scene.start('crossroadScene');
        }

        if(Phaser.Input.Keyboard.JustDown(keyE)) {
            this.scene.start('grottoScene');
        }

    }
}