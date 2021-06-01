class Grotto extends Phaser.Scene {
    constructor() {
        super("grottoScene");
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
        this.placeImage = this.add.image(0, 0, 'grotto').setOrigin(0, 0);
        this.portrait = this.add.image(515, 160, 'portrait').setScale(1.15);
        this.vignette = this.add.image(0, 0, 'vignette').setOrigin(0, 0).setScale(0.97);
        this.vignette.visible = false;
        this.vignette.depth = 0.1;
        
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

        narrativeText = this.add.text(80, 445, scriptText.grotto[0], wordConfig);

        this.button_finally = this.add.sprite(80, 490, 'finally').setOrigin(0,0).setInteractive({useHandCursor: true});
        this.button_investigate = this.add.sprite(80, 527, 'investigate').setOrigin(0,0).setInteractive({useHandCursor: true});
        this.button_movePast = this.add.sprite(80, 567, 'movePast').setOrigin(0,0).setInteractive({useHandCursor: true});
        this.button_punch = this.add.sprite(80, 490, 'punch').setOrigin(0,0).setInteractive({useHandCursor: true});
        this.button_sit = this.add.sprite(80, 527, 'sit').setOrigin(0,0).setInteractive({useHandCursor: true});
        this.button_move = this.add.sprite(80, 567, 'move').setOrigin(0,0).setInteractive({useHandCursor: true});  //mark
        this.button_youPickHerUp = this.add.sprite(80, 490, 'youPickHerUp').setOrigin(0,0).setInteractive({useHandCursor: true});
        this.button_shit = this.add.sprite(80, 527, 'shit').setOrigin(0,0).setInteractive({useHandCursor: true});
        this.button_breathe = this.add.sprite(80, 490, 'breathe').setOrigin(0,0).setInteractive({useHandCursor: true});
        this.button_yell1 = this.add.sprite(80, 515, 'yell1').setOrigin(0,0).setInteractive({useHandCursor: true});
        this.button_dots = this.add.sprite(80, 567, 'dots').setOrigin(0,0).setInteractive({useHandCursor: true}); 
        this.button_talkingDots = this.add.sprite(80, 490, 'talkingDots').setOrigin(0,0).setInteractive({useHandCursor: true});
        this.button_imSorry = this.add.sprite(80, 527, 'imSorry').setOrigin(0,0).setInteractive({useHandCursor: true});
        this.button_talkingDots2 = this.add.sprite(80, 490, 'talkingDots').setOrigin(0,0).setInteractive({useHandCursor: true});
        this.button_signUp = this.add.sprite(80, 527, 'signUp').setOrigin(0,0).setInteractive({useHandCursor: true});
        this.button_yeah = this.add.sprite(80, 490, 'yeah').setOrigin(0,0).setInteractive({useHandCursor: true});
        this.button_talkingDots3 = this.add.sprite(80, 527, 'talkingDots').setOrigin(0,0).setInteractive({useHandCursor: true});
        this.button_noImSorry = this.add.sprite(80, 567, 'noImSorry').setOrigin(0,0).setInteractive({useHandCursor: true});
        this.button_sayNothing = this.add.sprite(80, 527, 'sayNothing').setOrigin(0,0).setInteractive({useHandCursor: true});
        this.button_no = this.add.sprite(80, 567, 'sayNo').setOrigin(0,0).setInteractive({useHandCursor: true});
        this.button_callLater = this.add.sprite(80, 490, 'callLater').setOrigin(0,0).setInteractive({useHandCursor: true});
        this.button_talkingDots4 = this.add.sprite(80, 527, 'talkingDots').setOrigin(0,0).setInteractive({useHandCursor: true});

        this.button_finally.visible = false;
        this.button_investigate.visible = false;
        this.button_movePast.visible = false;
        this.button_punch.visible = false;
        this.button_sit.visible = false;
        this.button_move.visible = false; //mark
        this.button_youPickHerUp.visible = false;
        this.button_shit.visible = false;
        this.button_breathe.visible = false;
        this.button_yell1.visible = false;
        this.button_dots.visible = false;
        this.button_talkingDots.visible = false;
        this.button_imSorry.visible = false;
        this.button_talkingDots2.visible = false;
        this.button_signUp.visible = false;
        this.button_yeah.visible = false;
        this.button_talkingDots3.visible = false;
        this.button_noImSorry.visible = false;
        this.button_sayNothing.visible = false;
        this.button_no.visible = false;
        this.button_callLater.visible = false;
        this.button_talkingDots4.visible = false;


        this.finallyRoute = false;
        this.investigateRoute = false;
        this.movePastRoute = false;

        //finally route check
        this.talkingDotsRoute = false;
        this.imSorryRoute = false;
        this.talkingDots2Route = false;
        this.signUpRoute = false;
        this.yeahRoute = false;
        this.talkingDots3Route = false;
        this.noImSorryRoute = false;
        this.sayNothingRoute = false;
        this.noRoute = false;
        this.callLaterRoute = false;
        this.talkingDots4Route = false;

        //investigate route check
        this.punchRoute = false;
        this.sitRoute = false;
        this.moveRoute = false;
        this.youPickHerUpRoute = false;
        this.shitRoute = false;
        this.breatheRoute = false;
        this.yell1Route = false;
        this.dotsRoute = false;

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
            duration: 1300,
            x: 0
        });
        this.endTransition_left.pause();
        
        this.endTransition_right = this.tweens.add({
            targets: this.fog_right,
            delay: 1500,
            ease: 'Sine.easeOut',
            duration: 1300,
            x: 165,
            completeDelay: 1000,
            onComplete: function() {
                main_bgm.stop(); 
                if(this.punchRoute || this.moveRoute || this.movePastRoute) {
                    console.log("anger = " + anger + " and stifled = " + stifled);
                    this.scene.start('beforeBridgeScene');
                } else {
                    console.log("anger = " + anger + " and stifled = " + stifled);
                    this.scene.start('backToGrottoScene');
                }
            },
            onCompleteScope: this
        });
        this.endTransition_right.pause();
        
        this.grottoTransition = false;

    }

    update() {

        if(!finishGrottoNarrative[0]) {
            this.getNextLine(scriptText.grotto);
        } else {
            if(pickingChoice(this.finallyRoute, this.investigateRoute, this.movePastRoute)) {
                this.button_finally.on('pointerdown', function (pointer) {
                    this.finallyRoute = true;      //branch flag
                    narrativeText.setText(scriptText.grotto_wifeFinally[0]);
                    destroyChoiceButtons(this.button_finally, this.button_investigate, this.button_movePast);
                    this.placeImage = this.add.image(0, 0, 'livingRoom').setOrigin(0, 0).setScale(0.97);
                    this.vignette.visible = true;

                }, this);

                this.button_investigate.on('pointerdown', function(pointer) {
                    this.investigateRoute = true;     //branch flag
                    narrativeText.setText(scriptText.grotto_investigate[0]);
                    destroyChoiceButtons(this.button_finally, this.button_investigate, this.button_movePast);
                }, this);

                this.button_movePast.on('pointerdown', function(pointer) {
                    this.movePastRoute = true;     //branch flag
                    narrativeText.setText(scriptText.grotto_leave[0]);
                    destroyChoiceButtons(this.button_finally, this.button_investigate, this.button_movePast);
                }, this);
            }

            if(!finishGrottoNarrative[1]) {
                if(this.finallyRoute) {
                    this.getNextLine(scriptText.grotto_wifeFinally);
                } else if (this.investigateRoute) {
                    this.getNextLine(scriptText.grotto_investigate);
                } else if (this.movePastRoute) {
                    this.getNextLine(scriptText.grotto_leave);
                }
            } else {
                if(this.finallyRoute) {
                    this.button_talkingDots.on('pointerdown', function (pointer) {
                        this.talkingDotsRoute = true;      //branch flag
                        narrativeText.setText(scriptText.grotto_wifeSilence[0]);
                        destroyChoiceButtons(this.button_talkingDots, this.button_imSorry);
                    }, this);
    
                    this.button_imSorry.on('pointerdown', function(pointer) {
                        this.imSorryRoute = true;     //branch flag
                        narrativeText.setText(scriptText.grotto_apologeticWife[0]);
                        destroyChoiceButtons(this.button_talkingDots, this.button_imSorry);
                    }, this);

                    if(!finishGrottoNarrative[2]) {
                        if(this.talkingDotsRoute) {
                            this.getNextLine(scriptText.grotto_wifeSilence);
                        } else if (this.imSorryRoute) {
                            this.getNextLine(scriptText.grotto_apologeticWife);
                        }
                    } else {
                        if(this.talkingDotsRoute) {
                            this.button_talkingDots2.on('pointerdown', function (pointer) {
                                this.talkingDots2Route = true;      //branch flag
                                narrativeText.setText("Is this what you want?");
                                destroyChoiceButtons(this.button_talkingDots2, this.button_signUp);
                                this.goNextScene();
                                
                            }, this);
            
                            this.button_signUp.on('pointerdown', function(pointer) {
                                this.signUpRoute = true;     //branch flag
                                narrativeText.setText("Is this what you want?");
                                destroyChoiceButtons(this.button_talkingDots2, this.button_signUp);
                                this.goNextScene();
                            }, this);

                        } else if (this.imSorryRoute) {

                            this.button_yeah.on('pointerdown', function (pointer) {
                                this.yeahRoute = true;      //branch flag
                                narrativeText.setText(scriptText.grotto_lieToWife[0]);
                                destroyChoiceButtons(this.button_yeah, this.button_talkingDots3, this.button_noImSorry);
                            }, this);
            
                            this.button_talkingDots3.on('pointerdown', function(pointer) {
                                this.talkingDots3Route = true;     //branch flag
                                narrativeText.setText(scriptText.grotto_wifeSilence[0]);
                                destroyChoiceButtons(this.button_yeah, this.button_talkingDots3, this.button_noImSorry);
                            }, this);

                            this.button_noImSorry.on('pointerdown', function(pointer) {
                                this.noImSorryRoute = true;     //branch flag
                                narrativeText.setText(scriptText.grotto_wifeNoPreschool[0]);
                                destroyChoiceButtons(this.button_yeah, this.button_talkingDots3, this.button_noImSorry);
                            }, this);

                            if(!finishGrottoNarrative[3]) {
                                if(this.yeahRoute) {
                                    this.getNextLine(scriptText.grotto_lieToWife);
                                } else if (this.talkingDots3Route) {
                                    this.getNextLine(scriptText.grotto_wifeSilence);
                                } else if (this.noImSorryRoute) {
                                    this.getNextLine(scriptText.grotto_wifeNoPreschool);
                                }
                            } else {
                                if(this.yeahRoute) {
                                    this.button_sayNothing.on('pointerdown', function (pointer) {
                                        this.sayNothingRoute = true;      //branch flag
                                        narrativeText.setText("Is this what you want?");
                                        destroyChoiceButtons(this.button_sayNothing, this.button_no);
                                        this.goNextScene();
                                        
                                    }, this);
                    
                                    this.button_no.on('pointerdown', function(pointer) {
                                        this.noRoute = true;     //branch flag
                                        narrativeText.setText("Is this what you want?");
                                        destroyChoiceButtons(this.button_sayNothing, this.button_no);
                                        this.goNextScene();
                                    }, this);

                                } else if (this.talkingDots3Route) {        //fix later; maybe need to redirect it??
                                    this.button_talkingDots2.on('pointerdown', function (pointer) {
                                        this.talkingDots2Route = true;      //branch flag
                                        narrativeText.setText("Is this what you want?");
                                        destroyChoiceButtons(this.button_talkingDots2, this.button_signUp);
                                        this.goNextScene(); 
                                    }, this);
                    
                                    this.button_signUp.on('pointerdown', function(pointer) {
                                        this.signUpRoute = true;     //branch flag
                                        narrativeText.setText("Is this what you want?");
                                        destroyChoiceButtons(this.button_talkingDots2, this.button_signUp);
                                        this.goNextScene();
                                    }, this);
        
                                } else if (this.noImSorryRoute) {
                                    this.button_callLater.on('pointerdown', function (pointer) {
                                        this.callLaterRoute = true;      //branch flag
                                        narrativeText.setText("Is this what you want?");
                                        destroyChoiceButtons(this.button_callLater, this.button_talkingDots4);
                                        this.goNextScene(); 
                                    }, this);
                    
                                    this.button_talkingDots4.on('pointerdown', function(pointer) {
                                        this.talkingDots4Route = true;     //branch flag
                                        narrativeText.setText("Is this what you want?");
                                        destroyChoiceButtons(this.button_callLater, this.button_talkingDots4);
                                        this.goNextScene();
                                    }, this);
                                }
                            }

                        }
                    }

                } else if(this.investigateRoute) {

                    this.button_punch.on('pointerdown', function (pointer) {
                        this.punchRoute = true;      //branch flag
                        this.cameras.main.shake(200, 0.005);
                        narrativeText.setText(scriptText.grotto_punchTree[0]);
                        destroyChoiceButtons(this.button_punch, this.button_sit);
                        this.button_move.visible = false;
                    }, this);
    
                    this.button_sit.on('pointerdown', function(pointer) {
                        this.sitRoute = true;     //branch flag
                        narrativeText.setText(scriptText.grotto_sit[0]);
                        destroyChoiceButtons(this.button_punch, this.button_sit, this.button_move);
                    }, this);

                    this.button_move.on('pointerdown', function(pointer) {          //fix this
                        this.moveRoute = true;     //branch flag
                        //narrativeText.setText(scriptText.grotto_leave[0]);
                        destroyChoiceButtons(this.button_punch, this.button_sit, this.button_move);
                    }, this);

                    if(!finishGrottoNarrative[2]) {
                        if(this.punchRoute) {
                            this.getNextLine(scriptText.grotto_punchTree);
                        } else if (this.sitRoute) {
                            this.getNextLine(scriptText.grotto_sit);
                        } else if (this.moveRoute) {
                            this.getNextLine(scriptText.grotto_leave);
                        }
                    } else {
                        
                        if(this.punchRoute) {
                            if(!finishGrottoNarrative[3]) {
                                this.getNextLine(scriptText.grotto_leave, true);
                            } else {
                                if(Phaser.Input.Keyboard.JustDown(keySpace)) {
                                    this.goNextScene();
                                }
                            }
                        } else if(this.sitRoute) {
                            this.button_youPickHerUp.on('pointerdown', function (pointer) {
                                this.youPickHerUpRoute = true;      //branch flag
                                narrativeText.setText(scriptText.grotto_holyShit[0]);
                                destroyChoiceButtons(this.button_youPickHerUp, this.button_shit);
                            }, this);
            
                            this.button_shit.on('pointerdown', function(pointer) {
                                this.shitRoute = true;     //branch flag
                                narrativeText.setText(scriptText.grotto_holyShit[0]);
                                destroyChoiceButtons(this.button_youPickHerUp, this.button_shit);
                            }, this);

                            if(!finishGrottoNarrative[3]) {
                                if(this.youPickHerUpRoute || this.shitRoute){
                                    this.getNextLine(scriptText.grotto_holyShit);
                                }
                            } else {
                                this.button_breathe.on('pointerdown', function (pointer) {
                                    this.breatheRoute = true;      //branch flag
                                    narrativeText.setText(scriptText.grotto_breathingExercise[0]);
                                    destroyChoiceButtons(this.button_breathe, this.button_yell1);
                                }, this);
                
                                this.button_yell1.on('pointerdown', function(pointer) {
                                    this.cameras.main.shake(350, 0.01);
                                    this.yell1Route = true;     //branch flag
                                    narrativeText.setText(scriptText.grotto_yellAtWife[0]);
                                    destroyChoiceButtons(this.button_breathe, this.button_yell1);
                                }, this);

                                if(!finishGrottoNarrative[4]) {
                                    if(this.breatheRoute) {
                                        this.getNextLine(scriptText.grotto_breathingExercise);
                                    } else if (this.yell1Route) {
                                        this.getNextLine(scriptText.grotto_yellAtWife);
                                    }
                                } else {
                                    this.goNextScene();
                                }
                            }

                        } else if(this.moveRoute) {
                            if(Phaser.Input.Keyboard.JustDown(keySpace)) {
                                this.goNextScene();
                            }
                        }
                    }

                } else if(this.movePastRoute) {
                    if(Phaser.Input.Keyboard.JustDown(keySpace)) {
                        this.goNextScene();
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
            if(!finishGrottoNarrative[2] && this.punchRoute) {
                anger += 1;
            }

            if(!finishGrottoNarrative[4]) {
                if(this.talkingDots2Route) {
                    stifled += 1;
                }

                if(this.sayNothingRoute) {
                    stifled += 1;
                }

                if(this.talkingDots4Route) {
                    stifled += 1;
                }

                if(this.breatheRoute) {
                    stifled += 1;
                }
                
                if(this.yell1Route) {
                    anger += 2;
                }
            }


            if(!this.checkItemNarrative(target)){       //if it's a flag narrative
                finishGrottoNarrative[finishGrottoIndex] = true;
                finishGrottoIndex++;
            }


            //display choices
            if(finishGrottoNarrative[0] && pickingChoice(this.finallyRoute, this.investigateRoute, this.movePastRoute)) {
                showChoiceButtons(this.button_finally, this.button_investigate, this.button_movePast);
            }

            if(finishGrottoNarrative[1]){
                if(pickingChoice(this.talkingDotsRoute, this.imSorryRoute) && this.finallyRoute) {
                    showChoiceButtons(this.button_talkingDots, this.button_imSorry);
                }

                if(pickingChoice(this.punchRoute, this.sitRoute, this.moveRoute) && this.investigateRoute) {
                    showChoiceButtons(this.button_punch, this.button_sit, this.button_move);
                }
            }

            if(finishGrottoNarrative[2]){
                if(pickingChoice(this.talkingDots2Route, this.signUpRoute) && this.talkingDotsRoute) {
                    showChoiceButtons(this.button_talkingDots2, this.button_signUp);
                }

                if(pickingChoice(this.yeahRoute, this.talkingDots3Route, this.noImSorryRoute) && this.imSorryRoute) {
                    showChoiceButtons(this.button_yeah, this.button_talkingDots3, this.button_noImSorry);
                }

                if(this.sitRoute) {
                    showChoiceButtons(this.button_youPickHerUp, this.button_shit);
                }
            }

            if(finishGrottoNarrative[3]) {
                if(pickingChoice(this.sayNothingRoute, this.noRoute) && this.yeahRoute) {
                    showChoiceButtons(this.button_sayNothing, this.button_no);
                }

                if(pickingChoice(this.breatheRoute, this.yell1Route) && (this.youPickHerUpRoute || this.shitRoute)) {
                    showChoiceButtons(this.button_breathe, this.button_yell1);
                }

                if(pickingChoice(this.talkingDots2Route, this.signUpRoute) && this.talkingDots3Route) {
                    showChoiceButtons(this.button_talkingDots2, this.button_signUp);
                }

                if(pickingChoice(this.callLaterRoute, this.talkingDots4Route) && this.noImSorryRoute) {
                    showChoiceButtons(this.button_callLater, this.button_talkingDots4);
                }

            }
        }

    }


    checkItemNarrative(target) {

        if(target === scriptText.pickUpShoe){           //need to update every time we add an new item
            console.log("found an item")
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