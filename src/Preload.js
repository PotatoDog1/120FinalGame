class Preload extends Phaser.Scene{
    constructor(){
        super("preloadScene");
    }

    preload() {

        //crossroad temp art assets
        this.load.image('frame', './assets/temp_frame.png');
        this.load.image('bg_notepad', './assets/notepad.png');
        this.load.image('crossroad', './assets/temp_crossroads.png');
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

        //bridge art assets
        this.load.image('bridge', './assets/bridge_v2.png');
        this.load.image('item_bridge', './assets/item_bridge.png');
        this.load.image('garage', './assets/GarageTemp.png');

        //tower art assets
        this.load.image('stairs', './assets/stairsTemp.png');
        this.load.image('goodend', './assets/goodend.png');
        this.load.image('neutralend', './assets/neutralend.png');

        //area to define non droppable zone
        this.load.image('noDrop', './assets/nonDropZone.png');

        //sound
        this.load.audio('bgm_1', './assets/bgm_1.mp3');
        this.load.audio('sfx_pencil', './assets/pencilscratch2.mp3');

        //crossroad choice images
        this.load.image('continue', './assets/choices/choice_continue.png');   
        this.load.image('leave', './assets/choices/choice_leave.png');  
        this.load.image('continue2', './assets/choices/choice_continue2.png');   
        this.load.image('leave2', './assets/choices/choice_leave2.png'); 
        this.load.image('yes', './assets/choices/choice_yes.png'); 
        this.load.image('no', './assets/choices/choice_no.png'); 

        //grotto choice images
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

        //backToGrotto choice images
        this.load.image('findWayOut', './assets/choices/choice_findWayOut.png');
        this.load.image('giveUp', './assets/choices/choice_giveUp.png');
        this.load.image('goBackGrotto', './assets/choices/choice_goBackGrotto.png');

        //beforeBridge choice images
        this.load.image('continueArgue', './assets/choices/choice_continueArgue.png');
        this.load.image('imSorry2', './assets/choices/choice_imSorry2.png');
        this.load.image('argueYes', './assets/choices/choice_argueYes.png');
        this.load.image('argueNo', './assets/choices/choice_argueNo.png');
        this.load.image('takeCar', './assets/choices/choice_takeCar.png');
        
        //bridge choice images
        this.load.image('crossBridge', './assets/choices/choice_crossBridge.png');
        this.load.image('cuss', './assets/choices/choice_cuss.png');
        this.load.image('waitWind', './assets/choices/choice_waitWind.png');
        this.load.image('continueForward', './assets/choices/choice_continueForward.png');
        this.load.image('runAcrossBridge', './assets/choices/choice_runAcrossBridge.png');
        this.load.image('breatheCalm', './assets/choices/choice_breatheCalm.png');
        this.load.image('pause', './assets/choices/choice_pause.png');
        this.load.image('calmDown', './assets/choices/choice_calmDown.png');
        this.load.image('continueTower', './assets/choices/choice_continueTower.png');

        //tower choice images
        this.load.image('openDoor', './assets/choices/choice_openDoor.png');

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