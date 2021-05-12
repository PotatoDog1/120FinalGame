class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    create() {

      console.log("You are in Menu.js meow");

      //create pointer
      this.mouse = this.input.activePointer;
      
      
    }

    update() {

        if (this.mouse.isDown) {
            console.log("Going into play scene meow!");
            this.scene.start('playScene');
        }

    }
}