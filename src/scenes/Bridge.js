class Bridge extends Phaser.Scene {
    constructor() {
        super("bridgeScene");
    }

    create() {

        if(beforeBridgeMemory) {
            this.fade = this.add.sprite(0, 0, 'fade').setOrigin(0,0);
            this.fade.depth = 3;
    
            this.tweens.add({
                targets: this.fade,
                alpha: 0,
                duration: 2000,
                onComplete: function() {
                    keySpace.enabled = true;
                }
            });  

            //notebook
            this.skateboard = this.add.sprite(80, 230, 'skateboard').setScale(0.2).setInteractive({
                draggable: true,
                useHandCursor: true
            });
            this.skateboard.depth = 1.2;
            this.checkItemSkateboardNarrative = false;

            this.skateboard.on('pointerover', function(pointer) {
                this.setScale(0.25);
            });

            this.skateboard.on('pointerout', function(pointer) {
                this.setScale(0.2);
            });

            this.skateboard.on('drag', (pointer,  dragX, dragY) => {
                this.skateboard.x = dragX;
                this.skateboard.y = dragY;
            });
            
            this.skateboard.on('drop', (pointer, target) => {
                if (target.texture.key === 'bag') {
                    this.skateboard.destroy();
                    narrativeText.setText(scriptText.skateboard[0]);
                    this.button_continue.visible = false;
                    hasItem[2] = true;
                } else if(target.texture.key === 'noDrop') {        // if they didn't drop it on the inventory bag
                    this.returnToLocation(this.skateboard);
                }
            });

            this.skateboard.input.draggable = false;
            
        }

        //define keys
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
        this.scribble = this.add.sprite(410, 53, 'scribble').setOrigin(0, 0);
        this.scribble.setScale(.09);
        this.scribble.anims.play('scribbling');
        

        this.scribbleFaster = this.add.sprite(375, 60, 'scribble').setOrigin(0, 0);
        this.scribbleFaster.setScale(.13);
        this.scribbleFaster.anims.play('scribblingFaster');

        
        this.scribbleFastest = this.add.sprite(330, 25, 'scribble').setOrigin(0, 0);
        this.scribbleFastest.setScale(.17);
        this.scribbleFastest.anims.play('scribblingFastest');

        //narrative 
        scriptText = this.cache.json.get('json_script');

        //interactive objects ----------------------------------------------------
        this.item_bridge = this.add.sprite(210, 255, 'item_bridge').setScale(0.4);


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

        if(beforeBridgeMemory) {
            narrativeText = this.add.text(80, 445, scriptText.bridge_crossing[0], wordConfig);
        } else {
            narrativeText = this.add.text(80, 445, scriptText.bridge_crossing2[0], wordConfig);
        }

        this.button_continue = this.add.sprite(80, 490, 'continue2').setOrigin(0,0).setInteractive({useHandCursor: true});
        this.button_waitWind = this.add.sprite(80, 490, 'waitWind').setOrigin(0,0).setInteractive({useHandCursor: true});
        this.button_continueForward = this.add.sprite(80, 527, 'continueForward').setOrigin(0,0).setInteractive({useHandCursor: true});
        this.button_runAcrossBridge = this.add.sprite(80, 567, 'runAcrossBridge').setOrigin(0,0).setInteractive({useHandCursor: true});
        this.button_breatheCalm = this.add.sprite(80, 527, 'breatheCalm').setOrigin(0,0).setInteractive({useHandCursor: true});
        this.button_continueTower = this.add.sprite(80, 490, 'continueTower').setOrigin(0,0).setInteractive({useHandCursor: true});
        this.button_pause = this.add.sprite(80, 527, 'pause').setOrigin(0,0).setInteractive({useHandCursor: true});
        this.button_calmDown = this.add.sprite(80, 490, 'calmDown').setOrigin(0,0).setInteractive({useHandCursor: true});

        this.button_continue.visible = false;
        this.button_waitWind.visible = false;
        this.button_continueForward.visible = false;
        this.button_runAcrossBridge.visible = false;
        this.button_breatheCalm.visible = false;
        this.button_continueTower.visible = false;
        this.button_pause.visible = false;
        this.button_calmDown.visible = false;

        this.continueRoute = false;
        this.waitWindRoute = false;
        this.continueForwardRoute = false;
        this.runAcrossBridgeRoute = false;
        this.breatheCalmRoute = false;
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
            duration: 1300,
            x: -640,
            onStart: function () {
                keySpace.enabled = false;
            },
            onStartScope: this,
            onComplete: function() {
                this.fog_left.visible = false;
                keySpace.enabled = true;
            },
            onCompleteScope: this
        });
        
        this.fog_right = this.add.sprite(133, 0, 'fog_right').setOrigin(0, 0);
        this.fog_right.depth = 2;
        this.transition_right = this.tweens.add({
            targets: this.fog_right,
            delay: 300,
            ease: 'Sine.easeOut',
            duration: 1300,
            x: 640,
            onComplete: function() {
                this.fog_right.visible = false;
            },
            onCompleteScope: this
        });

        //end transition-------------------------------------------------
        this.endTransition_left = this.tweens.add({
            targets: this.fog_left,
            delay: 1500,
            ease: 'Sine.easeOut',
            duration: 1300,
            x: 0
        });
        this.endTransition_left.pause();
        
        this.endTransition_right = this.tweens.add({
            targets: this.fog_right,
            delay: 1500,
            ease: 'Sine.easeOut',
            duration: 1300,
            x: 133,
            completeDelay: 1000,
            onComplete: function() {
                main_bgm.stop(); 
                console.log("anger = " + anger + " and stifled = " + stifled);
                this.scene.start('towerScene');
            },
            onCompleteScope: this
        });
        this.endTransition_right.pause();
        
        this.grottoTransition = false;

    }

    update() {

        if(anger >= 7) {
            this.scribbleFastest.visible = true;
        } else if (anger >= 3) {
            this.scribbleFaster.visible = true;
            this.scribbleFastest.visible = false;
        } else if (anger >= 1) {
            this.scribble.visible = true;
            this.scribbleFaster.visible = false;
            this.scribbleFastest.visible = false;
        } else if (anger == 0) {
            this.scribble.visible = false;
            this.scribbleFaster.visible = false;
            this.scribbleFastest.visible = false;
        }

        
        if(stifled >= 6) {
            this.portrait.alpha = 0.2;
        } else if (stifled >=3) {
            this.portrait.alpha = 0.5;
        } else if (stifled >= 1) {
            this.portrait.alpha = 0.8;
        } else if (stifled == 0) {
            this.portrait.alpha = 1;
        }
        
        

        if(!finishBridgeNarrative[0]) {
            if(beforeBridgeMemory) {
                this.getNextLine(scriptText.bridge_crossing);
                console.log("did not pass the item");
            } else {
                finishBridgeNarrative[0] = true;
                this.continueRoute = true;
                finishBridgeIndex++
                console.log("passing the item narrative");
            }
        } else {

            // skateboard item
            if(!hasItem[2] && pickingChoice(this.continueRoute)) {
                this.checkItemSkateboardNarrative = true;
                this.skateboard.input.draggable = true;
            }

            if(hasItem[2] && !finishItemNarrative[2] && this.checkItemSkateboardNarrative) {
                this.getNextLine(scriptText.skateboard);
            }

            this.button_continue.on('pointerdown', function (pointer) {
                this.continueRoute = true;      //branch flag
                narrativeText.setText(scriptText.bridge_crossing2[0]); 
                destroyChoiceButtons(this.button_continue);
                if(!hasItem[2]){
                    if(this.skateboard != undefined) {
                        this.skateboard.destroy();
                    }
                }
            }, this);

            if(!finishBridgeNarrative[1]) {
                if(this.continueRoute) {
                    this.getNextLine(scriptText.bridge_crossing2);
                }
            } else {

                this.button_waitWind.on('pointerdown', function (pointer) {
                    this.waitWindRoute = true;      //branch flag
                    narrativeText.setText(scriptText.bridge_waitOutTheWind[0]); 
                    destroyChoiceButtons(this.button_waitWind, this.button_continueForward, this.button_runAcrossBridge);
                }, this);
    
                this.button_continueForward.on('pointerdown', function(pointer) {
                    this.continueForwardRoute = true;     //branch flag
                    narrativeText.setText(scriptText.bridge_continueFoward[0]);
                    destroyChoiceButtons(this.button_waitWind, this.button_continueForward, this.button_runAcrossBridge);
                }, this);
    
                this.button_runAcrossBridge.on('pointerdown', function(pointer) {
                    this.runAcrossBridgeRoute = true;     //branch flag
                    narrativeText.setText(scriptText.bridge_runAcrossBridge[0]);
                    destroyChoiceButtons(this.button_waitWind, this.button_continueForward, this.button_runAcrossBridge);
                }, this);
    
                if(!finishBridgeNarrative[2]) {
                    if(this.waitWindRoute) {
                        this.getNextLine(scriptText.bridge_waitOutTheWind);
                    } else if (this.continueForwardRoute) {
                        this.getNextLine(scriptText.bridge_continueFoward);
                    } else if (this.runAcrossBridgeRoute) {
                        this.getNextLine(scriptText.bridge_runAcrossBridge);
                    }
                } else {
                    if(this.waitWindRoute) {
                        this.button_breatheCalm.on('pointerdown', function (pointer) {
                            this.breatheCalmRoute = true;      //branch flag
                            narrativeText.setText(scriptText.bridge_calm[0]); 
                            destroyChoiceButtons(this.button_breatheCalm);
                        }, this);
    
                        if(!finishBridgeNarrative[3]) {
                            if(this.breatheCalmRoute) {
                                this.getNextLine(scriptText.bridge_calm);
                            }
                        } else {
                            this.goNextScene();
                        }
    
                    } else if (this.continueForwardRoute) {
                        this.button_continueTower.on('pointerdown', function (pointer) {
                            narrativeText.setText("You move towards the direction that the\ntower stands."); 
                            destroyChoiceButtons(this.button_continueTower, this.button_pause);
                            this.goNextScene();
                        }, this);
    
                        this.button_pause.on('pointerdown', function (pointer) {
                            this.pauseRoute = true;      //branch flag
                            narrativeText.setText(scriptText.bridge_calm[0]); 
                            destroyChoiceButtons(this.button_continueTower, this.button_pause);
                        }, this);
    
                        if(!finishBridgeNarrative[3]) {
                            if(this.pauseRoute) {
                                this.getNextLine(scriptText.bridge_calm);
                            }
                        } else {
                            this.goNextScene();
                        }
                    } else if (this.runAcrossBridgeRoute) {
                        this.button_calmDown.on('pointerdown', function (pointer) {
                            this.calmDownRoute = true;      //branch flag
                            narrativeText.setText(scriptText.bridge_calm[0]); 
                            destroyChoiceButtons(this.button_calmDown);
                        }, this);
    
                        if(!finishBridgeNarrative[3]) {
                            if(this.calmDownRoute) {
                                this.getNextLine(scriptText.bridge_calm);
                            }
                        } else {
                            this.goNextScene();
                        }
                    }
                }
            }

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
            if(!finishBridgeNarrative[2]) {
                if(this.waitWindRoute) {
                    stifled += 1;
                    console.log("added 1 to stifled!");
                }

                if(this.runAcrossBridgeRoute) {
                    anger += 1;
                    console.log("added 1 to anger!");
                }
            }

            if(!finishBridgeNarrative[3]) {
                if(this.breatheCalmRoute) {
                    if(anger > 0) {
                        anger -= 1;
                        console.log("minus 1 anger");
                    }
                    if(stifled > 0) {
                        stifled -= 1;
                        console.log("minus 1 stifled");
                    }

                }

                if(this.pauseRoute) {
                    if(anger > 0) {
                        anger -= 1;
                        console.log("minus 1 anger!!");
                    }
                    if(stifled > 0) {
                        stifled -= 1;
                        console.log("minus 1 stifled!!");
                    }

                }

            }
            /*
            if(!this.checkItemNarrative(target)) {       //if it's a flag narrative
                finishBridgeNarrative[finishBridgeIndex] = true;
                finishBridgeIndex++;
            } else if (this.checkInteractiveNarrative(target)) {
                interactveNarrartive[i] = true;
                interactiveIndex++;
            }

            */

            if(this.checkItemNarrative(target)) {
                finishItemNarrative[2] = true;      //skateboard
                this.checkItemSkateboardNarrative = false;
            } else {                                //if it's a flag narrative
                finishBridgeNarrative[finishBridgeIndex] = true;
                finishBridgeIndex++;
            }

            //display choices
            if(finishBridgeNarrative[0]) {
                if(pickingChoice(this.continueRoute)) {
                    showChoiceButtons(this.button_continue);
                }
            }

            if(finishBridgeNarrative[1]) {
                if(pickingChoice(this.waitWindRoute, this.continueForwardRoute, this.runAcrossBridgeRoute)) {
                    showChoiceButtons(this.button_waitWind, this.button_continueForward, this.button_runAcrossBridge);
                }
            }

            if(finishBridgeNarrative[2]) {
                if(pickingChoice(this.breatheCalmRoute) && this.waitWindRoute) {
                    showChoiceButtons(this.button_breatheCalm);
                }
                
                if(pickingChoice(this.continueTowerRoute, this.pauseRoute) && this.continueForwardRoute) {
                    showChoiceButtons(this.button_continueTower, this.button_pause);
                }

                if(pickingChoice(this.breatheCalmRoute) && this.runAcrossBridgeRoute) {
                    showChoiceButtons(this.button_calmDown);
                }
            }            

        }

    }

    returnToLocation(target) {
        target.setPosition(target.input.dragStartX, target.input.dragStartY);
    }


    checkItemNarrative(target) {
        if(target === scriptText.skateboard) {
            return true;
        } else {
            return false;
        }
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

}