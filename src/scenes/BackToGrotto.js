class BackToGrotto extends Phaser.Scene {
    constructor() {
        super("backToGrottoScene");
    }

    create() {

        this.fade = this.add.sprite(0, 0, 'fade').setOrigin(0,0);
        this.fade.depth = 3;

        this.tweens.add({
            targets: this.fade,
            alpha: 0,
            duration: 1000,
            onStart: function() {
                keySpace.enabled = false;
            },
            onComplete: function() {
                keySpace.enabled = true;
            }
        });  

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

        //notebook
        this.notebook = this.add.sprite(91, 170, 'notebook').setInteractive({
            draggable: true,
            useHandCursor: true
        });
        this.notebook.depth = 1.2;

        this.notebook.on('pointerover', function(pointer) {
            this.setScale(1.1);
        });

        this.notebook.on('pointerout', function(pointer) {
            this.setScale(1);
        })

        //Choices related----------------------------------------------------

        narrativeText = this.add.text(80, 445, scriptText.backToGrotto[0], wordConfig);

        this.button_movePast = this.add.sprite(80, 490, 'movePast').setOrigin(0,0).setInteractive({useHandCursor: true});
        this.button_findWayOut = this.add.sprite(80, 527, 'findWayOut').setOrigin(0,0).setInteractive({useHandCursor: true});
        this.button_giveUp = this.add.sprite(80, 490, 'giveUp').setOrigin(0,0).setInteractive({useHandCursor: true});
        this.button_goBackGrotto = this.add.sprite(80, 527, 'goBackGrotto').setOrigin(0,0).setInteractive({useHandCursor: true});
        this.button_movePast2 =  this.add.sprite(80, 527, 'movePast').setOrigin(0,0).setInteractive({useHandCursor: true});

        this.button_movePast.visible = false;
        this.button_findWayOut.visible = false;
        this.button_giveUp.visible = false;
        this.button_goBackGrotto.visible = false;
        this.button_movePast2.visible = false;

        
        this.movePastRoute = false;
        this.findWayOutRoute = false;
        this.giveUpRoute = false;
        this.goBackGrottoRoute = false;
        this.movePast2Route = false;

        //Choices end--------------------------------------------------------

        //create frame
        this.frame = this.add.image(0, 0, 'frame').setOrigin(0, 0);
        this.frame.depth = 1;

        //transition -----------------------------------------------------   
        this.fog_left = this.add.sprite(-640, 0, 'fog_left').setOrigin(0, 0);
        this.fog_left.depth = 2;
        this.fog_left.visible = false;
        
        this.fog_right = this.add.sprite(640, 0, 'fog_right').setOrigin(0, 0);
        this.fog_right.depth = 2;
        this.fog_right.visible = false;

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
                this.scene.start('beforeBridgeScene');
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
        

        if(!finishBackGNarrative[0]) {
            this.getNextLine(scriptText.backToGrotto);
        } else {
            this.button_movePast.on('pointerdown', function (pointer) {
                this.movePastRoute = true;      //branch flag
                if (anger == 2) {
                    narrativeText.setText(scriptText.grotto_leave_angry2[0]);
                } else if(stifled == 1) {
                    narrativeText.setText(scriptText.grotto_leave_stifled1[0]);
                } else if(stifled == 2) {
                    narrativeText.setText(scriptText.grotto_leave_stifled2[0]);
                } else {
                    narrativeText.setText(scriptText.grotto_leave[0]);
                }
                destroyChoiceButtons(this.button_movePast, this.button_findWayOut);
            }, this);

            this.button_findWayOut.on('pointerdown', function(pointer) {
                this.findWayOutRoute = true;     //branch flag
                narrativeText.setText(scriptText.grotto_leavePartOne[0]);
                destroyChoiceButtons(this.button_movePast, this.button_findWayOut);
            }, this);

            if(!finishBackGNarrative[1]) {
                if(this.movePastRoute) {
                    if(anger > 0 || stifled > 0) {
                        this.getNextLine(scriptText.grotto_leave, true);
                    } else {
                        this.getNextLine(scriptText.grotto_leave);
                    }
                    
                } else if (this.findWayOutRoute) {
                    this.getNextLine(scriptText.grotto_leavePartOne);
                }
            } else {
                if(this.movePastRoute) {
                    //placeholder for bridge connection
                    if(Phaser.Input.Keyboard.JustDown(keySpace)) {
                        this.goNextScene();
                    }
                } else if (this.findWayOutRoute) {
                    this.button_giveUp.on('pointerdown', function (pointer) {
                        this.giveUpRoute = true;      //branch flag
                        narrativeText.setText(scriptText.grotto_end[0]);      //fix later; add emotion narrative accordingly
                        destroyChoiceButtons(this.button_giveUp, this.button_goBackGrotto);
                    }, this);
        
                    this.button_goBackGrotto.on('pointerdown', function(pointer) {
                        this.goBackGrottoRoute = true;     //branch flag
                        narrativeText.setText(scriptText.grotto_leavePartTwo[0]);
                        destroyChoiceButtons(this.button_giveUp, this.button_goBackGrotto);
                    }, this);

                    if(!finishBackGNarrative[2]) {
                        if(this.giveUpRoute) {
                            this.getNextLine(scriptText.grotto_end);
                        } else if (this.goBackGrottoRoute) {
                            this.getNextLine(scriptText.grotto_leavePartTwo);
                        }
                    } else {
                        if(this.giveUpRoute) {
                            if(Phaser.Input.Keyboard.JustDown(keySpace)) {
                                resetGame();
                                this.scene.start('menuScene');
                            }
                        } else if (this.goBackGrottoRoute) {
                            this.button_movePast2.on('pointerdown', function (pointer) {
                                this.movePast2Route = true;      //branch flag
                                if (anger == 2) {
                                    narrativeText.setText(scriptText.grotto_leave_angry2[0]);
                                } else if(stifled == 1) {
                                    narrativeText.setText(scriptText.grotto_leave_stifled1[0]);
                                } else if(stifled == 2) {
                                    narrativeText.setText(scriptText.grotto_leave_stifled2[0]);
                                } else {
                                    narrativeText.setText(scriptText.grotto_leave[0]);
                                }
                                destroyChoiceButtons(this.button_movePast2);
                            }, this);

                            if(!finishBackGNarrative[3]) {
                                if(this.movePast2Route) {
                                    if(anger > 0 || stifled > 0) {
                                        this.getNextLine(scriptText.grotto_leave, true);
                                    } else {
                                        this.getNextLine(scriptText.grotto_leave);
                                    }
                                }
                            } else {
                                if(Phaser.Input.Keyboard.JustDown(keySpace)) {
                                    resetGame();
                                    this.scene.start('menuScene');
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

            if(!this.checkItemNarrative(target)){       //if it's a flag narrative
                finishBackGNarrative[finishBackGIndex] = true;
                finishBackGIndex++;
            }

            //display choices
            if(finishBackGNarrative[0]) {
                if(pickingChoice(this.movePastRoute, this.findWayOutRoute)) {
                    showChoiceButtons(this.button_movePast, this.button_findWayOut);
                }
            }
            
            if(finishBackGNarrative[1]) {
                if(pickingChoice(this.giveUpRoute, this.goBackGrottoRoute) && this.findWayOutRoute) {
                    showChoiceButtons(this.button_giveUp, this.button_goBackGrotto);
                }
            }
            
            if(finishBackGNarrative[2]) {
                if(pickingChoice(this.movePast2Route) && this.goBackGrottoRoute) {
                    showChoiceButtons(this.button_movePast2);
                }
            }

        }

    }

    checkItemNarrative(target) {
       return false;
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