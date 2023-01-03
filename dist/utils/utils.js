"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterBadWordsFromGame = void 0;
const bad_words_1 = __importDefault(require("bad-words"));
const filterBadWordsFromGame = (game) => {
    const filter = new bad_words_1.default();
    game.title = filter.clean(game.title);
    game.description = filter.clean(game.description);
    game.tags = game.tags.map(tag => filter.clean(tag));
    game.developer = filter.clean(game.developer);
    return game;
};
exports.filterBadWordsFromGame = filterBadWordsFromGame;
