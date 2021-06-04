class BeforeBridge extends Phaser.Scene {
    constructor() {
        super("beforeBridgeScene");
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
        this.vignette = this.add.image(0, 0, 'vignette').setOrigin(0, 0).setScale(0.97);
        this.vignette.visible = false;
        this.vignette.depth = 0.1;
        this.fade = this.add.sprite(0, 0, 'fade').setOrigin(0,0);
        this.fade.depth = 3;
        this.fade.alpha = 0;
        
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

        narrativeText = this.add.text(80, 445, scriptText.bridge_start[0], wordConfig);

        this.button_crossBridge = this.add.sprite(80, 490, 'crossBridge').setOrigin(0,0).setInteractive({useHandCursor: true});
        this.button_cuss = this.add.sprite(80, 527, 'cuss').setOrigin(0,0).setInteractive({useHandCursor: true});
        this.button_talkingDots = this.add.sprite(80, 490, 'talkingDots').setOrigin(0,0).setInteractive({useHandCursor: true});
        this.button_continueArgue = this.add.sprite(80, 527, 'continueArgue').setOrigin(0,0).setInteractive({useHandCursor: true});
        this.button_imSorry = this.add.sprite(80, 567, 'imSorry2').setOrigin(0,0).setInteractive({useHandCursor: true});
        this.button_takeCar1 = this.add.sprite(80, 490, 'takeCar').setOrigin(0,0).setInteractive({useHandCursor: true});
        this.button_argueYes = this.add.sprite(80, 490, 'argueYes').setOrigin(0,0).setInteractive({useHandCursor: true});
        this.button_argueNo = this.add.sprite(80, 527, 'argueNo').setOrigin(0,0).setInteractive({useHandCursor: true});
        this.button_takeCar2 = this.add.sprite(80, 490, 'takeCar').setOrigin(0,0).setInteractive({useHandCursor: true});
        this.button_takeCar3 = this.add.sprite(80, 490, 'takeCar').setOrigin(0,0).setInteractive({useHandCursor: true});

        this.button_crossBridge.visible = false;
        this.button_cuss.visible = false;
        this.button_talkingDots.visible = false;
        this.button_continueArgue.visible = false;
        this.button_imSorry.visible = false;
        this.button_takeCar1.visible = false;
        this.button_argueYes.visible = false;
        this.button_argueNo.visible = false;
        this.button_takeCar2.visible = false;
        this.button_takeCar3.visible = false;


        this.crossBridgeRoute = false;
        this.cussRoute = false;
        this.talkingDotsRoute = false;
        this.continueArgueRoute = false;
        this.imSorryRoute = false;
        this.takeCarRoute = false;
        this.argueYesRoute = false;
        this.argueNoRoute = false;

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
                //this.fog_left.destroy();
                this.fog_left.visible = false;
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
                //this.fog_right.destroy();
                this.fog_right.visible = false;
            },
            onCompleteScope: this
        });

        //end transition-------------------------------------------------
        this.endTransition_left = this.tweens.add({
            targets: this.fog_left,
            delay: 1500,
            ease: 'Sine.easeOut',
            duration: 1500,
            x: 0
        });
        this.endTransition_left.pause();
        
        this.endTransition_right = this.tweens.add({
            targets: this.fog_right,
            delay: 1500,
            ease: 'Sine.easeOut',
            duration: 1500,
            x: 165,
            completeDelay: 1000,
            onComplete: function() {
                main_bgm.stop(); 
                console.log("anger = " + anger + " and stifled = " + stifled);
                this.scene.start('bridgeScene');
            },
            onCompleteScope: this
        });
        this.endTransition_right.pause();
        
        this.grottoTransition = false;


    }

    update() {

        if(!finishBeforeBNarrative[0]) {
            this.getNextLine(scriptText.bridge_start);
        } else {
            //interactive bridge
            if(!this.checkItemBridge && pickingChoice(this.crossBridgeRoute, this.cussRoute)) {            //if players haven't done anything yet
                this.checkItemBridgeNarrative = true;
            }

            if(this.checkItemBridge && this.checkItemBridgeNarrative) {
                this.getNextLine(scriptText.bridge_inspectBridge);
            }

            this.button_crossBridge.on('pointerdown', function (pointer) {
                this.crossBridgeRoute = true;      //branch flag
                narrativeText.setText("You decided to cross the bridge."); 
                destroyChoiceButtons(this.button_crossBridge, this.button_cuss);
                this.goNextScene();

            }, this);

            this.button_cuss.on('pointerdown', function(pointer) {
                this.cussRoute = true;     //branch flag
                this.tweens.add({
                    targets: this.fade,
                    alpha: 1,
                    duration: 1500,
                    onStart: function() {
                        keySpace.enabled = false;
                    },
                    onStartScope: this,
                    onComplete: function() {
                        this.placeImage = this.add.image(0, 0, 'garage').setOrigin(0, 0);
                        this.vignette.visible = true;
                        narrativeText.setText(scriptText.bridge_cussAtWorld[0]);
                        destroyChoiceButtons(this.button_crossBridge, this.button_cuss);
                        this.tweens.add({
                            targets: this.fade,
                            alpha: 0,
                            duration: 1500,
                            onComplete: function() {
                                keySpace.enabled = true;
                            },
                            onCompleteScope: this
                        });
                    },
                    onCompleteScope: this
                });
            }, this);

            if(!finishBeforeBNarrative[1]) {
                if(this.cussRoute) {
                    this.getNextLine(scriptText.bridge_cussAtWorld);
                }
            } else {
                if(this.cussRoute) {
                    this.button_talkingDots.on('pointerdown', function(pointer) {
                        this.talkingDotsRoute = true;     //branch flag
                        narrativeText.setText(scriptText.bridge_sayNothing[0]);
                        destroyChoiceButtons(this.button_talkingDots, this.button_continueArgue, this.button_imSorry);
                    }, this);

                    this.button_continueArgue.on('pointerdown', function(pointer) {
                        this.continueArgueRoute = true;     //branch flag
                        narrativeText.setText(scriptText.bridge_confirm[0]);
                        destroyChoiceButtons(this.button_talkingDots, this.button_continueArgue, this.button_imSorry);
                    }, this);

                    this.button_imSorry.on('pointerdown', function(pointer) {
                        this.imSorryRoute = true;     //branch flag
                        narrativeText.setText(scriptText.bridge_imSorry[0]);
                        destroyChoiceButtons(this.button_talkingDots, this.button_continueArgue, this.button_imSorry);
                    }, this);

                    if(!finishBeforeBNarrative[2]) {
                        if(this.talkingDotsRoute) {
                            this.getNextLine(scriptText.bridge_sayNothing);
                        } else if (this.continueArgueRoute) {
                            this.getNextLine(scriptText.bridge_confirm);
                        } else if (this.imSorryRoute) {
                            this.getNextLine(scriptText.bridge_imSorry);
                        }
                    } else {
                        if(this.talkingDotsRoute) {
                            this.button_takeCar1.on('pointerdown', function(pointer) {
                                this.takeCarRoute = true;     //branch flag
                                narrativeText.setText(scriptText.bridge_takeCar[0]);
                                destroyChoiceButtons(this.button_takeCar1);
                            }, this);

                            if(!finishBeforeBNarrative[3]) {
                                if(this.takeCarRoute) {
                                    this.getNextLine(scriptText.bridge_takeCar);
                                }
                            } else {
                                if(this.takeCarRoute) {
                                    this.goBackReality();
                                    this.goNextScene();
                                }
                            }
        
                        } else if (this.continueArgueRoute) {
                            this.button_argueYes.on('pointerdown', function(pointer) {
                                this.argueYesRoute = true;     //branch flag
                                narrativeText.setText(scriptText.bridge_argueYes[0]);
                                destroyChoiceButtons(this.button_argueYes, this.button_argueNo);
                            }, this);

                            this.button_argueNo.on('pointerdown', function(pointer) {
                                this.argueNoRoute = true;     //branch flag
                                narrativeText.setText(scriptText.bridge_sayNothing[0]);
                                destroyChoiceButtons(this.button_argueYes, this.button_argueNo);
                            }, this);

                            if(!finishBeforeBNarrative[3]) {
                                if(this.argueYesRoute) {
                                    this.getNextLine(scriptText.bridge_argueYes);
                                } else if (this.argueNoRoute) {
                                    this.getNextLine(scriptText.bridge_sayNothing);
                                }
                            } else {
                                
                                this.button_takeCar2.on('pointerdown', function(pointer) {
                                    this.takeCarRoute = true;     //branch flag
                                    narrativeText.setText(scriptText.bridge_takeCar[0]);
                                    destroyChoiceButtons(this.button_takeCar2);
                                }, this);

                                if(!finishBeforeBNarrative[4]) {
                                    if(this.takeCarRoute) {
                                        this.getNextLine(scriptText.bridge_takeCar);
                                    }
                                } else {
                                    if(this.takeCarRoute) {
                                        this.goBackReality();
                                        this.goNextScene();
                                    }
                                }
                            
                            }
                        } else if (this.imSorryRoute) {
                            this.button_takeCar3.on('pointerdown', function(pointer) {
                                this.takeCarRoute = true;     //branch flag
                                narrativeText.setText(scriptText.bridge_takeCar[0]);
                                destroyChoiceButtons(this.button_takeCar3);
                            }, this);

                            if(!finishBeforeBNarrative[3]) {
                                if(this.takeCarRoute) {
                                    this.getNextLine(scriptText.bridge_takeCar);
                                }
                            } else {
                                if(this.takeCarRoute) {
                                    this.goBackReality();
                                    this.goNextScene();
                                }
                            }
                        }
                    }

                }
            }

        }

        if(Phaser.Input.Keyboard.JustDown(keyQ)) {               //return to menu
            resetGame();
            this.scene.start('menuScene');
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

            //variables
            if(!finishBeforeBNarrative[1] && this.cussRoute) {
                stifled += 1;
            }

            if(!finishBeforeBNarrative[2] && this.continueArgueRoute) {
                anger += 1;
            }

            if(!finishBeforeBNarrative[3]) {
                if(this.argueNoRoute) {
                    stifled += 1;
                }

                if(this.argueYesRoute) {
                    anger += 5;
                }
                
            }

            if(this.checkItemNarrative(target)) {       //if it's a flag narrative
                finishItemNarrative[0] = true;
            } else if (this.checkInteractiveNarrative(target)) {
                interactiveNarrative[interactiveIndex] = true;
                interactiveIndex++;
                this.checkItemBridgeNarrative = false;      //to never let the bridge text to show up again
                this.item_bridge.removeInteractive();
            } else {
                finishBeforeBNarrative[finishBeforeBIndex] = true;
                finishBeforeBIndex++;
            }

            //display choices
            if(finishBeforeBNarrative[0]) {
                if(pickingChoice(this.crossBridgeRoute, this.cussRoute)) {
                    showChoiceButtons(this.button_crossBridge, this.button_cuss);
                }
            }

            if(finishBeforeBNarrative[1]) {
                if(pickingChoice(this.talkingDotsRoute, this.continueArgueRoute, this.imSorryRoute) && this.cussRoute) {
                    showChoiceButtons(this.button_talkingDots, this.button_continueArgue, this.button_imSorry);
                }
            }

            if(finishBeforeBNarrative[2]) {
                if(pickingChoice(this.takeCarRoute) && this.talkingDotsRoute) {
                    showChoiceButtons(this.button_takeCar1);
                }

                if(pickingChoice(this.argueYesRoute, this.argueNoRoute) && this.continueArgueRoute) {
                    showChoiceButtons(this.button_argueYes, this.button_argueNo);
                }

                if(pickingChoice(this.takeCarRoute) && this.imSorryRoute) {
                    showChoiceButtons(this.button_takeCar3);
                }

            }    
            
            if(finishBeforeBNarrative[3]) {
                console.log("I'm in it");
                if(pickingChoice(this.takeCarRoute) && (this.argueYesRoute || this.argueNoRoute)) {
                    showChoiceButtons(this.button_takeCar2);
                }

            }

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

    goNextScene() {
        if(!this.grottoTransition) {
            this.fog_left.visible = true;
            this.fog_right.visible = true;
            this.endTransition_left.play();
            this.endTransition_right.play();
            this.grottoTransition = true;
        }
    }

    goBackReality() {
        //narrativeText.setText("Is this what you want?");
        keySpace.enabled = false;
        beforeBridgeMemory = true;
        this.tweens.add({
            targets: this.fade,
            alpha: 1,
            duration: 1500,
            delay: 800,
            /*
            onComplete: function() {
                this.scene.start('backToGrottoScene');
            },
            */
            onCompleteScope: this
        });       
    }

}