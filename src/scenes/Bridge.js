class Bridge extends Phaser.Scene {
    constructor() {
        super("bridgeScene");
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

        //interactive objects
        this.item_bridge = this.add.sprite(210, 255, 'item_bridge').setScale(0.4).setInteractive();
        this.item_bridge.on('pointerover', function(pointer) {
            this.setScale(0.43);
        });

        this.item_bridge.on('pointerout', function(pointer) {
            this.setScale(0.4);
        })


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

        narrativeText = this.add.text(80, 445, scriptText.bridgeStart[0], wordConfig);

        this.button_movePast = this.add.sprite(80, 490, 'movePast').setOrigin(0,0).setInteractive({useHandCursor: true});


        this.button_movePast.visible = false;


        this.movePastRoute = false;


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

        if(!finishBridgeNarrative[0]) {
            this.getNextLine(scriptText.bridgeStart);
        } else {
            this.button_movePast.on('pointerdown', function (pointer) {
                this.movePastRoute = true;      //branch flag
                narrativeText.setText(scriptText.grotto_leave[0]);      //fix later; add emotion narrative accordingly
                this.destroyChoiceButtons(this.button_movePast, this.button_findWayOut);
            }, this);

            this.button_findWayOut.on('pointerdown', function(pointer) {
                this.findWayOutRoute = true;     //branch flag
                narrativeText.setText(scriptText.grotto_leavePartOne[0]);
                this.destroyChoiceButtons(this.button_movePast, this.button_findWayOut);
            }, this);

            if(!finishBridgeNarrative[1]) {
                if(this.movePastRoute) {
                    this.getNextLine(scriptText.grotto_leave);
                } else if (this.findWayOutRoute) {
                    this.getNextLine(scriptText.grotto_leavePartOne);
                }
            } else {
                if(this.movePastRoute) {
                    //placeholder for bridge connection
                    if(Phaser.Input.Keyboard.JustDown(keySpace)) {
                        this.resetGame();
                    }
                } else if (this.findWayOutRoute) {
                    this.button_giveUp.on('pointerdown', function (pointer) {
                        this.giveUpRoute = true;      //branch flag
                        narrativeText.setText(scriptText.grotto_end[0]);      //fix later; add emotion narrative accordingly
                        this.destroyChoiceButtons(this.button_giveUp, this.button_goBackGrotto);
                    }, this);
        
                    this.button_goBackGrotto.on('pointerdown', function(pointer) {
                        this.goBackGrottoRoute = true;     //branch flag
                        narrativeText.setText(scriptText.grotto_leavePartTwo[0]);
                        this.destroyChoiceButtons(this.button_giveUp, this.button_goBackGrotto);
                    }, this);

                    if(!finishBridgeNarrative[2]) {
                        if(this.giveUpRoute) {
                            this.getNextLine(scriptText.grotto_end);
                        } else if (this.goBackGrottoRoute) {
                            this.getNextLine(scriptText.grotto_leavePartTwo);
                        }
                    } else {
                        if(this.giveUpRoute) {
                            if(Phaser.Input.Keyboard.JustDown(keySpace)) {
                                this.resetGame();
                            }
                        } else if (this.goBackGrottoRoute) {
                            this.button_movePast2.on('pointerdown', function (pointer) {
                                this.movePast2Route = true;      //branch flag
                                narrativeText.setText(scriptText.grotto_leave[0]);      //fix later; add emotion narrative accordingly
                                this.destroyChoiceButtons(this.button_movePast2);
                            }, this);

                            if(!finishBridgeNarrative[3]) {
                                if(this.movePast2Route) {
                                    this.getNextLine(scriptText.grotto_leave);
                                }
                            } else {
                                if(Phaser.Input.Keyboard.JustDown(keySpace)) {
                                    this.resetGame();
                                }
                            }
                        }
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

        //when it reaches the end of the array
        if (nextLine == target.length){

            //reset to the beginning of the line
            nextLine = 1;
            firstTimer = true;

            if(!this.checkItemNarrative(target)){       //if it's a flag narrative
                finishBridgeNarrative[finishBridgeIndex] = true;
                finishBridgeIndex++;
            }

            //display choices
            if(finishBridgeNarrative[0]) {
                if(this.pickingChoice(this.movePastRoute, this.findWayOutRoute)) {
                    this.showChoiceButtons(this.button_movePast, this.button_findWayOut);
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

        finishCrossroadIndex = 0;     //to reset narrative to the beginning flag
        finishGrottoIndex = 0;
        finishBackGIndex = 0;
        finishBridgeIndex = 0;
        nextLine = 1;           //to reset narrative to the beginning line
        main_bgm.stop();        //to stop game bgm when they come back to menu
        this.scene.start('menuScene');
    }

}