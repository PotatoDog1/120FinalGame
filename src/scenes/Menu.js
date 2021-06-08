class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    create() {

        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);

        this.add.image(0, 0, 'menu').setOrigin(0, 0);

        this.fade = this.add.sprite(0, 0, 'fade').setOrigin(0,0);
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
                this.scene.start('creditScene');
                keySpace.enabled = true;
            },
            onCompleteScope: this
        });  
        this.fadeAway.pause();

        this.fadeTransition = false;

        //end transition-------------------------------------------------
        this.fog_left = this.add.sprite(-640, 0, 'fog_left').setOrigin(0, 0);
        this.fog_left.depth = 2;
        this.endTransition_left = this.tweens.add({
            targets: this.fog_left,
            //delay: 1500,
            ease: 'Sine.easeOut',
            duration: 1300,
            x: 0
        });
        this.endTransition_left.pause();
        
        this.fog_right = this.add.sprite(640, 0, 'fog_right').setOrigin(0, 0);
        this.fog_right.depth = 2;
        this.endTransition_right = this.tweens.add({
            targets: this.fog_right,
            //delay: 1500,
            ease: 'Sine.easeOut',
            duration: 1300,
            x: 133,
            completeDelay: 1000,
            onComplete: function() {
                this.scene.start('crossroadScene');

            },
            onCompleteScope: this
        });
        this.endTransition_right.pause();

        this.grottoTransition = false;
    }

    update() {

        if(Phaser.Input.Keyboard.JustDown(keySpace)) {
            this.goCrossroad();
        }

        if(Phaser.Input.Keyboard.JustDown(keyC)) {
            this.goCredits();
        }
    }

    goCrossroad() {
        if(!this.grottoTransition) {
            this.fog_left.visible = true;
            this.fog_right.visible = true;
            this.endTransition_left.play();
            this.endTransition_right.play();
            this.grottoTransition = true;
        }
    }

    goCredits() {
        if(!this.fadeTransition) {
            this.fadeAway.play();

            this.fadeTransition = true;
        }
    }
}