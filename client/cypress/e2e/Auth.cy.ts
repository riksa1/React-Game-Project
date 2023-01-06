describe("Authenticating", () => {
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
	})

	it("Should register a new user and login", () => {
		cy.contains("Login").click()
		cy.contains("Sign Up").click()
		cy.get("input[name='name']").type("Jeff Bezos 2")
		cy.get("input[name='email']").type("jeff.bezos2@gmail.com")
		cy.get("input[name='password']").type("123456789")
		cy.get("input[name='confirmPassword']").type("123456789")
		cy.get("form").submit()
		cy.contains("Signed up successfully!")
		cy.contains("Welcome to the Game Library")
	})

	describe("Login", () => {
		beforeEach(() => {
			cy.contains("Login").click()
		})

		it("Should login with correct credentials", () => {
			cy.get("input[name='email']").type("jeff.bezos@gmail.com")
			cy.get("input[name='password']").type("123456789")
			cy.get("form").submit()
			cy.contains("Logged in successfully!")
			cy.contains("Welcome to the Game Library")
		})

		it("Should not login with incorrect credentials", () => {
			cy.get("input[name='email']").type("jeff.bezos3@gmail.com")
			cy.get("input[name='password']").type("1234567890")
			cy.get("form").submit()
			cy.contains("Invalid email or password")
		})
	})

	describe("Logout", () => {
		beforeEach(() => {
			cy.contains("Login").click()
			cy.get("input[name='email']").type("jeff.bezos@gmail.com")
			cy.get("input[name='password']").type("123456789")
			cy.get("form").submit()
		})

		it("Should logout", () => {
			cy.contains("Logout").click()
			cy.contains("Logged out successfully!")
			cy.contains("Login")
		})
	})
})