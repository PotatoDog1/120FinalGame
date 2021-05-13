class Preload extends Phaser.Scene{
    constructor(){
        super("preloadScene");
    }

    preload() {

        //root frame
        this.load.image('frame', './assets/temp_frame.png');
        this.load.image('bg_notepad', './assets/notepad.png');
        this.load.image('crossroad', './assets/temp_crossroad.png');

        //sound
        this.load.audio('bgm_1', './assets/bgm_1.mp3');

        //json scripts
        this.load.json('jsonData', 'assets/test.json'); //testing json
        this.load.json('json_script', 'assets/script.json'); // actual script
    }

    create() {
        console.log('you are in preload meow uwu');
        this.scene.start("menuScene");

    }
}