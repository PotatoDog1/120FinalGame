class Preload extends Phaser.Scene{
    constructor(){
        super("preloadScene");
    }
    
    preload() {
        
    }

    create() {

        this.scene.start("menuScene");
    }
}