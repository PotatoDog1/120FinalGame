class Grotto extends Phaser.Scene {
    constructor() {
        super("grottoScene");
    }

    create() {

        //define keys
        keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //add bgm
        main_bgm = this.sound.add('bgm_1', { volume: 0.3 });
        main_bgm.play({ loop: true });

        //add temp art assets
        this.add.rectangle(0, 0, game.config.width, game.config.height, 0x575757).setOrigin(0, 0);
        this.add.image(0, 400, 'bg_notepad').setOrigin(0,0);
        this.placeImage = this.add.image(0, 0, 'grotto').setOrigin(0, 0);
        this.portrait = this.add.image(515, 160, 'portrait').setScale(1.15);
        
        //breathing portrait animation
        this.tweens.add({
            targets: [this.portrait],
            scale: {from: 1.17, to: 1.15},
            duration: 830,
            yoyo: true,
            repeat: -1
        });

        // scribbling animation
        let scribble = this.add.sprite(410, 65, 'scribble').setOrigin(0, 0);
        scribble.setScale(.10);
        scribble.anims.play('scribbling');

        //narrative 
        scriptText = this.cache.json.get('json_script');

        //Inventory related ----------------------------------------------------

        //inventory bag
        this.bag = this.add.sprite(509, 327, 'bag').setOrigin(0.5, 0.5);
        this.bag.setInteractive({
            dropZone: true,
            useHandCursor: true
        });

        //when pointer is over the bag, it will scale up, if not it will scale down
        this.bag.on('pointerover', function(pointer) {
            this.setScale(1.1);
        });

        this.bag.on('pointerout', function(pointer) {
            this.setScale(1);
        })

        //nodrop zone image
        this.noDropZone = this.add.sprite(0, 0, 'noDrop').setOrigin(0, 0);
        this.noDropZone.depth = -0.5;       //to hide it from players
        this.noDropZone.setInteractive({
            dropZone: true
        })

        //Inventory end ----------------------------------------------------

        narrativeText = this.add.text(80, 445, scriptText.grotto[0], wordConfig);

        //create frame
        this.frame = this.add.image(0, 0, 'frame').setOrigin(0, 0);
        this.frame.depth = 1;

        //transition -----------------------------------------------------
        this.fog_left = this.add.sprite(0, 0, 'fog_left').setOrigin(0, 0);
        this.fog_left.depth = 2;
        this.transition_left = this.tweens.add({
            targets: this.fog_left,
            delay: 500,
            ease: 'Sine.easeOut',
            duration: 1500,
            x: -521,
            onComplete: function() {
                this.fog_left.destroy();
            },
            onCompleteScope: this
        });
        
        this.fog_right = this.add.sprite(165, 0, 'fog_right').setOrigin(0, 0);
        this.fog_right.depth = 2;
        this.transition_right = this.tweens.add({
            targets: this.fog_right,
            delay: 500,
            ease: 'Sine.easeOut',
            duration: 1500,
            x: 640,
            onComplete: function() {
                this.fog_right.destroy();
            },
            onCompleteScope: this
        });

    }

    update() {

        if (Phaser.Input.Keyboard.JustDown(keyW)) {
            this.scene.start('crossroadScene');
        }

    }
}