describe("Profile", () => {
	beforeEach(() => {
		cy.request("POST", "http://localhost:8080/api/testing/reset")
		const user = {
			name: "Jeff Bezos",
			email: "jeff.bezos@gmail.com",
			password: "123456789",
			confirmPassword: "123456789"
		}
		cy.request("POST", "http://localhost:8080/api/users/register", user)
		cy.visit("http://localhost:8080")
	})

	describe("Modify Profile", () => {
		beforeEach(() => {
			cy.contains("Login").click()
			cy.get("input[name='email']").type("jeff.bezos@gmail.com")
			cy.get("input[name='password']").type("123456789")
			cy.get("form").submit()
		})

		it("Should update profile", () => {
			cy.contains("Profile").click()
			cy.contains("Edit Profile").click()
			cy.get("input[name='name']").clear().type("Jeff Bezos 2")
			cy.get("input[name='email']").clear().type("jeff2.bezos@gmail.com")
			cy.get("form").submit()
			cy.contains("Account updated successfully!")
			cy.contains("Jeff Bezos 2")
		})

		it("Should reset password", () => {
			cy.contains("Profile").click()
			cy.contains("Change Password").click()
			cy.get("input[name='oldPassword']").type("123456789")
			cy.get("input[name='newPassword']").type("1234567890")
			cy.get("input[name='confirmPassword']").type("1234567890")
			cy.get("form").submit()
			cy.wait(1000)
			cy.contains("Jeff Bezos")
			cy.contains("Logout").click()
			cy.contains("Login").click()
			cy.get("input[name='email']").type("jeff.bezos@gmail.com")
			cy.get("input[name='password']").type("1234567890")
			cy.get("form").submit()
			cy.contains("Password reset successfully!")
			cy.contains("Welcome to the Game Library")
		})

		it("Should delete account", () => {
			cy.contains("Profile").click()
			cy.contains("Delete Account").click()
			cy.contains("Confirm").click()
			cy.contains("Account deleted successfully!")
			cy.contains("Login")
		})
	})
})

