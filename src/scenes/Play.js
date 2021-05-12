class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    create() {

      console.log("You are in Play.js meow");
      
      //create temp frame
      this.add.image(0, 0, 'temp_frame').setOrigin(0, 0);

    }

}