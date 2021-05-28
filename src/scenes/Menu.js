class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    create() {

        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);

        this.add.text(30, game.config.height/2, 'Press [Space] to start game.', menuConfig);
        this.instructionText = this.add.text(30, game.config.height/1.5, 'Press [Space] to progress,\nPress [Left click] to choose.', menuConfig);
        this.instructionText.setFontStyle('bold');
        this.instructionText.setFontSize(18);
        this.instructionText2 = this.add.text(30, game.config.height/1.2, 
            'Menu debug keys:\nPress [Q] to go back to Menu\nPress [E] to go to Grotto Scene\nPress [R] to go to backToGrotto Scene\nPress [T] to go to beforeBridge Scene', menuConfig);
        this.instructionText2.setFontSize(14);

    }

    update() {

        if(Phaser.Input.Keyboard.JustDown(keySpace)) {
            this.scene.start('crossroadScene');
        }

        if(Phaser.Input.Keyboard.JustDown(keyE)) {
            for(var i = 0; i < finishCrossroadNarrative.length; i++) {      //to loop through the narrative flag array and reset them all to false
                finishCrossroadNarrative[i] = true;
                //console.log("finishCrossroadNarrative[" + i + "] is " + finishCrossroadNarrative[i]);
            }

            hasItem[0] = true;          //it's the shoe
            finishItemNarrative[0] = true;      //shoe narrative
            
            this.scene.start('grottoScene');
        }

        if(Phaser.Input.Keyboard.JustDown(keyR)) {
            for(var i = 0; i < finishCrossroadNarrative.length; i++) {      //to loop through the narrative flag array and reset them all to false
                finishCrossroadNarrative[i] = true;
                //console.log("finishCrossroadNarrative[" + i + "] is " + finishCrossroadNarrative[i]);
            }

            for(var i = 0; i < finishGrottoNarrative.length; i++) {      //to loop through the narrative flag array and reset them all to false
                finishGrottoNarrative[i] = true;
            }

            hasItem[0] = true;          //it's the shoe
            finishItemNarrative[0] = true;      //shoe narrative
            
            this.scene.start('backToGrottoScene');
        }

        if(Phaser.Input.Keyboard.JustDown(keyT)) {
            for(var i = 0; i < finishCrossroadNarrative.length; i++) {      //to loop through the narrative flag array and reset them all to false
                finishCrossroadNarrative[i] = true;
                //console.log("finishCrossroadNarrative[" + i + "] is " + finishCrossroadNarrative[i]);
            }

            for(var i = 0; i < finishGrottoNarrative.length; i++) {      //to loop through the narrative flag array and reset them all to false
                finishGrottoNarrative[i] = true;
            }

            //assuming players got to the backToGrotto narrative
            for(var i = 0; i < finishBackGNarrative.length; i++) {      //to loop through the narrative flag array and reset them all to false
                finishBackGNarrative[i] = true;
            }

            hasItem[0] = true;          //it's the shoe
            finishItemNarrative[0] = true;      //shoe narrative
            
            this.scene.start('beforeBridgeScene');
        }

    }
}