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
        keyY = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Y);
        keyU = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.U);

        this.add.image(0, 0, 'menu').setOrigin(0, 0);
        /*
        this.add.text(30, game.config.height/2, 'Press [Space] to start game.', menuConfig);
        this.instructionText = this.add.text(30, game.config.height/1.5, 'Press [Space] to progress,\nPress [Left click] to choose.', menuConfig);
        this.instructionText.setFontStyle('bold');
        this.instructionText.setFontSize(18);
        this.instructionText2 = this.add.text(30, game.config.height/1.25, 
            'Menu debug keys:\nPress [Q] to go back to Menu\nPress [E] to go to Grotto Scene\nPress [R] to go to backToGrotto Scene\nPress [T] to go to beforeBridge Scene\nPress [Y] to go to Bridge Scene\nPress [U] to go to tower Scene', menuConfig);
        this.instructionText2.setFontSize(14);
        */

        //end transition-------------------------------------------------
        this.fog_left = this.add.sprite(-640, 0, 'fog_left').setOrigin(0, 0);
        this.fog_left.depth = 2;
        this.endTransition_left = this.tweens.add({
            targets: this.fog_left,
            //delay: 1500,
            ease: 'Sine.easeOut',
            duration: 1300,
            x: 0
        });
        this.endTransition_left.pause();
        
        this.fog_right = this.add.sprite(640, 0, 'fog_right').setOrigin(0, 0);
        this.fog_right.depth = 2;
        this.endTransition_right = this.tweens.add({
            targets: this.fog_right,
            //delay: 1500,
            ease: 'Sine.easeOut',
            duration: 1300,
            x: 133,
            completeDelay: 1000,
            onComplete: function() {
                this.scene.start('crossroadScene');

            },
            onCompleteScope: this
        });
        this.endTransition_right.pause();

        this.grottoTransition = false;
    }

    update() {

        if(Phaser.Input.Keyboard.JustDown(keySpace)) {
            this.goCrossroad();
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

        if(Phaser.Input.Keyboard.JustDown(keyY)) {
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

            for(var i = 0; i < finishBeforeBNarrative.length; i++) {
                finishBeforeBNarrative[i] = true;
            }

            hasItem[0] = true;          //it's the shoe
            finishItemNarrative[0] = true;      //shoe narrative
            
            this.scene.start('bridgeScene');
        }

        if(Phaser.Input.Keyboard.JustDown(keyU)) {
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

            for(var i = 0; i < finishBeforeBNarrative.length; i++) {
                finishBeforeBNarrative[i] = true;
            }

            for(var i = 0; i < finishBridgeNarrative.length; i++) {
                finishBridgeNarrative[i] = true;
            }

            hasItem[0] = true;                  //it's the shoe
            finishItemNarrative[0] = true;      //shoe narrative
            stifled = 4;
            this.scene.start('towerScene');
        }

    }

    goCrossroad() {
        if(!this.grottoTransition) {
            this.fog_left.visible = true;
            this.fog_right.visible = true;
            this.endTransition_left.play();
            this.endTransition_right.play();
            this.grottoTransition = true;
        }
    }
}