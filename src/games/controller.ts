import { JsonController, Get, Body, Param , Post, HttpCode, Put,NotFoundError,BadRequestError, BodyParam } from 'routing-controllers'
import Game from './entity'
import GameModel from './model'
import {validate} from 'class-validator'

interface gameList {
    games: Game[]
}

const defaultBoard = [
	['o', 'o', 'o'],
	['o', 'o', 'o'],
	['o', 'o', 'o']
]

const colors = ['red', 'blue', 'green', 'yellow', 'magenta']

const moves = (board1, board2) => 
  board1
    .map((row, y) => row.filter((cell, x) => board2[y][x] !== cell))
    .reduce((a, b) => a.concat(b))
    .length

@JsonController()
export default class GamesController {

  
  @Get('/games')
  async getGames() : Promise<gameList> {
    const games = await Game.find()
    return { games }
  }

  @Post('/games')
  @HttpCode(201)
  async createGame (
    @BodyParam('name') name: string
    ) : Promise<Game> {
        
        const newGame = new GameModel()
        newGame.name = name
        newGame.color =  colors[Math.floor(Math.random() * colors.length)]
        newGame.board = defaultBoard

        const validation = await validate(newGame,{ validationError: { target: false } })
        if(validation.length > 0) throw new BadRequestError(JSON.parse(JSON.stringify(validation, null, 2)))
        
        const game = await Game.create(newGame)
        return game.save()
    
    }

  
  @Put('/games/:id')
  async updateGame(
    @Param('id') id: number,
    @Body() update: Partial<GameModel>
    ) : Promise<Game> {

        const updatedGame = new GameModel()
        const game = await Game.findOne(id)
        if (!game) throw new NotFoundError('Cannot find game!')

        updatedGame.name = update.name ? update.name : game.name
        updatedGame.color = update.color ? update.color : game.color
        updatedGame.board = update.board ? update.board : game.board

        const validation = await validate(updatedGame,{ validationError: { target: false } })
        if(validation.length > 0) throw new BadRequestError(JSON.parse(JSON.stringify(validation, null, 2)))

        if(update.board) {if ( moves(game.board,update.board) > 1) throw new BadRequestError('invalid quantitie of moves')}
    
        return Game.merge(game, updatedGame).save() 
        
    }
}