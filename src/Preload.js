class Preload extends Phaser.Scene{
    constructor(){
        super("preloadScene");
    }

    preload() {

        //temp art assets
        this.load.image('frame', './assets/temp_frame.png');
        this.load.image('bg_notepad', './assets/notepad.png');
        this.load.image('crossroad', './assets/temp_crossroad.png');
        this.load.image('portrait', './assets/portraitTemp_shrinked.png');
        this.load.image('tower', './assets/towerTemp.png');
        this.load.image('shoe', './assets/shoe.png');
        this.load.image('bag', './assets/inventoryTemp.png');

        //area to define non droppable zone
        this.load.image('noDrop', './assets/nonDropZone.png');

        //sound
        this.load.audio('bgm_1', './assets/bgm_1.mp3');

        //choice images
        this.load.image('continue', './assets/choices/choice_continue.png');   
        this.load.image('leave', './assets/choices/choice_leave.png');     

        //json scripts
        // this.load.json('jsonData', 'assets/test.json'); //testing json
        this.load.json('json_script', 'assets/script.json'); // actual script

        // scribbling animation texture atlas
        this.load.atlas('scribble', './assets/spritesheet.png', './assets/sprites.json');
    }

    create() {
        console.log('you are in preload meow uwu');
        // scribbling animation
        this.anims.create({
            key: 'scribbling',
            frames: this.anims.generateFrameNames('scribble', { 
                start: 0,
                end: 4,
                prefix: 'scribble',
                zeroPad: 4    
            }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'scribblingFaster',
            frames: this.anims.generateFrameNames('scribble', { 
                start: 0,
                end: 4,
                prefix: 'scribble',
                zeroPad: 4    
            }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'scribblingFastest',
            frames: this.anims.generateFrameNames('scribble', { 
                start: 0,
                end: 4,
                prefix: 'scribble',
                zeroPad: 4    
            }),
            frameRate: 12,
            repeat: -1
        });

        this.scene.start("menuScene");

    }
}