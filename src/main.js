import Phaser from 'phaser'

import MainGameScene from './scenes/MainGameScene'

const config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 }
		}
	},
	scene: [MainGameScene]
}

export default new Phaser.Game(config)
