class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    create() {

      console.log("You are in Play.js meow");
      
      //create bg color
      this.add.rectangle(0, 0, game.config.width, game.config.height, 0x575757).setOrigin(0, 0);
      this.add.image(0, 400, 'bg_notepad').setOrigin(0,0);

      //create frame
      this.add.image(0, 0, 'temp_frame').setOrigin(0, 0);

      //create text
      this.narrativeText = this.add.text(95, 445, 'Testing.', wordConfig);


    }

}