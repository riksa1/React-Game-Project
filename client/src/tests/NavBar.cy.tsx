import React from "react"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import NavBar from "../components/NavBar"
import { store } from "../reducers/store"

describe("<NavBar />", () => {
	it("renders", () => {
		cy.mount(
			<Provider store={store}>
				<BrowserRouter>
					<NavBar />
				</BrowserRouter>
			</Provider>
		)
		cy.contains("Home")
		cy.contains("Games")
		cy.contains("Light")
		cy.get("#theme-switch").should("not.be.checked")
		cy.get("#theme-switch").check()
		cy.get("#theme-switch").should("be.checked")
		cy.contains("Dark")
	})
})