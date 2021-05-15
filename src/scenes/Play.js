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

        //create frame
        this.add.image(0, 0, 'frame').setOrigin(0, 0);

        //get script
        scriptText = this.cache.json.get('json_script');
        this.continueRoute = false;
        this.leaveRoute = false;

        //create text
        narrativeText = this.add.text(80, 445, scriptText.crossroad1[0], wordConfig);

    }

    update() {

        if(!checkDone[0]) {     //first narrative flag check; these are to stop it keep updating the narrative text to the corresponding flag
            this.getNextLine(scriptText.crossroad1);
        } else {
            if(Phaser.Input.Keyboard.JustDown(keyLeft)) {
                console.log('pressed left');
                this.continueRoute = true;      //branch flag
            } else if(Phaser.Input.Keyboard.JustDown(keyRight)) {
                console.log('pressed right');
                this.leaveRoute = true;     //branch flag
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
            checkDoneIndex = 0;     //to reset narrative to the beginning
            main_bgm.stop();        //to stop game bgm when they come back to menu
            this.scene.start('menuScene');
        }

    }

    //--------------------------Function 

    //this is for going through each line of the narrative from the arrays in the script.json file
    getNextLine(target) {     
        if(Phaser.Input.Keyboard.JustDown(keySpace) && nextLine < target.length){
            narrativeText.setText(target[nextLine]);
            console.log("nextLine is now at " + nextLine);
            nextLine++;
        }

        if (nextLine == target.length){
            checkDone[checkDoneIndex] = true;
            checkDoneIndex++;
            nextLine = 0;
        }

    }

}
