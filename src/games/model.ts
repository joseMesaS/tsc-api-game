import {IsString, IsIn, Length, Validate} from 'class-validator'
import {validBoard} from './boardValidator'

// Game model made for validation purposes.
export default class GameModel {

    @Length(3, 20,{ message: "the name must contain between 3-20 characters"})
    @IsString({message: "the name must be of type string"})
    name: string

    @IsIn(["red","blue","green","yellow","magenta"],{
        message: "color doesn't match one of (red, blue, green, yellow, magenta)"
    })
    color: string

    @Validate(validBoard)
    board: string[][]
}
