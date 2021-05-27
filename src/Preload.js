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
        this.load.image('vignette', './assets/vignette_shrinked.png');
        
        //grotto temp art assets
        this.load.image('grotto', './assets/grottoTemp.png');
        this.load.image('livingRoom', './assets/livingRoom_shrinked.png');

        //area to define non droppable zone
        this.load.image('noDrop', './assets/nonDropZone.png');

        //sound
        this.load.audio('bgm_1', './assets/bgm_1.mp3');
        this.load.audio('sfx_pencil', './assets/pencilscratch2.mp3');

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
        this.load.image('punch', './assets/choices/choice_punch.png');
        this.load.image('sit', './assets/choices/choice_sit.png');
        this.load.image('move', './assets/choices/choice_move.png');  
        this.load.image('youPickHerUp', './assets/choices/choice_youPickHerUp.png');
        this.load.image('shit', './assets/choices/choice_shit.png');
        this.load.image('breathe', './assets/choices/choice_breathe.png');
        this.load.image('yell1', './assets/choices/choice_yell1.png');
        this.load.image('dots', './assets/choices/choice_dots.png');
        this.load.image('talkingDots', './assets/choices/choice_talkingDots.png');
        this.load.image('imSorry', './assets/choices/choice_imSorry.png');
        this.load.image('signUp', './assets/choices/choice_signUp.png');
        this.load.image('yeah', './assets/choices/choice_yeah.png');
        this.load.image('noImSorry', './assets/choices/choice_noImSorry.png');
        this.load.image('sayNothing', './assets/choices/choice_sayNothing.png');
        this.load.image('sayNo', './assets/choices/choice_sayNo.png');
        this.load.image('callLater', './assets/choices/choice_callLater.png');
        this.load.image('findWayOut', './assets/choices/choice_findWayOut.png');
        this.load.image('giveUp', './assets/choices/choice_giveUp.png');
        this.load.image('goBackGrotto', './assets/choices/choice_goBackGrotto.png');

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