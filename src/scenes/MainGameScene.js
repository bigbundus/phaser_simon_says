import Phaser from 'phaser'

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
    }

    create()
    {
        this.add.image(300, 300, 'game_base')
        this.add.image(300, 300, 'red_lit')
    }
}
