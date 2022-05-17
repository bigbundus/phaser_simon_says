import { Sleeping } from 'matter'
import Phaser from 'phaser'

import Button from '../buttons/Button'

const MODES = {
    0: 'GAME_OVER',
    1: 'PLAYING_SEQUENCE',
    2: 'PLAYER_SELECTING',
    3: 'N_SELECT'
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

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

        const buttonNames = ['red', 'blue', 'green', 'yellow']
        this.buttons = buttonNames.map((name) => {
            const redConfig = {
                scene:this,
                x:center.x,
                y:center.y,
                name:name
            }

            return new Button(redConfig)  
        });

        this.sampleSequence = [1,0,3,2,0,1,1,3,0,2,1,2]
        this.currentSequence = []

        this.playerSelectionSequence = []

        this.lightUpDelay = 800
        this.timer = 0
        this.currentButton = -1

        this.mode = MODES[0]

        this.addNewGameText()

        this.events.on('red_clicked', () => this.playerSelectionSequence.push(0), this)
        this.events.on('blue_clicked', () => this.playerSelectionSequence.push(1), this)
        this.events.on('green_clicked', () => this.playerSelectionSequence.push(2), this)
        this.events.on('yellow_clicked', () => this.playerSelectionSequence.push(3), this)
        
    }

    startNewGame()
    {
        console.log('new game')
        this.newGameText.destroy()
        
        const z = getRandomInt(4)
        this.currentSequence.push(z)

        this.mode = MODES[1]
        console.log('entering sequence play mode')
    }

    enterPlayerSelectMode()
    {
        console.log('entering player select mode')
        this.mode = MODES[2]
        this.buttons.map((button) => button.setInteractive(this.input.makePixelPerfect()))
    }

    enterSeqPlayMode()
    {
        console.log('entering seq play mode')
        this.buttons.map((button) => button.setInteractive(false))
        this.mode = MODES[1]
        // setTimeout(() => {
        //     this.mode = MODES[1]
        // }, 800);
    }

    addNewGameText()
    {
        // Create new game text
        // then delete it when clicked and change the mode

        this.newGameText = this.add.text(350, 250, ['New', 'Game'], 
            { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
            fontSize:'36px' });
        this.newGameText.setInteractive()

        this.newGameText.on('pointerdown', () => {
            this.startNewGame()
        })
    }



    playSeqUpdate(delta)
    {
        this.timer += delta
        if (this.timer > this.lightUpDelay)
        {
            
            this.currentButton += 1
            this.timer = 0

            if (this.currentButton >= this.currentSequence.length)
            {
                
                this.currentButton = -1
                // change mode here!
                console.log('reached end of current sequence')
                console.log('current sequence:', this.currentSequence)

                this.enterPlayerSelectMode()
            }
            else 
            {
                const nowButton = this.currentSequence[this.currentButton]
                console.log("blink", this.currentButton, nowButton)
                this.buttons[nowButton].lightUp(500)

            }
            
        }
    }

    //player select update
    // collect clicks, build up seq, compare with correct seq
    // if wrong, end game!
    // if correct and full length -> add one to seq and re-enter play seq mode
    playerSelectUpdate()
    {
        //console.log(this.playerSelectionSequence)

        if (this.playerSelectionSequence.length === 0)
        {
            return
        }

        if (this.playerSelectionSequence.length < this.currentSequence.length)
        {
            this.playerSelectionSequence.forEach((e1, i) => {
                if (e1 !== this.currentSequence[i])
                {
                    // wrong answer!
                    console.log('Wrong answer!')
                    console.log(this.currentSequence)
                    console.log(this.playerSelectionSequence)
                    this.buttons.map((button) => button.setInteractive(false))
                    this.mode = MODES[0]
                    this.addNewGameText()
                    this.playerSelectionSequence = []
                    this.currentSequence = []
                }
            })
        }
        else if (this.playerSelectionSequence.length === this.currentSequence.length)
        {
            console.log('all correct')
            console.log(this.currentSequence)
            console.log(this.playerSelectionSequence)
            // all correct and full length

            const z = getRandomInt(4)
            this.currentSequence.push(z)
            this.playerSelectionSequence = []
            
            this.enterSeqPlayMode()

        }
    }

    update(time, delta)
    {
        
        if (this.mode == MODES[1])
        {
            this.playSeqUpdate(delta)
        }
        else if (this.mode == MODES[2])
        {
            this.playerSelectUpdate()
        }

    }
}
