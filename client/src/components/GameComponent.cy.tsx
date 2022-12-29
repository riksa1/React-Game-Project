import React from "react"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import GameComponent from "./Game"
import { store } from "../reducers/store"

describe("<GameComponent />", () => {
	it("renders", () => {
		cy.mount(
			<Provider store={store}>
				<BrowserRouter>
					<GameComponent
						_id="1"
						title="Test Game"
						description="Test Description"
						tags={["test", "test2"]}
						image={null}
						creator={{ _id: "1", name: "Test User"  }}
						createdAt="2021-10-01T00:00:00.000Z"
						updatedAt="2021-10-02T00:00:00.000Z"
						viewedBy={[]}
						reviews={[]}
					/>
				</BrowserRouter>
			</Provider>
		)
		cy.contains("Test Game")
		cy.contains("Test Description")
		cy.contains("Created: 01/10/2021")
	})
})