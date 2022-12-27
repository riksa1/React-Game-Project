import React from "react"
import GameSorter from "./GameSorter"

describe("<GameSorter />", () => {
	it("renders", () => {
		const setSortSpy = cy.spy().as("setSortOption")
		cy.mount(<GameSorter setSortOption={setSortSpy} sort={"createdAt -1"} />)
	})
})