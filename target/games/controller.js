"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
const entity_1 = require("./entity");
const model_1 = require("./model");
const class_validator_1 = require("class-validator");
const defaultBoard = [
    ['o', 'o', 'o'],
    ['o', 'o', 'o'],
    ['o', 'o', 'o']
];
const colors = ['red', 'blue', 'green', 'yellow', 'magenta'];
const moves = (board1, board2) => board1
    .map((row, y) => row.filter((cell, x) => board2[y][x] !== cell))
    .reduce((a, b) => a.concat(b))
    .length;
let GamesController = class GamesController {
    async getGames() {
        const games = await entity_1.default.find();
        return { games };
    }
    async createGame(name) {
        const newGame = new model_1.default();
        newGame.name = name;
        newGame.color = colors[Math.floor(Math.random() * colors.length)];
        newGame.board = defaultBoard;
        const validation = await class_validator_1.validate(newGame, { validationError: { target: false } });
        if (validation.length > 0)
            throw new routing_controllers_1.BadRequestError(JSON.parse(JSON.stringify(validation, null, 2)));
        const game = await entity_1.default.create(newGame);
        return game.save();
    }
    async updateGame(id, update) {
        const updatedGame = new model_1.default();
        const game = await entity_1.default.findOne(id);
        if (!game)
            throw new routing_controllers_1.NotFoundError('Cannot find game!');
        updatedGame.name = update.name ? update.name : game.name;
        updatedGame.color = update.color ? update.color : game.color;
        updatedGame.board = update.board ? update.board : game.board;
        const validation = await class_validator_1.validate(updatedGame, { validationError: { target: false } });
        if (validation.length > 0)
            throw new routing_controllers_1.BadRequestError(JSON.parse(JSON.stringify(validation, null, 2)));
        if (update.board) {
            if (moves(game.board, update.board) > 1)
                throw new routing_controllers_1.BadRequestError('invalid quantitie of moves');
        }
        return entity_1.default.merge(game, updatedGame).save();
    }
};
__decorate([
    routing_controllers_1.Get('/games'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GamesController.prototype, "getGames", null);
__decorate([
    routing_controllers_1.Post('/games'),
    routing_controllers_1.HttpCode(201),
    __param(0, routing_controllers_1.BodyParam('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GamesController.prototype, "createGame", null);
__decorate([
    routing_controllers_1.Put('/games/:id'),
    __param(0, routing_controllers_1.Param('id')),
    __param(1, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], GamesController.prototype, "updateGame", null);
GamesController = __decorate([
    routing_controllers_1.JsonController()
], GamesController);
exports.default = GamesController;
//# sourceMappingURL=controller.js.map