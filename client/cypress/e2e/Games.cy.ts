describe("Games", () => {
	beforeEach(() => {
		cy.request("POST", "http://localhost:8080/api/testing/reset")
		const user = {
			name: "Jeff Bezos",
			email: "jeff.bezos@gmail.com",
			password: "123456789",
			confirmPassword: "123456789"
		}
		cy.request("POST", "http://localhost:8080/api/users/register", user)
		cy.visit("http://localhost:3000")
		cy.contains("Login").click()
		cy.get("input[name='email']").type("jeff.bezos@gmail.com")
		cy.get("input[name='password']").type("123456789")
		cy.get("form").submit()
	})

	it("Should add a new game", () => {
		// in plugins file
		cy.contains("New Game").click()
		cy.get("input[name='title']").type("The Witcher 3")
		cy.get("textarea[name='description']").type("The Witcher 3 is an action role-playing game developed and published by CD Projekt.")
		cy.get("input[name='developer']").type("CD Projekt Red")
		cy.get("input[name='releaseDate']").type("2015-05-18")
		cy.get("#tags").type("RPG{enter}Fantasy{enter}Action{enter}")
		cy.get("input[type=file]").selectFile("cypress/fixtures/ship.jpg", { force: true })
		cy.get("form").submit()
		cy.contains("Game created successfully!")
		cy.contains("The Witcher 3")
	})

	describe("Manage Games", () => {
		beforeEach(() => {
			cy.contains("New Game").click()
			cy.get("input[name='title']").type("The Witcher 3")
			cy.get("textarea[name='description']").type("The Witcher 3 is an action role-playing game developed and published by CD Projekt.")
			cy.get("input[name='developer']").type("CD Projekt Red")
			cy.get("input[name='releaseDate']").type("2015-05-18")
			cy.get("#tags").type("RPG{enter}Fantasy{enter}Action{enter}")
			cy.get("input[type=file]").selectFile("cypress/fixtures/ship.jpg", { force: true })
			cy.get("form").submit()
		})

		it("Should edit a game", () => {
			cy.contains("Edit").click()
			cy.get("input[name='title']").clear().type("The Witcher 3: Wild Hunt")
			cy.get("textarea[name='description']").clear().type("The Witcher 3: Wild Hunt is an action role-playing game developed and published by CD Projekt.")
			cy.get("#tags").type("Edits{enter}")
			cy.get("form").submit()
			cy.contains("Game updated successfully!")
			cy.contains("The Witcher 3: Wild Hunt")
		})

		it("Should delete a game", () => {
			cy.contains("Delete").click()
			cy.contains("Game deleted successfully!")
			cy.contains("The Witcher 3").should("not.exist")
		})

		it("Should add a review", () => {
			cy.contains("Logout").click()
			const user = {
				name: "Steve Jobs",
				email: "steve.jobs@gmail.com",
				password: "123456789",
				confirmPassword: "123456789"
			}
			cy.request("POST", "http://localhost:8080/api/users/register", user)
			cy.contains("Login").click()
			cy.get("input[name='email']").type("steve.jobs@gmail.com")
			cy.get("input[name='password']").type("123456789")
			cy.get("form").submit()
			cy.contains("View").click()
			cy.get("textarea[name='description']").type("This is a great game!")
			cy.get("input[value=5]").click({ force: true })
			cy.get("form").submit()
			cy.contains("Review created successfully!")
			cy.contains("Steve Jobs")
		})
	})
})