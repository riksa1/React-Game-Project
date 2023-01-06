describe("Launch", () => {
	it("Should launch the app", () => {
		cy.visit("http://localhost:3000")
		cy.contains("Welcome to the Game Library")
	})
})