class Crossroad extends Phaser.Scene {
    constructor() {
        super("crossroadScene");
    }

    create() {

        //define keys
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //add sound
        main_bgm = this.sound.add('bgm_1', { volume: 0.3 });
        main_bgm.play({ loop: true });
        sfx_pencil = this.sound.add('sfx_pencil', {volume: 2.3});

        //add temp art assets
        this.add.rectangle(0, 0, game.config.width, game.config.height, 0x575757).setOrigin(0, 0);
        this.add.image(0, 400, 'bg_notepad').setOrigin(0,0);
        this.placeImage = this.add.image(0, 0, 'crossroad').setOrigin(0, 0);
        this.portrait = this.add.image(515, 160, 'portrait').setScale(1.15);
        
        //breathing portrait animation
        this.tweens.add({
            targets: [this.portrait],
            scale: {from: 1.17, to: 1.15},
            duration: 830,
            yoyo: true,
            repeat: -1
        });

        this.checkPocketNarrative = false;
        this.checkPocket = false;

        //all choices 
        this.button_continue = this.add.sprite(80, 490, 'continue').setOrigin(0,0).setInteractive({useHandCursor: true});
        this.button_leave = this.add.sprite(80, 527, 'leave').setOrigin(0,0).setInteractive({useHandCursor: true});
        this.button_continue2 = this.add.sprite(80, 490, 'continue2').setOrigin(0,0).setInteractive({useHandCursor: true});
        this.button_leave2 = this.add.sprite(80, 527, 'leave2').setOrigin(0,0).setInteractive({useHandCursor: true});
        this.button_yes = this.add.sprite(80, 530, 'yes').setOrigin(0,0).setInteractive({useHandCursor: true});
        this.button_no = this.add.sprite(80, 571, 'no').setOrigin(0,0).setInteractive({useHandCursor: true});
        
        this.button_continue.visible = false;
        this.button_leave.visible = false;
        this.button_continue2.visible = false;
        this.button_leave2.visible = false;
        this.button_yes.visible = false;
        this.button_no.visible = false;


        //Inventory related ----------------------------------------------------

        //inventory bag
        this.bag = this.add.sprite(509, 327, 'bag').setOrigin(0.5, 0.5);
        this.bag.setInteractive({
            dropZone: true,
            useHandCursor: true
        });
        this.bag.on('pointerdown', function(pointer) {          //after players check pocket
            if(this.checkPocketNarrative){
                this.bagShake.stop();
                narrativeText.setText(scriptText.pocket[0]);
                this.checkPocket = true;
                this.checkPocketNarrative = false;
            }
        }, this);

        //when pointer is over the bag, it will scale up, if not it will scale down
        this.bag.on('pointerover', function(pointer) {
            this.setScale(1.1);
        });

        this.bag.on('pointerout', function(pointer) {
            this.setScale(1);
        })

        this.bagShake = this.tweens.add({
            targets: this.bag,
            angle: {from: -4, to: 4},
            ease: 'Bounce.easeIn',
            duration: 1400,
            repeat: -1,
            yoyo: true,
        });
        this.bagShake.pause();

        //nodrop zone image
        this.noDropZone = this.add.sprite(0, 0, 'noDrop').setOrigin(0, 0);
        this.noDropZone.depth = -0.5;       //to hide it from players
        this.noDropZone.setInteractive({
            dropZone: true
        })

        this.shoe = this.add.sprite(260, 132, 'shoe').setScale(0.59);
        this.shoe.depth = 1.2;
        this.shoe.setInteractive({
            draggable: true,
            useHandCursor: true
        });

        this.shoe.on('pointerover', function(pointer) {
            this.setScale(0.65);
        });

        this.shoe.on('pointerout', function(pointer) {
            this.setScale(0.59);
        })

        this.shoe.on('drag', (pointer, dragX, dragY) => {       //actually move the shoe sprite
            this.shoe.x = dragX;
            this.shoe.y = dragY;
        });

        this.shoe.on('drop', (pointer, target) => {  
            if (target.texture.key === 'bag') {
                this.shoe.destroy();
                hasItem[0] = true;
                narrativeText.setText(scriptText.pickUpShoe[0]);
            } else if(target.texture.key === 'noDrop') {        // if they didn't drop it on the inventory bag
                this.returnToLocation(this.shoe);
            }
        });

        this.shoe.visible = false;

        //Inventory end ----------------------------------------------------

        //create frame
        this.frame = this.add.image(0, 0, 'frame').setOrigin(0, 0);
        this.frame.depth = 1;       //the default depth of every object is 0, setting the frame's depth to 1 to always keep it on top

        //get narrative script
        scriptText = this.cache.json.get('json_script');
        this.continueRoute = false;
        this.leaveRoute = false;
        this.continueRoute2 = false;
        this.leaveRoute2 = false;
        this.yesRoute = false;
        this.noRoute = false;

        //create text
        narrativeText = this.add.text(80, 445, scriptText.crossroad[0], wordConfig);

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
               this.scene.start('grottoScene');
           },
           onCompleteScope: this
       });
       this.endTransition_right.pause();

       this.grottoTransition = false;

       this.fade = this.add.sprite(0, 0, 'fade').setOrigin(0,0);
       this.fade.depth = 3;
       this.fade.alpha = 0;
       this.fadeAway = this.tweens.add({
            targets: this.fade,
            alpha: 1,
            duration: 1000,
            onStart: function() {
                keySpace.enabled = false;
                
            },
            onComplete: function() {
                resetGame();
                this.scene.start('gameOverScene');
                
                keySpace.enabled = true;
            },
            onCompleteScope: this
        });  
        this.fadeAway.pause();

        this.fadeTransition = false;

    }

    update() {

        if(!finishCrossroadNarrative[0]) {     //enter first narrative flag check to start the game; these are to stop it from updating the narrative text to the corresponding flag all the time
            this.getNextLine(scriptText.crossroad);
        } else {                //finish first part narrative and reach choices
            if(hasItem[0]){     //if players pick up the item(shoe)
                if(!finishItemNarrative[0]){     //enter shoe narrative 
                    this.button_continue.visible = false;
                    this.button_leave.visible = false;
                    this.getNextLine(scriptText.pickUpShoe);
                }
            } else if(!hasItem[0] && pickingChoice(this.leaveRoute, this.continueRoute)){
                this.shoe.input.draggable = true;
            } 

            if(pickingChoice(this.leaveRoute, this.continueRoute)){     //Makes sure players can't go back to the beginning of this flag
                               
                this.button_continue.on('pointerdown', function (pointer) {
                    this.continueRoute = true;      //branch flag
                    narrativeText.setText(scriptText.crossroad_continue[0]);
                    destroyChoiceButtons(this.button_continue, this.button_leave);
                    this.placeImage = this.add.image(0, 0, 'tower').setOrigin(0, 0);
                }, this);

                this.button_leave.on('pointerdown', function(pointer) {
                    this.leaveRoute = true;     //branch flag
                    narrativeText.setText(scriptText.crossroad_leave[0]);
                    destroyChoiceButtons(this.button_continue, this.button_leave);
                }, this);
                
            } else {
                if(!hasItem[0]){            //if players chose a route without picking up the shoe(need revising)
                    this.shoe.destroy();
                }
            }

            if(!finishCrossroadNarrative[2]){      //enter second narrative flag check
                if(this.continueRoute) {
                    this.getNextLine(scriptText.crossroad_continue);
                } else if (this.leaveRoute) {
                    this.getNextLine(scriptText.crossroad_leave);
                }
            } else {                      //finish second narrative flag, return to main narrative if available
                if(this.continueRoute) {

                    this.button_continue2.on('pointerdown', function (pointer) {
                        this.continueRoute2 = true;      //branch flag
                        narrativeText.setText(scriptText.crossroad_fog[0]);
                        destroyChoiceButtons(this.button_continue2, this.button_leave2);
                        this.placeImage = this.add.image(0, 0, 'towerFog').setOrigin(0, 0);
                    }, this);
    
                    this.button_leave2.on('pointerdown', function(pointer) {
                        this.leaveRoute2 = true;     //branch flag
                        narrativeText.setText(scriptText.crossroad_leave[0]);
                        destroyChoiceButtons(this.button_continue2, this.button_leave2);
                    }, this);

                    if(!finishCrossroadNarrative[3]){
                        if(this.continueRoute2) {
                            this.getNextLine(scriptText.crossroad_fog);
                        } else if (this.leaveRoute2) {
                            this.getNextLine(scriptText.crossroad_leave);
                        }
                        
                    } else {
                        if(this.continueRoute2) {
                            if(!this.checkPocket){          //before players click on bag
                                this.bagShake.play();
                                this.checkPocketNarrative = true;
                            }

                            if(this.checkPocket == true && !finishCrossroadNarrative[4]){            //after players click on pocket
                                this.bag.setAngle(0);
                                this.getNextLine(scriptText.pocket);
                            } else {
                                this.button_yes.on('pointerdown', function (pointer) {
                                    this.yesRoute = true;      //branch flag
                                    narrativeText.setText(scriptText.pocket_yes[0]);
                                    destroyChoiceButtons(this.button_yes, this.button_no);
                                }, this);
                
                                this.button_no.on('pointerdown', function(pointer) {
                                    this.noRoute = true;     //branch flag
                                    narrativeText.setText(scriptText.pocket_no[0]);
                                    destroyChoiceButtons(this.button_yes, this.button_no);
                                }, this);

                                if(!finishCrossroadNarrative[5]){
                                    if(this.yesRoute) {
                                        this.getNextLine(scriptText.pocket_yes);
                                    } else if (this.noRoute) {
                                        this.getNextLine(scriptText.pocket_no);
                                    }
                                } else {
                                    if(Phaser.Input.Keyboard.JustDown(keySpace)) {
                                        if(!this.grottoTransition) {
                                            narrativeText.setText("You wander in the fog.");
                                            this.fog_left.visible = true;
                                            this.fog_right.visible = true;
                                            this.endTransition_left.play();
                                            this.endTransition_right.play();
                                            this.grottoTransition = true;
                                        }

                                    }
                                }

                            }

                        } else if(this.leaveRoute2) {
                            if(Phaser.Input.Keyboard.JustDown(keySpace)) {
                                this.gameOver();
                            }
                        }
                    }

                } else if (this.leaveRoute) {
                    if(Phaser.Input.Keyboard.JustDown(keySpace)) {
                        this.gameOver();
                    }
                }
            }
        }

    }

    //Functions---------------------------------------------------

    //Goes through each line of the narrative from the arrays in the script.json file
    getNextLine(target) {     
        if(Phaser.Input.Keyboard.JustDown(keySpace) && nextLine < target.length){
            console.log("nextLine is " + nextLine);
            narrativeText.setText(target[nextLine]);
            sfx_pencil.play();
            nextLine++;

        }

        //to add the shoe object
        if(!finishCrossroadNarrative[0] && nextLine == 4 && !hasItem[0]){                        
            this.shoe.visible = true;
            this.shoe.input.draggable = false;    // so players won't be able to drag it until a certain scene
        }

        //when it reaches the end of the array
        if (nextLine == target.length){

            if(!this.checkItemNarrative(target)){       //if it's a flag narrative
                finishCrossroadNarrative[finishCrossroadIndex] = true;
                finishCrossroadIndex++;
            }

            //reset to the beginning of the line
            nextLine = 1;

            //to display choices, probably need to do it for every branch
            if(finishCrossroadNarrative[0] && pickingChoice(this.leaveRoute, this.continueRoute) && hasItem[0]) { 
                showChoiceButtons(this.button_continue, this.button_leave);
            } 
            if(finishCrossroadNarrative[2] && pickingChoice(this.leaveRoute2, this.continueRoute2) && this.continueRoute){
                showChoiceButtons(this.button_continue2, this.button_leave2);
            }
            if(finishCrossroadNarrative[4] && pickingChoice(this.yesRoute, this.noRoute) && this.continueRoute) {
                showChoiceButtons(this.button_yes, this.button_no);
            }

            //check  if player gets an item/read an item narrative; need to update this everytime
            if(hasItem[0]){
                finishItemNarrative[0] = true;
            }
        }

    }

    //returns target back to where it was before dragging
    returnToLocation(target) {
        target.setPosition(target.input.dragStartX, target.input.dragStartY);
    }

    //checks if target is an item narrative or not;to prevent item narrative texts from messing up the finishCrossroadNarrative/flag array
    checkItemNarrative(target) {
       return false;
    }

    gameOver() {
        if(!this.fadeTransition) {
            this.fadeAway.play();
            this.fadeTransition = true;
        }
    }

}
