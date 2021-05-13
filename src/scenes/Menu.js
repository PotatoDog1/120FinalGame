class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    create() {

        console.log("You are in Menu.js meow");

        //create pointer
        this.mouse = this.input.activePointer;

        this.add.text(game.config.width/2, game.config.height/2, 'Click to start game.', menuConfig);

        /*  this is for testing
        var testString = this.cache.json.get('jsonData');
        console.log("testString is " + testString.employees[2] + " and the array length is " + testString.employees.length);
        this.add.text(500, 500, testString.employees[0]);
        */

        
    }

    update() {

        if (this.mouse.isDown) {
            this.scene.start('playScene');
        }

    }
}