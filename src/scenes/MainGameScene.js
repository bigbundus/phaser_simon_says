import Phaser from 'phaser'

import Button from '../buttons/Button'

export default class MainGameScene extends Phaser.Scene
{
	constructor()
	{
		super('main-game')
	}

	preload()
    {
        this.load.image('game_base', 'simon_says.png')

        this.load.image('red_lit', 'ss_red_lit.png')
        this.load.image('blue_lit', 'ss_blue_lit.png')
        this.load.image('green_lit', 'ss_green_lit.png')
        this.load.image('yellow_lit', 'ss_yellow_lit.png')

        this.load.image('red', 'ss_red_dim.png')
        this.load.image('blue', 'ss_blue_dim.png')
        this.load.image('green', 'ss_green_dim.png')
        this.load.image('yellow', 'ss_yellow_dim.png')
    }

    create()
    {
        const center = {x:400,y:300}
        this.add.image(center.x, center.y, 'game_base')

        const redConfig = {
            scene:this,
            x:center.x,
            y:center.y,
            name:'red'
        }

        const yellowConfig = {
            scene:this,
            x:center.x,
            y:center.y,
            name:'yellow'
        }

        const greenConfig = {
            scene:this,
            x:center.x,
            y:center.y,
            name:'green'
        }

        const blueConfig = {
            scene:this,
            x:center.x,
            y:center.y,
            name:'blue'
        }

        const redButton = new Button(redConfig)
        const yellowButton = new Button(yellowConfig)
        const greenButton = new Button(greenConfig)
        const blueButton = new Button(blueConfig)
    }
}
