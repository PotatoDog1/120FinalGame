class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    create() {

        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

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
            for(var i = 0; i < 6; i++) {      //to loop through the narrative flag array and reset them all to false
                finishNarrative[i] = true;
                //console.log("finishNarrative[" + i + "] is " + finishNarrative[i]);
            }

            for(var i = 0; i < finishGrottoNarrative.length; i++) {      //to loop through the narrative flag array and reset them all to false
                finishGrottoNarrative[i] = false;
            }

            hasItem[0] = true;          //it's the shoe
            finishItemNarrative[0] = true;      //shoe narrative
            
            finishGrottoIndex = 0;
            finishNarrativeIndex = 6;     //to reset narrative to the beginning flag
            nextLine = 1;           //to reset narrative to the beginning line
            this.scene.start('grottoScene');
        }

        if(Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.start('backToGrottoScene');
        }

    }
}