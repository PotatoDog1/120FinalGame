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

        //sound
        this.load.audio('bgm_1', './assets/bgm_1.mp3');

        //choice images
        this.load.image('continue', './assets/choices/choice_continue.png');   
        this.load.image('leave', './assets/choices/choice_leave.png');     

        //json scripts
        this.load.json('jsonData', 'assets/test.json'); //testing json
        this.load.json('json_script', 'assets/script.json'); // actual script

    }

    create() {
        console.log('you are in preload meow uwu');
        this.scene.start("menuScene");

    }
}