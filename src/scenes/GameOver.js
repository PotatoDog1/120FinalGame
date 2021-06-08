class GameOver extends Phaser.Scene {
    constructor() {
        super("gameOverScene");
    }

    create() {

        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.add.image(0, 0, 'gameover').setOrigin(0, 0);

        this.fade = this.add.sprite(0, 0, 'fade').setOrigin(0, 0);
        this.fade.depth = 3;

        this.tweens.add({
            targets: this.fade,
            alpha: 0,
            duration: 1000,
            onStart: function() {
                keySpace.enabled = false;
            },
            onComplete: function() {
                keySpace.enabled = true;
            }
        });  

        this.fadeAway = this.tweens.add({
            targets: this.fade,
            alpha: 1,
            duration: 1000,
            onStart: function() {
                keySpace.enabled = false;
            },
            onComplete: function() {
                this.scene.start('menuScene');
                keySpace.enabled = true;
            },
            onCompleteScope: this
        });  
        this.fadeAway.pause();

        this.fadeTransition = false;
    }

    update() {

        if(Phaser.Input.Keyboard.JustDown(keySpace)) {
            resetGame();
            this.goMenu();
        }

    }

    goMenu() {
        if(!this.fadeTransition) {
            this.fadeAway.play();
            this.fadeTransition = true;
        }
    }
}