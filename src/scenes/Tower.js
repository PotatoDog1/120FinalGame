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

        if(anger > 4) {
            narrativeText = this.add.text(80, 445, scriptText.tower_base_angry4[0], wordConfig);
        } else if (anger >= 3) {
            narrativeText = this.add.text(80, 445, scriptText.tower_base_angry3[0], wordConfig);
        } else if (anger <= 2 && anger > 0) {
            narrativeText = this.add.text(80, 445, scriptText.tower_base_angry2[0], wordConfig);
        } else if (stifled >= 3) {
            narrativeText = this.add.text(80, 445, scriptText.tower_base_stifled3[0], wordConfig);
        } else if (stifled <= 2 && stifled > 0) {
            narrativeText = this.add.text(80, 445, scriptText.tower_base_stifled2[0], wordConfig);
        } else if (stifled == 0 && anger == 0) {
            narrativeText = this.add.text(80, 445, "You have finally reached your destination.", wordConfig);
        }
        //

        this.button_openDoor = this.add.sprite(80, 527, 'openDoor').setOrigin(0,0).setInteractive({useHandCursor: true});

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
            duration: 1500,
            x: -521,
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
        if(!finishTowerNarrative[0]) {
            if(anger > 4) {
                this.emotionText = true;
                this.getNextLine(scriptText.tower_base_angry4);
            } else if (anger >= 3) {
                this.emotionText = true;
                this.getNextLine(scriptText.tower_base_angry3);
            } else if (anger <= 2 && anger > 0) {
                this.emotionText = true;
                this.getNextLine(scriptText.tower_base_angry2);
            } else if (stifled >= 3) {
                this.emotionText = true;
                this.getNextLine(scriptText.tower_base_stifled3);
            } else if (stifled <= 2 && stifled > 0) {
                this.emotionText = true;
                this.getNextLine(scriptText.tower_base_stifled2);
            } else if (stifled == 0 && anger == 0) {
                this.emotionText = true;
                finishTowerNarrative[finishTowerIndex] = true;
                finishTowerIndex++;
                console.log(finishTowerIndex);
            }
        } else {
            if(!finishTowerNarrative[1]) {
                //this.getNextLine(scriptText.tower_base);
                if(this.emotionText) {
                    this.getNextLine(scriptText.tower_base, true);
                }
            } else {
    
                this.button_openDoor.on('pointerdown', function (pointer) {
                    //console.log("anger is " + anger + " and stifled is " + stifled);
                    if(anger > 2 || stifled > 2) {
                        this.badEndRoute = true;      //branch flag
                        this.placeImage = this.add.image(0, 0, 'stairs').setOrigin(0, 0);
                        narrativeText.setText(scriptText.badEnding[0]);
    
                    } else if (anger <= 2 && anger > 0 && stifled <= 2 && stifled > 0){
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

        //interactive object check


        //when it reaches the end of the array
        if (nextLine == target.length){

            //reset to the beginning of the line
            nextLine = 1;
            firstTimer = true;

            if(!this.checkItemNarrative(target)) {       //if it's a flag narrative
                finishTowerNarrative[finishTowerIndex] = true;
                finishTowerIndex++;
            } else if (this.checkInteractiveNarrative(target)) {
                interactveNarrartive[i] = true;
                interactiveIndex++;
            }

            //display choices
            if(finishTowerNarrative[1]) {
                if(pickingChoice(this.goodEndRoute, this.badEndRoute, this.neutralEndRoute)) {
                    showChoiceButtons(this.button_openDoor);
                }
            }

        }

    }

    checkItemNarrative(target) {
       return false;
    }

}