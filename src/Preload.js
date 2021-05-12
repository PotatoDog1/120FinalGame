class Preload extends Phaser.Scene{
    constructor(){
        super("preloadScene");
    }

    preload() {

        //root frame
        this.load.image('temp_frame', './assets/temp_frame.png');
    
    }

    create() {
        
        this.scene.start("menuScene");

    }
}