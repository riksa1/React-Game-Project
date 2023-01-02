import { NewGame } from "../types"
import Filter from "bad-words"

export const filterBadWordsFromGame = (game: NewGame) => {
	const filter = new Filter()
	game.title = filter.clean(game.title)
	game.description = filter.clean(game.description)
	game.tags = game.tags.map(tag => filter.clean(tag))
	game.developer = filter.clean(game.developer)
	return game
}
