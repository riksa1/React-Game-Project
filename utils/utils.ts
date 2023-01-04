import { NewGame } from "../types"
import Filter from "bad-words"

export const filterBadWordsFromGame = (game: NewGame) => {
	try {
		const filter = new Filter()
		game.title = filter.clean(game.title)
		game.description = filter.clean(game.description)
		game.tags = game.tags.map(tag => filter.clean(tag))
		game.developer = filter.clean(game.developer)
		return game
	} catch (error) {
		throw new Error("Failed to filter bad words from game")
	}
}
