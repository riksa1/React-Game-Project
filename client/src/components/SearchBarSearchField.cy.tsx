import React from "react"
import SearchField from "./SearchBar"

describe("<SearchField />", () => {
	it("renders", () => {
		const searchSpy = cy.spy().as("search")
		cy.mount(<SearchField search={searchSpy} />)
		cy.get("#search").should("exist")
		cy.get("#search").type("test{enter}")
		cy.get("@search").should("have.been.calledWith", "test")
	})
})