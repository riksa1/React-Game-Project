import React from "react"
import ImageInput from "./ImageInput"

describe("<ImageInput />", () => {
	it("renders", () => {
		const setImageSpy = cy.spy().as("setImage")
		cy.mount(<ImageInput setImage={setImageSpy} />)
		cy.contains("Upload Image").click()
		cy.get("input[type=file]").selectFile("cypress/fixtures/ship.jpg", { force: true })
	})
})