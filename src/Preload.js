class Preload extends Phaser.Scene{
    constructor(){
        super("preloadScene");
    }

    preload() {

        //root frame
        this.load.image('frame', './assets/temp_frame.png');
        this.load.image('bg_notepad', './assets/notepad.png');
        this.load.image('crossroad', './assets/temp_crossroad.png');

        /*

        idea on how to load and read large amount of text:
        1. do it manually for each line - time consuming and very not efficient, but works
        2. use an array or 2D array to save all lines, will be more efficient and easier to organize
            example for this: https://phaser.io/examples/v2/text/display-text-word-by-word
        3. somehow do it with json? I feel like there is a way to do it but idk how lmao

        */
    
    }

    create() {
        
        this.scene.start("menuScene");

    }
}