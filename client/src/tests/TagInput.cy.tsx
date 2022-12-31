import React from "react"
import TagInput from "../components/TagInput"

describe("<TagInput />", () => {
	it("renders", () => {
		const setTagsSpy = cy.spy().as("setTags")
		cy.mount(<TagInput setTags={setTagsSpy} tags={[]} />)
		cy.get("#tags").should("exist")
		cy.get("#tags").type("test{enter}")
		cy.get("@setTags").should("have.been.calledWith", ["test"])
	})
})