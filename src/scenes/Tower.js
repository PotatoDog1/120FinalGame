class Tower extends Phaser.Scene {
    constructor() {
        super("towerScene");
    }

    create() {

        //define keys
        keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //add bgm
        main_bgm = this.sound.add('bgm_1', { volume: 0.3 });
        main_bgm.play({ loop: true });
        sfx_pencil = this.sound.add('sfx_pencil', {volume: 2.3});

        //add UI temp art assets
        this.add.rectangle(0, 0, game.config.width, game.config.height, 0x575757).setOrigin(0, 0);
        this.add.image(0, 400, 'bg_notepad').setOrigin(0,0);
        this.placeImage = this.add.image(0, 0, 'bridge').setOrigin(0, 0).setScale(0.4);
        this.portrait = this.add.image(515, 160, 'portrait').setScale(1.15);
        
        //breathing portrait animation
        this.tweens.add({
            targets: [this.portrait],
            scale: {from: 1.17, to: 1.15},
            duration: 830,
            yoyo: true,
            repeat: -1
        });

        // scribbling animation
        let scribble = this.add.sprite(410, 65, 'scribble').setOrigin(0, 0);
        scribble.setScale(.10);
        scribble.anims.play('scribbling');

        //narrative 
        scriptText = this.cache.json.get('json_script');

        //interactive objects ----------------------------------------------------
        this.item_bridge = this.add.sprite(210, 255, 'item_bridge').setScale(0.4).setInteractive({useHandCursor: true});
        this.checkItemBridge = false;               //turns true when players click on the bridge
        this.checkItemBridgeNarrative = false;      //turns true when players reach the choices, allows the bridge to be clicked
                                                    //will turn false after going through its narrative to not allow access anymore

        this.item_bridge.on('pointerover', function(pointer) {
            this.setScale(0.43);
        });

        this.item_bridge.on('pointerout', function(pointer) {
            this.setScale(0.4);
        })

        this.item_bridge.on('pointerdown', function(pointer) { 
            if(this.checkItemBridgeNarrative){
                narrativeText.setText(scriptText.bridge_inspectBridge[0]);
                this.button_crossBridge.visible = false;
                this.button_cuss.visible = false;
                this.checkItemBridge = true;
                this.checkItemBridgeNarrative = false;
            }
        }, this);


        //Inventory related ----------------------------------------------------

        //inventory bag
        this.bag = this.add.sprite(509, 327, 'bag').setOrigin(0.5, 0.5);
        this.bag.setInteractive({
            dropZone: true,
            useHandCursor: true
        });

        //when pointer is over the bag, it will scale up, if not it will scale down
        this.bag.on('pointerover', function(pointer) {
            this.setScale(1.1);
        });

        this.bag.on('pointerout', function(pointer) {
            this.setScale(1);
        })

        //nodrop zone image
        this.noDropZone = this.add.sprite(0, 0, 'noDrop').setOrigin(0, 0);
        this.noDropZone.depth = -0.5;       //to hide it from players
        this.noDropZone.setInteractive({
            dropZone: true
        })

        //Choices related----------------------------------------------------

        narrativeText = this.add.text(80, 445, scriptText.tower_base[0], wordConfig);

        this.button_crossBridge = this.add.sprite(80, 490, 'crossBridge').setOrigin(0,0).setInteractive({useHandCursor: true});
        this.button_cuss = this.add.sprite(80, 527, 'cuss').setOrigin(0,0).setInteractive({useHandCursor: true});
        this.button_waitWind = this.add.sprite(80, 490, 'waitWind').setOrigin(0,0).setInteractive({useHandCursor: true});
        this.button_continueForward = this.add.sprite(80, 527, 'continueForward').setOrigin(0,0).setInteractive({useHandCursor: true});
        this.button_runAcrossBridge = this.add.sprite(80, 567, 'runAcrossBridge').setOrigin(0,0).setInteractive({useHandCursor: true});
        this.button_breatheCalm = this.add.sprite(80, 527, 'breatheCalm').setOrigin(0,0).setInteractive({useHandCursor: true});
        this.button_continueTower = this.add.sprite(80, 490, 'continueTower').setOrigin(0,0).setInteractive({useHandCursor: true});
        this.button_pause = this.add.sprite(80, 527, 'pause').setOrigin(0,0).setInteractive({useHandCursor: true});
        this.button_calmDown = this.add.sprite(80, 490, 'calmDown').setOrigin(0,0).setInteractive({useHandCursor: true});

        this.button_crossBridge.visible = false;
        this.button_cuss.visible = false;
        this.button_waitWind.visible = false;
        this.button_continueForward.visible = false;
        this.button_runAcrossBridge.visible = false;
        this.button_breatheCalm.visible = false;
        this.button_continueTower.visible = false;
        this.button_pause.visible = false;
        this.button_calmDown.visible = false;


        this.crossBridgeRoute = false;
        this.cussRoute = false;
        this.waitWindRoute = false;
        this.continueForwardRoute = false;
        this.runAcrossBridgeRoute = false;
        this.breatheCalmRoute = false;
        this.continueTowerRoute = false;
        this.pauseRoute = false;
        this.calmDownRoute = false;


        //Choices end--------------------------------------------------------

        //create frame
        this.frame = this.add.image(0, 0, 'frame').setOrigin(0, 0);
        this.frame.depth = 1;

        //transition -----------------------------------------------------
        this.fog_left = this.add.sprite(0, 0, 'fog_left').setOrigin(0, 0);
        this.fog_left.depth = 2;
        this.transition_left = this.tweens.add({
            targets: this.fog_left,
            delay: 300,
            ease: 'Sine.easeOut',
            duration: 1500,
            x: -521,
            onComplete: function() {
                this.fog_left.destroy();
                //this.fog_left.visible = false;
            },
            onCompleteScope: this
        });
        
        this.fog_right = this.add.sprite(165, 0, 'fog_right').setOrigin(0, 0);
        this.fog_right.depth = 2;
        this.transition_right = this.tweens.add({
            targets: this.fog_right,
            delay: 300,
            ease: 'Sine.easeOut',
            duration: 1500,
            x: 640,
            onComplete: function() {
                this.fog_right.destroy();
                //this.fog_right.visible = false;
            },
            onCompleteScope: this
        });


    }

    update() {

        if(!finishBridgeNarrative[0]) {         //fix later; add narrative accordingly with the emotion variables
            this.getNextLine(scriptText.tower_base);
        } else {
            if(!this.checkItemBridge && this.pickingChoice(this.crossBridgeRoute, this.cussRoute)) {            //if players haven't done anything yet
                this.checkItemBridgeNarrative = true;
            }

            if(this.checkItemBridge && !finishBridgeNarrative[1]) {
                this.getNextLine(scriptText.bridge_inspectBridge);
            }

            this.button_crossBridge.on('pointerdown', function (pointer) {
                this.crossBridgeRoute = true;      //branch flag
                narrativeText.setText(scriptText.bridge_crossing[0]); 
                this.destroyChoiceButtons(this.button_crossBridge, this.button_cuss);
            }, this);

            this.button_cuss.on('pointerdown', function(pointer) {
                this.cussRoute = true;     //branch flag
                narrativeText.setText(scriptText.bridge_cussAtWorld[0]);
                this.destroyChoiceButtons(this.button_crossBridge, this.button_cuss);
            }, this);

            if(!finishBridgeNarrative[1]) {
                if(this.crossBridgeRoute) {
                    this.getNextLine(scriptText.bridge_crossing);
                } else if (this.cussRoute) {
                    this.getNextLine(scriptText.bridge_cussAtWorld);
                }
            } else {
                if(this.crossBridgeRoute) {
                    this.button_waitWind.on('pointerdown', function (pointer) {
                        this.waitWindRoute = true;      //branch flag
                        narrativeText.setText(scriptText.bridge_waitOutTheWind[0]); 
                        this.destroyChoiceButtons(this.button_waitWind, this.button_continueForward, this.button_runAcrossBridge);
                    }, this);
        
                    this.button_continueForward.on('pointerdown', function(pointer) {
                        this.continueForwardRoute = true;     //branch flag
                        narrativeText.setText(scriptText.bridge_continueFoward[0]);
                        this.destroyChoiceButtons(this.button_waitWind, this.button_continueForward, this.button_runAcrossBridge);
                    }, this);

                    this.button_runAcrossBridge.on('pointerdown', function(pointer) {
                        this.runAcrossBridgeRoute = true;     //branch flag
                        narrativeText.setText(scriptText.bridge_runAcrossBridge[0]);
                        this.destroyChoiceButtons(this.button_waitWind, this.button_continueForward, this.button_runAcrossBridge);
                    }, this);
        
                }

                if(!finishBridgeNarrative[2]) {
                    if(this.waitWindRoute) {
                        this.getNextLine(scriptText.bridge_waitOutTheWind);
                    } else if (this.continueForwardRoute) {
                        this.getNextLine(scriptText.bridge_continueFoward);
                    } else if (this.runAcrossBridgeRoute) {
                        this.getNextLine(scriptText.bridge_runAcrossBridge);
                    }
                }
                else {
                    if(this.waitWindRoute) {
                        this.button_breatheCalm.on('pointerdown', function (pointer) {
                            this.waitWindRoute = true;      //branch flag
                            narrativeText.setText(scriptText.bridge_waitOutTheWind[0]); 
                            this.destroyChoiceButtons(this.button_waitWind, this.button_continueForward, this.button_runAcrossBridge);
                        }, this);
                    }
                }
            }

        }

        if(Phaser.Input.Keyboard.JustDown(keyQ)) {               //return to menu
            this.resetGame();
        }

    }

    //Functions---------------------------------------------------

    //Goes through each line of the narrative from the arrays in the script.json file
    getNextLine(target, readFirstLine) {     
        if(Phaser.Input.Keyboard.JustDown(keySpace) && nextLine < target.length){
            if(readFirstLine == true && firstTimer == true){
                nextLine = 0;
                firstTimer = false;
            }
            console.log("nextLine is " + nextLine);
            narrativeText.setText(target[nextLine]);
            sfx_pencil.play();
            nextLine++;

        }

        //interactive object check


        //when it reaches the end of the array
        if (nextLine == target.length){

            //reset to the beginning of the line
            nextLine = 1;
            firstTimer = true;

            if(!this.checkItemNarrative(target)) {       //if it's a flag narrative
                finishBridgeNarrative[finishBridgeIndex] = true;
                finishBridgeIndex++;
            } else if (this.checkInteractiveNarrative(target)) {
                interactveNarrartive[i] = true;
                interactiveIndex++;
            }

            //display choices
            if(finishBridgeNarrative[0]) {
                if(this.pickingChoice(this.crossBridgeRoute, this.cussRoute)) {
                    this.showChoiceButtons(this.button_crossBridge, this.button_cuss);
                }
            }

            if(finishBridgeNarrative[1]) {
                if(this.pickingChoice(this.waitWindRoute, this.continueForwardRoute, this.runAcrossBridgeRoute) && this.crossBridgeRoute) {
                    this.showChoiceButtons(this.button_waitWind, this.button_continueForward, this.button_runAcrossBridge);
                }
            }

            if(finishBridgeNarrative[2]) {
                if(this.pickingChoice(this.breatheCalmRoute) && this.waitWindRoute) {
                    this.showChoiceButtons(this.button_breatheCalm);
                }
                
                if(this.pickingChoice(this.continueTowerRoute, this.pauseRoute) && this.continueForwardRoute) {
                    this.showChoiceButtons(this.button_continueTower, this.button_pause);
                }

                if(this.pickingChoice(this.breatheCalmRoute) && this.runAcrossBridgeRoute) {
                    this.showChoiceButtons(this.button_calmDown);
                }
            }
            

        }

    }

    showChoiceButtons(button1, button2, button3) {
        if(button1 != undefined){
            button1.visible = true;
        }
        if(button2 != undefined){
            button2.visible = true;
        }
        if(button3 != undefined){
            button3.visible = true;
        }
    }

    destroyChoiceButtons(button1, button2, button3) {
        if(button1 != undefined){
            button1.destroy();
        }
        if(button2 != undefined){
            button2.destroy();
        }
        if(button3 != undefined){
            button3.destroy();
        }
    }

    checkItemNarrative(target) {
       return false;
    }

    checkInteractiveNarrative(target) {
        if(target === scriptText.bridge_inspectBridge) {
            return true;
        } else {
            return false;
        }
    }

    pickingChoice(choice1, choice2, choice3) {
        if(choice3 != undefined) {
            return !choice1 && !choice2 && !choice3;
        } else if (choice3 == undefined) {
            return !choice1 && !choice2;
        }

    }

    resetGame() {
        for(var i = 0; i < finishCrossroadNarrative.length; i++) {      //to loop through the narrative flag array and reset them all to false
            finishCrossroadNarrative[i] = false;
            //console.log("looping through finishCrossroadNarrative. Finished " + i + " time, " + i + " is " + finishCrossroadNarrative[i]);
        }

        for(var i = 0; i < hasItem.length; i++) {       //to loop through the item array and reset them
            hasItem[i] = false;
        }

        for(var i = 0; i < finishItemNarrative.length; i++) {       //to loop through the itemNarrative array and reset them to false
            finishItemNarrative[i] = false;
        }

        for(var i = 0; i < finishGrottoNarrative.length; i++) {      //to loop through the narrative flag array and reset them all to false
            finishGrottoNarrative[i] = false;
        }

        for(var i = 0; i < finishBackGNarrative.length; i++) {      
            finishBackGNarrative[i] = false;
        }

        for(var i = 0; i < finishBridgeNarrative.length; i++) {
            finishBridgeNarrative[i] = false;
        }

        for(var i = 0; i < interactiveNarrative.length; i++) {
            interactiveNarrative[i] = false;
        }

        finishCrossroadIndex = 0;     //to reset narrative to the beginning flag
        finishGrottoIndex = 0;
        finishBackGIndex = 0;
        finishBridgeIndex = 0;
        nextLine = 1;           //to reset narrative to the beginning line
        main_bgm.stop();        //to stop game bgm when they come back to menu
        this.scene.start('menuScene');
    }

}