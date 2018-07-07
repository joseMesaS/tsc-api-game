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
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const boardValidator_1 = require("./boardValidator");
class GameModel {
}
__decorate([
    class_validator_1.Length(3, 20, { message: "the name must contain between 3-20 characters" }),
    class_validator_1.IsString({ message: "the name must be of type string" }),
    __metadata("design:type", String)
], GameModel.prototype, "name", void 0);
__decorate([
    class_validator_1.IsIn(["red", "blue", "green", "yellow", "magenta"], {
        message: "color doesn't match one of (red, blue, green, yellow, magenta)"
    }),
    __metadata("design:type", String)
], GameModel.prototype, "color", void 0);
__decorate([
    class_validator_1.Validate(boardValidator_1.validBoard),
    __metadata("design:type", Array)
], GameModel.prototype, "board", void 0);
exports.default = GameModel;
//# sourceMappingURL=model.js.map