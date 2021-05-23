class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    create() {

        //define keys
        keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //add bgm
        main_bgm = this.sound.add('bgm_1', { volume: 0.3 });
        main_bgm.play({ loop: true });

        //add temp art assets
        this.add.rectangle(0, 0, game.config.width, game.config.height, 0x575757).setOrigin(0, 0);
        this.add.image(0, 400, 'bg_notepad').setOrigin(0,0);
        this.placeImage = this.add.image(0, 0, 'crossroad').setOrigin(0, 0);
        this.portrait = this.add.image(415, 65, 'portrait').setOrigin(0, 0);
        
        //breathing portrait animation
        this.tweens.add({
            targets: [this.portrait],
            scale: {from: 1.02, to: 1.0},
            duration: 830,
            yoyo: true,
            repeat: -1
        });

        //all choices 
        this.button_continue = this.add.sprite(80, 490, 'continue').setOrigin(0,0).setInteractive({useHandCursor: true});
        this.button_leave = this.add.sprite(80, 527, 'leave').setOrigin(0,0).setInteractive({useHandCursor: true});
        this.button_continue.visible = false;
        this.button_leave.visible = false;

        // scribbling animation
        let scribble = this.add.sprite(410, 65, 'scribble').setOrigin(0, 0);
        scribble.setScale(.10);
        scribble.anims.play('scribbling');

        //Inventory related ----------------------------------------------------

        //inventory bag
        this.bag = this.add.sprite(377, 255, 'bag').setOrigin(0, 0);
        this.bag.setInteractive({
            dropZone: true
        });

        //nodrop zone image
        this.noDropZone = this.add.sprite(0, 0, 'noDrop').setOrigin(0, 0);
        this.noDropZone.depth = -0.5;       //to hide it from players
        this.noDropZone.setInteractive({
            dropZone: true
        })

        this.shoe = this.add.sprite(80, 0, 'shoe').setOrigin(0, 0);
        this.shoe.depth = 1.5;
        this.shoe.setInteractive({
            draggable: true,
            useHandCursor: true
        });

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
        this.fogRoute = false;
        this.firstTimer = true;

        //create text
        narrativeText = this.add.text(80, 445, scriptText.crossroad[0], wordConfig);

    }

    update() {

        if(!finishNarrative[0]) {     //enter first narrative flag check to start the game; these are to stop it from updating the narrative text to the corresponding flag all the time
            this.getNextLine(scriptText.crossroad);
        } else {                //finish first part narrative and reach choices
            if(hasItem[0]){     //if players pick up the item(shoe)
                if(!finishItemNarrative[0]){     //enter shoe narrative 
                    this.button_continue.visible = false;
                    this.button_leave.visible = false;
                    this.getNextLine(scriptText.pickUpShoe);
                }
            } else if(!hasItem[0] && this.pickingChoice1()){
                this.shoe.input.draggable = true;
            } 

            if(this.pickingChoice1()){     //Makes sure players can't go back to the beginning of this flag
                               
                this.button_continue.on('pointerdown', function (pointer) {
                    this.continueRoute = true;      //branch flag
                    narrativeText.setText(scriptText.crossroad_continue[0]);
                    this.destroyChoiceButtons(this.button_continue, this.button_leave);
                    this.placeImage = this.add.image(0, 0, 'tower').setOrigin(0, 0);
                }, this);

                this.button_leave.on('pointerdown', function(pointer) {
                    this.leaveRoute = true;     //branch flag
                    narrativeText.setText(scriptText.crossroad_leave[0]);
                    this.destroyChoiceButtons(this.button_continue, this.button_leave);
                }, this);
                
            } else {
                if(!hasItem[0]){            //if players chose a route without picking up the shoe
                    this.shoe.destroy();
                }
            }

            if(!finishNarrative[2]){      //enter second narrative flag check
                if(this.continueRoute) {
                    this.getNextLine(scriptText.crossroad_continue);
                } else if (this.leaveRoute) {
                    this.getNextLine(scriptText.crossroad_leave);
                }
            } else {                      //finish second narrative flag, return to main narrative if available
                if(this.continueRoute) {
                    if(!finishNarrative[3]){
                        this.placeImage = this.add.image(0,0, 'towerFog').setOrigin(0, 0);
                        narrativeText.setText(scriptText.crossroad_fog[0]);
                    } else {

                    }




                } else if (this.leaveRoute) {
                    if(Phaser.Input.Keyboard.JustDown(keySpace)) {
                        this.resetGame();
                    }
                }
            }
        }

        if(keyQ.isDown) {
            this.resetGame();
        }

    }

    //Functions---------------------------------------------------

    //Goes through each line of the narrative from the arrays in the script.json file
    getNextLine(target) {     
        if(Phaser.Input.Keyboard.JustDown(keySpace) && nextLine < target.length){
            console.log("nextLine is " + nextLine);
            
            /*
            if(this.firstTimer == true){
                nextLine = 0;
                this.firstTimer = false; 
            }
                        
            if(nonStopNarrative[finishNarrativeIndex] == false){
                nextLine = 0;
                nonStopNarrative[finishItemNarrative] == true;
            }
            */

            narrativeText.setText(target[nextLine]);
            nextLine++;

        }

        //to add the shoe object
        if(!finishNarrative[0] && nextLine == 4 && !hasItem[0]){                        
            this.shoe.visible = true;
            this.shoe.input.draggable = false;    // so players won't be able to drag it until a certain scene
        }

        //when it reaches the end of the array
        if (nextLine == target.length){

            //this.firstTimer = true;

            if(!this.checkItemNarrative(target)){       //if it's a flag narrative
                finishNarrative[finishNarrativeIndex] = true;
                finishNarrativeIndex++;
            }

            //reset to the beginning of the line
            nextLine = 1;

            //to display choices, probably need to do it for every branch
            if(finishNarrative[0] && this.pickingChoice1() && hasItem[0]) { 
                this.button_continue.visible = true;
                this.button_leave.visible = true;
            }

            if(hasItem[0]){
                finishItemNarrative[0] = true;
            }
        }

    }

    //returns target back to where it was before dragging
    returnToLocation(target) {
        target.setPosition(target.input.dragStartX, target.input.dragStartY);
    }

    //checks if target is an item narrative or not;to prevent item narrative texts from messing up the finishNarrative/flag array
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

    //checks if players have progressed into flag1 yet
    pickingChoice1() {
        return !this.leaveRoute && !this.continueRoute;
    }

    //destroys choice buttons in one function
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

    //Resets the condition of EVERYTHING
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

        finishNarrativeIndex = 0;     //to reset narrative to the beginning flag
        nextLine = 1;           //to reset narrative to the beginning line
        main_bgm.stop();        //to stop game bgm when they come back to menu
        this.scene.start('menuScene');
    }


}
