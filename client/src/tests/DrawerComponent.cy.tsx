import React from "react"
import DrawerComponent from "../components/Drawer"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "../reducers/store"

describe("<DrawerComponent />", () => {
	it("renders", () => {
		cy.mount(
			<Provider store={store}>
				<BrowserRouter>
					<DrawerComponent />
				</BrowserRouter>
			</Provider>
		)
		cy.contains("Light Mode")
		cy.get("#theme-switch").should("not.be.checked")
		cy.get("#theme-switch").check()
		cy.get("#theme-switch").should("be.checked")
		cy.contains("Dark Mode")
	})
})