class Preload extends Phaser.Scene{
    constructor(){
        super("preloadScene");
    }

    preload() {

        //crossroad temp art assets
        this.load.image('frame', './assets/temp_frame.png');
        this.load.image('bg_notepad', './assets/notepad.png');
        this.load.image('crossroad', './assets/temp_crossroad.png');
        this.load.image('portrait', './assets/portrait_shrinked.png');
        this.load.image('tower', './assets/towerTemp.png');
        this.load.image('shoe', './assets/shoe.png');
        this.load.image('bag', './assets/inventoryTemp.png');
        this.load.image('towerFog', './assets/towerFogTemp.png');
        this.load.image('fog_left', './assets/fog_left.png');
        this.load.image('fog_right', './assets/fog_right.png');
        
        //grotto temp art assets
        this.load.image('grotto', './assets/grottoTemp.png');
        this.load.image('livingRoom', './assets/livingRoomTemp.png');

        //area to define non droppable zone
        this.load.image('noDrop', './assets/nonDropZone.png');

        //sound
        this.load.audio('bgm_1', './assets/bgm_1.mp3');

        //choice images
        this.load.image('continue', './assets/choices/choice_continue.png');   
        this.load.image('leave', './assets/choices/choice_leave.png');  
        this.load.image('continue2', './assets/choices/choice_continue2.png');   
        this.load.image('leave2', './assets/choices/choice_leave2.png'); 
        this.load.image('yes', './assets/choices/choice_yes.png'); 
        this.load.image('no', './assets/choices/choice_no.png'); 
        this.load.image('finally', './assets/choices/choice_finally.png'); 
        this.load.image('investigate', './assets/choices/choice_investigate.png');
        this.load.image('movePast', './assets/choices/choice_movePast.png');  

        //json scripts
        this.load.json('json_script', 'assets/script.json'); // actual script

        // scribbling animation texture atlas
        this.load.atlas('scribble', './assets/spritesheet.png', './assets/sprites.json');
    }

    create() {

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

        this.scene.start("menuScene");

    }
}