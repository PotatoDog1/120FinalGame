class Grotto extends Phaser.Scene {
    constructor() {
        super("grottoScene");
    }

    create() {

        //define keys
        keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.add.text(30, game.config.height/2, 'You are in the grotto now', menuConfig);

        //transition -----------------------------------------------------
        this.fog_left = this.add.sprite(0, 0, 'fog_left').setOrigin(0, 0);
        this.fog_left.depth = 2;
        this.transition_left = this.tweens.add({
            targets: this.fog_left,
            delay: 500,
            ease: 'Sine.easeOut',
            duration: 1500,
            x: -521
        });
        this.fog_right = this.add.sprite(165, 0, 'fog_right').setOrigin(0, 0);
        this.fog_right.depth = 2;
        this.transition_right = this.tweens.add({
            targets: this.fog_right,
            delay: 500,
            ease: 'Sine.easeOut',
            duration: 1500,
            x: 640,
        });

    }

    update() {

        if (Phaser.Input.Keyboard.JustDown(keyQ)) {
            this.scene.start('crossroadScene');
        }

    }
}