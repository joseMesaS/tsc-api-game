import {ValidatorConstraint, ValidatorConstraintInterface} from "class-validator";

@ValidatorConstraint({ name: "BoardValidation", async: false })
export class validBoard implements ValidatorConstraintInterface {

    validate(board:  string[][]) {
        
        return Array.isArray(board) && board.length===3
         && board.every(Array.isArray)
         && board.every(element => element.length===3)
         && board.every(element => element.every(field => ['x','o'].indexOf(field)!== -1) )

    }

    defaultMessage() { 
        return "The provided board doesn't meet the requirements";
    }

    

}