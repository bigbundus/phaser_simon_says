import Phaser from "phaser";

export default class Button extends Phaser.GameObjects.Sprite
{
    constructor(buttonConfig)
    {
        
        super(buttonConfig.scene, buttonConfig.x, buttonConfig.y, buttonConfig.name)
        buttonConfig.scene.add.existing(this);
        this.name = buttonConfig.name;
        this.scene = buttonConfig.scene

        //this.setInteractive(buttonConfig.scene.input.makePixelPerfect());
        this.on('pointerdown', this.clicked, this);
    }

    preload()
    {

    }

    create()
    {
        
    }

    lightUp(blinkTime)
    {
        this.setTexture(this.name + '_lit')

        setTimeout(() => {
            this.setTexture(this.name)
        }, blinkTime);
    }

    clicked()
    {
       this.lightUp(300)
       this.scene.events.emit(this.name + '_clicked')
    }
}