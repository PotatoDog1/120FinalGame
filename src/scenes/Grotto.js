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
        

        this.finallyRoute = false;
        this.investigateRoute = false;
        this.movePastRoute = false;

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
                this.fog_left.destroy();
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
            },
            onCompleteScope: this
        });

    }

    update() {

        if(!finishGrottoNarrative[0]) {
            this.getNextLine(scriptText.grotto);
        } else {
            if(this.pickingChoice(this.finallyRoute, this.investigateRoute, this.movePastRoute)) {
                this.button_finally.on('pointerdown', function (pointer) {
                    this.finallyRoute = true;      //branch flag
                    narrativeText.setText(scriptText.grotto_wifeFinally[0]);
                    this.destroyChoiceButtons(this.button_finally, this.button_investigate, this.button_movePast);
                    this.placeImage = this.add.image(0, 0, 'livingRoom').setOrigin(0, 0).setScale(0.97);
                }, this);

                this.button_investigate.on('pointerdown', function(pointer) {
                    this.investigateRoute = true;     //branch flag
                    narrativeText.setText(scriptText.grotto_investigate[0]);
                    this.destroyChoiceButtons(this.button_finally, this.button_investigate, this.button_movePast);
                }, this);

                this.button_movePast.on('pointerdown', function(pointer) {
                    this.movePastRoute = true;     //branch flag
                    narrativeText.setText(scriptText.grotto_leave[0]);
                    this.destroyChoiceButtons(this.button_finally, this.button_investigate, this.button_movePast);
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
                    if(Phaser.Input.Keyboard.JustDown(keySpace)) {
                        this.resetGame();
                    }
                } else if(this.investigateRoute) {

                    this.button_punch.on('pointerdown', function (pointer) {
                        this.punchRoute = true;      //branch flag
                        this.cameras.main.shake(200, 0.005);
                        narrativeText.setText(scriptText.grotto_punchTree[0]);
                        this.destroyChoiceButtons(this.button_punch, this.button_sit);
                        this.button_move.visible = false;
                    }, this);
    
                    this.button_sit.on('pointerdown', function(pointer) {
                        this.sitRoute = true;     //branch flag
                        narrativeText.setText(scriptText.grotto_sit[0]);
                        this.destroyChoiceButtons(this.button_punch, this.button_sit, this.button_move);
                    }, this);

                    this.button_move.on('pointerdown', function(pointer) {
                        this.moveRoute = true;     //branch flag
                        narrativeText.setText(scriptText.grotto_leave[0]);
                        this.destroyChoiceButtons(this.button_punch, this.button_sit, this.button_move);
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
                                //placeholder for bridge connection
                                if(Phaser.Input.Keyboard.JustDown(keySpace)) {
                                    this.resetGame();
                                }
                            }
                        } else if(this.sitRoute) {
                            this.button_youPickHerUp.on('pointerdown', function (pointer) {
                                this.youPickHerUpRoute = true;      //branch flag
                                narrativeText.setText(scriptText.grotto_holyShit[0]);
                                this.destroyChoiceButtons(this.button_youPickHerUp, this.button_shit);
                            }, this);
            
                            this.button_shit.on('pointerdown', function(pointer) {
                                this.shitRoute = true;     //branch flag
                                narrativeText.setText(scriptText.grotto_holyShit[0]);
                                this.destroyChoiceButtons(this.button_youPickHerUp, this.button_shit);
                            }, this);

                            if(!finishGrottoNarrative[3]) {
                                if(this.youPickHerUpRoute || this.shitRoute){
                                    this.getNextLine(scriptText.grotto_holyShit);
                                }
                            } else {
                                this.button_breathe.on('pointerdown', function (pointer) {
                                    this.breatheRoute = true;      //branch flag
                                    narrativeText.setText(scriptText.grotto_breathingExercise[0]);
                                    this.destroyChoiceButtons(this.button_breathe, this.button_yell1);
                                }, this);
                
                                this.button_yell1.on('pointerdown', function(pointer) {
                                    this.cameras.main.shake(350, 0.01);
                                    this.yell1Route = true;     //branch flag
                                    narrativeText.setText(scriptText.grotto_yellAtWife[0]);
                                    this.destroyChoiceButtons(this.button_breathe, this.button_yell1);
                                }, this);

                                if(!finishGrottoNarrative[4]) {
                                    if(this.breatheRoute) {
                                        this.getNextLine(scriptText.grotto_breathingExercise);
                                    } else if (this.yell1Route) {
                                        this.getNextLine(scriptText.grotto_yellAtWife);
                                    }
                                } else {
                                    this.button_dots.on('pointerdown', function(pointer) {
                                        this.dotsRoute = true;
                                        narrativeText.setText(scriptText.backToGrotto[0]);
                                        this.destroyChoiceButtons(this.button_dots);
                                    }, this);

                                    if(!finishGrottoNarrative[5]) {
                                        if(this.dotsRoute) {
                                            this.getNextLine(scriptText.backToGrotto);
                                        }
                                    } else {
                                        //placeholder for backToBridge connection
                                        if(Phaser.Input.Keyboard.JustDown(keySpace)) {
                                            this.resetGame();
                                        }
                                    }
                                }
                            }

                        } else if(this.moveRoute) {
                            //placeholder for bridge connection
                            if(Phaser.Input.Keyboard.JustDown(keySpace)) {
                                this.resetGame();
                            }
                        }
                    }

                } else if(this.movePastRoute) {
                    //placeholder for bridge connection
                    if(Phaser.Input.Keyboard.JustDown(keySpace)) {
                        this.resetGame();
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
                finishGrottoNarrative[finishGrottoIndex] = true;
                finishGrottoIndex++;
            }

            //display choices
            if(finishGrottoNarrative[0] && this.pickingChoice(this.finallyRoute, this.investigateRoute, this.movePastRoute)) {
                this.showChoiceButtons(this.button_finally, this.button_investigate, this.button_movePast);
            }

            if(finishGrottoNarrative[1] && this.pickingChoice(this.punchRoute, this.sitRoute, this.moveRoute) && this.investigateRoute) {
                this.showChoiceButtons(this.button_punch, this.button_sit, this.button_move);
            }

            if(finishGrottoNarrative[2] && this.sitRoute) {
                this.showChoiceButtons(this.button_youPickHerUp, this.button_shit);
            }

            if(finishGrottoNarrative[3] && this.pickingChoice(this.breatheRoute, this.yell1Route) && (this.youPickHerUpRoute || this.shitRoute)) {
                this.showChoiceButtons(this.button_breathe, this.button_yell1);
            }

            if(finishGrottoNarrative[4] && this.pickingChoice(this.dotsRoute)) {
                this.showChoiceButtons(this.button_dots);
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
        /* will update when we have the next item
        if(target === scriptText.pickUpShoe){           //need to update every time we add an new item
            console.log("found an item")
            return true;
        } else {
            return false;
        }
        */
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
        for(var i = 0; i < finishNarrative.length; i++) {      //to loop through the narrative flag array and reset them all to false
            finishNarrative[i] = false;
            //console.log("looping through finishNarrative. Finished " + i + " time, " + i + " is " + finishNarrative[i]);
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

        finishNarrativeIndex = 0;     //to reset narrative to the beginning flag
        finishGrottoIndex = 0;
        nextLine = 1;           //to reset narrative to the beginning line
        main_bgm.stop();        //to stop game bgm when they come back to menu
        this.scene.start('menuScene');
    }

}