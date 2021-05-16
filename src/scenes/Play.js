class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    create() {
    
        console.log("You are in Play.js meow");

        //mouse for future inventory use
        this.mouse = this.input.activePointer;

        //debug keys
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
        this.button_continue = this.add.image(80, 490, 'continue').setOrigin(0,0);
        this.button_leave = this.add.image(80, 527, 'leave').setOrigin(0,0);
        this.button_continue.visible = false;
        this.button_leave.visible = false;

        // scribbling animation
        let scribble = this.add.sprite(410, 65, 'scribble').setOrigin(0, 0);
        scribble.setScale(.10);
        scribble.anims.play('scribbling');
        console.log('scribbling!');

        //Inventory related ----------------------------------------------------

        //inventory bag; set it as a dropzone
        this.bag = this.add.sprite(370, 255, 'bag').setOrigin(0, 0);
        this.bag.setInteractive({
            dropZone: true
        });

        //nodrop zone
        this.noDropZone = this.add.sprite(0, 0, 'noDrop').setOrigin(0, 0);
        this.noDropZone.depth = -0.5; //to hide it from players
        this.noDropZone.setInteractive({
            dropZone: true
        })

        //interactive shoe
        this.shoe = this.add.sprite(80, 0, 'shoe').setOrigin(0, 0);
        this.shoe.depth = 1.5;
        this.shoe.setInteractive({
            draggable: true,
            useHandCursor: true
        });

        this.shoe.on('drag', (pointer, dragX, dragY) => { //actually move the sprite
            this.shoe.x = dragX;
            this.shoe.y = dragY;
        });

        this.shoe.on('drop', (pointer, target) => {  
            if (target.texture.key === 'bag') {           // if they drop it on the inventory, it will disappear
                this.shoe.destroy();
                withShoe = true;
                narrativeText.setText(scriptText.pickUpShoe[0]);
            } else if(target.texture.key === 'noDrop') {  // if they didn't drop it on the inventory
                this.returnToLocation(this.shoe);
            }
        });

        this.shoe.visible = false;


        //create frame
        this.frame = this.add.image(0, 0, 'frame').setOrigin(0, 0);
        this.frame.depth = 1; //the default depth of every object is 0, setting the frame's depth to 1 to always keep it on top

        //get script
        scriptText = this.cache.json.get('json_script');
        this.continueRoute = false;
        this.leaveRoute = false;

        //create text
        narrativeText = this.add.text(80, 445, scriptText.crossroad1[0], wordConfig);

    }

    update() {

        if(!checkDone[0]) {     //first narrative flag check to start the game; these are to stop it keep updating the narrative text to the corresponding flag
            this.getNextLine(scriptText.crossroad1);
        } else {

            if(withShoe){
                if(!shoeDone){
                    this.button_continue.visible = false;
                    this.button_leave.visible = false;
                    this.getNextLine(scriptText.pickUpShoe);
                }

            }else if(!withShoe && !this.leaveRoute && !this.continueRoute){
                this.shoe.input.draggable = true;
            }

            if(Phaser.Input.Keyboard.JustDown(keyRight) && !this.leaveRoute && !this.continueRoute) { // second part is to make sure players can't go back to the beginning of this flag
                //continue into the forest route
                this.continueRoute = true;      //branch flag
                narrativeText.setText(scriptText.crossroad1_continue[0]);
                this.button_continue.destroy();
                this.button_leave.destroy();
                if(!withShoe){
                    this.shoe.destroy();
                }
                this.placeImage = this.add.image(0, 0, 'tower').setOrigin(0, 0);
            } else if(Phaser.Input.Keyboard.JustDown(keyLeft) && !this.continueRoute && !this.leaveRoute) {  // second part is to make sure players can't go back to the beginning of this flag
                //leave forest route
                this.leaveRoute = true;     //branch flag
                narrativeText.setText(scriptText.crossroad1_leave[0]);
                this.button_continue.destroy();
                this.button_leave.destroy();

                if(!withShoe){
                    this.shoe.destroy();
                }
            }

            if(!checkDone[1]){      //second narrative flag check
                if(this.continueRoute) {
                    this.getNextLine(scriptText.crossroad1_continue);
                } else if (this.leaveRoute) {
                    this.getNextLine(scriptText.crossroad1_leave);
                }
            }
        }

        if(keyQ.isDown) {
            for(var i = 0; i < checkDone.length; i++){      //to loop through the narrative flag array and reset them all to false
                checkDone[i] = false;
                console.log("looping through checkDone. Finished " + i + " time, " + i + " is " + checkDone[i]);
            }
            checkDoneIndex = 0;     //to reset narrative to the beginning flag
            nextLine = 1;           //to reset narrative to the beginning line
            main_bgm.stop();        //to stop game bgm when they come back to menu
            this.scene.start('menuScene');
        }


    }

    //Functions---------------------------------------------------

    //this is for going through each line of the narrative from the arrays in the script.json file
    getNextLine(target) {     
        if(Phaser.Input.Keyboard.JustDown(keySpace) && nextLine < target.length){
            console.log("nextLine is " + nextLine);
            narrativeText.setText(target[nextLine]);
            nextLine++;
        }

        //to add the shoe object
        if(!checkDone[0] && nextLine == 4 && !withShoe){                        
            this.shoe.visible = true;
            this.shoe.input.draggable = false;    // so players won't be able to drag it until a certain scene
        }

        //when it reaches the end of the array
        if (nextLine == target.length){

            if(target != scriptText.pickUpShoe){        //to prevent item narrative texts messing up the checkDone/flag array
                checkDone[checkDoneIndex] = true;
                checkDoneIndex++;
            }

            //reset to the beginning of the line
            nextLine = 1;

            //to display choices, probably need to do it for every branch
            if(checkDone[0] && (!this.leaveRoute && !this.continueRoute)) { 
                this.button_continue.visible = true;
                this.button_leave.visible = true;
            }

            if(withShoe){
                shoeDone = true;
            }
        }

    }

    returnToLocation(target) {
        target.setPosition(target.input.dragStartX, target.input.dragStartY);
    }

}
