class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    create() {

      console.log("You are in Play.js meow");

      //mouse
      this.mouse = this.input.activePointer;

      //debug keys
      keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
      keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);

      //add bgm
      main_bgm = this.sound.add('bgm_1', { volume: 0.3 });
      main_bgm.play({ loop: true });

      
      //add temp art assets
      this.add.rectangle(0, 0, game.config.width, game.config.height, 0x575757).setOrigin(0, 0);
      this.add.image(0, 400, 'bg_notepad').setOrigin(0,0);
      this.placeImage = this.add.image(0, 0, 'crossroad').setOrigin(0, 0);

      //create frame
      this.add.image(0, 0, 'frame').setOrigin(0, 0);

      //get script
      scriptText = this.cache.json.get('json_script');

      //create text
      this.narrativeText = this.add.text(80, 445, scriptText.crossroad[0], wordConfig);
      //for some reasons, the handwriting font only shows up after I revisit this scene???


    }

    update() {

      if(Phaser.Input.Keyboard.JustDown(keyA) && nextLine < scriptText.crossroad.length){
        this.narrativeText.setText(scriptText.crossroad[nextLine]);
        nextLine++;
        
      }

      if(keyQ.isDown) {
        nextLine = 1;                  //reset the line to the beginning
        main_bgm.stop();          //to stop game bgm when they come back to menu
        this.scene.start('menuScene');
      }

    }
}