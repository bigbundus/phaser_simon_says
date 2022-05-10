import Phaser from "phaser";

export default class Button extends Phaser.GameObjects.Sprite
{
    constructor(buttonConfig)
    {
        super(buttonConfig.scene, buttonConfig.x, buttonConfig.y, buttonConfig.name)
        buttonConfig.scene.add.existing(this);
        this.name = buttonConfig.name;

        this.setInteractive(buttonConfig.scene.input.makePixelPerfect());
        this.on('pointerdown', this.clicked, this);
    }

    preload()
    {

    }

    create()
    {
        
    }

    lightUp()
    {
        this.setTexture(this.name + '_lit')

        setTimeout(() => {
            this.setTexture(this.name)
        }, 200);
    }

    clicked()
    {
       this.lightUp()
    }
}