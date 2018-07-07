import { JsonController, Get, Body, Param , Post, HttpCode, Put,NotFoundError,BadRequestError, BodyParam } from 'routing-controllers'
import Game from './entity'

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
        const game = await Game.create({name: name, color:  colors[Math.floor(Math.random() * colors.length)], board: defaultBoard})
        return game.save()
    }

  
  @Put('/games/:id')
  async updateGame(
    @Param('id') id: number,
    @Body() update: Partial<Game>
    ) : Promise<Game> {
        const game = await Game.findOne(id)
        if (!game) throw new NotFoundError('Cannot find game!')

        if (update.board) {
            if (moves(game.board,update.board) > 1) { 
                throw new BadRequestError('invalid quantitie of moves')
            }else {
                return Game.merge(game, update).save()
            }
        }else {
            return Game.merge(game, update).save()  
        }
        
    }
}