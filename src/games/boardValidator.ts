import {ValidatorConstraint, ValidatorConstraintInterface} from "class-validator";

@ValidatorConstraint({ name: "BoardValidation", async: false })
export class validBoard implements ValidatorConstraintInterface {

    validate(board:  string[][]) : boolean {
        
        return Array.isArray(board) && board.length===3
         && board.every(Array.isArray)
         && board.every(element => element.length===3)
         

    }

    defaultMessage() : string { 
        return "The provided board doesn't meet the requirements";
    }

    

}