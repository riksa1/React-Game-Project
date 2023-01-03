import React from "react"
import ReviewForm from "../components/ReviewForm"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { store } from "../reducers/store"

describe("<ReviewForm />", () => {
	it("renders", () => {
		cy.mount(
			<Provider store={store}>
				<BrowserRouter>
					<ReviewForm />
				</BrowserRouter>
			</Provider>
		)
		cy.contains("Add Review")
		cy.contains("Description")
		cy.contains("Rating*")
		cy.contains("Submit Review").click()
	})
})