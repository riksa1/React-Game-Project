describe("Launch", () => {
	it("Should launch the app", () => {
		cy.visit("http://localhost:8080")
		cy.contains("Welcome to the Game Library")
	})
})