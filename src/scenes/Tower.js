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
        this.placeImage = this.add.image(0, 0, 'baseOfTower').setOrigin(0, 0).setScale(0.96);
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

        this.polaroid = this.add.sprite(0, 0,'polaroid').setOrigin(0,0).setInteractive({
            draggable: true,
            useHandCursor: true
        });
        this.polaroid.visible = false;
        this.polaroid.depth = 1.3;

        this.polaroid_corner = this.add.sprite(193, 190,'polaroid_corner').setInteractive({
            draggable: true,
            useHandCursor: true
        });
        this.polaroid_corner.depth = 1.2;
        this.polaroid_corner.visible = false;
        this.checkItemPolaroidNarrative = false;

        this.polaroid_corner.on('pointerover', function(pointer) {
            this.setScale(1.05);
        });

        this.polaroid_corner.on('pointerout', function(pointer) {
            this.setScale(1.0);
        });

        this.polaroid_corner.on('drag', (pointer,  dragX, dragY) => {
            this.polaroid.visible = true;
            this.polaroid_corner.visible = false;
            this.polaroid.x = dragX;
            this.polaroid.y = dragY;
        });
        
        this.polaroid_corner.on('drop', (pointer, target) => {
            if (target.texture.key === 'bag') {
                this.polaroid.destroy();
                this.polaroid_corner.destroy();
                narrativeText.setText(scriptText.polaroid[0]);
                this.button_openDoor.visible = false;
                hasItem[3] = true;
            } else if(target.texture.key === 'noDrop') {        // if they didn't drop it on the inventory bag
                this.polaroid.visible = false;
                this.polaroid_corner.visible = true;
            }
        });


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

        if(anger >= 7) {
            narrativeText = this.add.text(80, 445, scriptText.tower_base_angry4[0], wordConfig);
        } else if (anger >= 3) {
            narrativeText = this.add.text(80, 445, scriptText.tower_base_angry3[0], wordConfig);
        } else if (anger <= 2 && anger > 0) {
            narrativeText = this.add.text(80, 445, scriptText.tower_base_angry2[0], wordConfig);
        } else if (stifled >= 6) {
            narrativeText = this.add.text(80, 445, scriptText.tower_base_stifled3[0], wordConfig);
        } else if (stifled <= 2 && stifled > 0) {
            narrativeText = this.add.text(80, 445, scriptText.tower_base_stifled2[0], wordConfig);
        } else if (stifled == 0 && anger == 0) {
            narrativeText = this.add.text(80, 445, "You have finally reached your destination.", wordConfig);
        }
        //

        this.button_openDoor = this.add.sprite(80, 490, 'openDoor').setOrigin(0,0).setInteractive({useHandCursor: true});

        this.button_openDoor.visible = false;


        this.emotionText = false;
        this.goodEndRoute = false;
        this.neutralEndRoute = false;
        this.badEndRoute = false;



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
                this.fog_left.destroy();
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
                this.fog_right.destroy();
            },
            onCompleteScope: this
        });


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
        
        

        if(!finishTowerNarrative[0]) {
            if(anger >= 7) {
                this.emotionText = true;
                this.getNextLine(scriptText.tower_base_angry4);
            } else if (anger >= 3) {
                this.emotionText = true;
                this.getNextLine(scriptText.tower_base_angry3);
            } else if (anger <= 2 && anger > 0) {
                this.emotionText = true;
                this.getNextLine(scriptText.tower_base_angry2);
            } else if (stifled >= 6) {
                this.emotionText = true;
                this.getNextLine(scriptText.tower_base_stifled3);
            } else if (stifled <= 5 && stifled > 0) {
                this.emotionText = true;
                this.getNextLine(scriptText.tower_base_stifled2);
            } else if (stifled == 0 && anger == 0) {
                this.emotionText = true;
                finishTowerNarrative[finishTowerIndex] = true;
                finishTowerIndex++;
            }
        } else {

            if(!finishTowerNarrative[1]) {
                //this.getNextLine(scriptText.tower_base);
                if(this.emotionText) {
                    this.getNextLine(scriptText.tower_base, true);
                }
            } else {

                // polaroid item
                if(!hasItem[3] && pickingChoice(this.badEndRoute, this.neutralEndRoute, this.goodEndRoute)) {
                    this.checkItemPolaroidNarrative = true;
                }

                if(hasItem[3] && !finishItemNarrative[3] && this.checkItemPolaroidNarrative) {
                    this.getNextLine(scriptText.polaroid);
                }
    
                this.button_openDoor.on('pointerdown', function (pointer) {
                    //console.log("anger is " + anger + " and stifled is " + stifled);
                    if(anger > 4 || stifled > 3) {
                        this.badEndRoute = true;      //branch flag
                        this.placeImage = this.add.image(0, 0, 'stairs').setOrigin(0, 0);
                        narrativeText.setText(scriptText.badEnding[0]);
    
                    } else if (anger <= 4 && anger > 0 && stifled <= 3 && stifled > 0){
                        this.neutralEndRoute = true;
                        this.placeImage = this.add.image(0, 0, 'neutralend').setOrigin(0,0).setScale(0.96);
                        narrativeText.setText(scriptText.neutralEnding[0]);
                    } else if (anger == 0 && stifled == 0) {
                        this.goodEndRoute = true;      //branch flag
                        this.placeImage = this.add.image(0, 0, 'goodend').setOrigin(0,0).setScale(0.96);
                        narrativeText.setText(scriptText.goodEnding[0]);
                    }
    
                    destroyChoiceButtons(this.button_openDoor);
                }, this);
    
    
                if(!finishTowerNarrative[2]) {
                    if(this.badEndRoute) {
                        this.getNextLine(scriptText.badEnding);
                    } else if (this.neutralEndRoute) {
                        this.getNextLine(scriptText.neutralEnding);
                    } else if (this.goodEndRoute) {
                        this.getNextLine(scriptText.goodEnding);
                    }
                } else {
                    if(this.goodEndRoute || this.badEndRoute || this.neutralEndRoute) {
                        if(Phaser.Input.Keyboard.JustDown(keySpace)) {
                            resetGame();
                            this.scene.start('menuScene');
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

        //to add the notebook
        if(finishTowerNarrative[0] && !finishTowerNarrative[1] && nextLine == 4 && !finishItemNarrative[3]) {
            this.polaroid_corner.visible = true;
            this.polaroid_corner.input.draggable = false;
        }

        //when it reaches the end of the array
        if (nextLine == target.length){

            //reset to the beginning of the line
            nextLine = 1;
            firstTimer = true;


            if(this.checkItemNarrative(target)) {
                finishItemNarrative[3] = true;      //polaroid
                this.checkItemPolaroidNarrative = false;
            } else {                                //if it's a flag narrative
                finishTowerNarrative[finishTowerIndex] = true;
                finishTowerIndex++;
            }

            //display choices
            if(finishTowerNarrative[1]) {
                if(pickingChoice(this.goodEndRoute, this.badEndRoute, this.neutralEndRoute)) {
                    showChoiceButtons(this.button_openDoor);
                }
                if(!hasItem[3]) {
                    this.polaroid_corner.input.draggable = true;
                }
            }

        }

    }

    checkItemNarrative(target) {
        if(target === scriptText.polaroid) {
            return true;
        } else {
            return false;
        }
    }

}