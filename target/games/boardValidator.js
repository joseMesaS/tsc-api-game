"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
let validBoard = class validBoard {
    validate(board) {
        return Array.isArray(board) && board.length === 3
            && board.every(Array.isArray)
            && board.every(element => element.length === 3)
            && board.every(element => element.every(field => ['x', 'o'].indexOf(field) !== -1));
    }
    defaultMessage() {
        return "The provided board doesn't meet the requirements";
    }
};
validBoard = __decorate([
    class_validator_1.ValidatorConstraint({ name: "BoardValidation", async: false })
], validBoard);
exports.validBoard = validBoard;
//# sourceMappingURL=boardValidator.js.map