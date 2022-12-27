import React from "react"
import ConfirmationModal from "./ConfirmationModal"

describe("<ConfirmationModal />", () => {
	it("renders", () => {
		const handleCloseSpy = cy.spy().as("handleClose")
		const handleConfirmSpy = cy.spy().as("handleConfirm")
		cy.mount(
			<ConfirmationModal
				open={true}
				title="Test Title"
				message="Test Message"
				handleClose={handleCloseSpy}
				handleConfirm={handleConfirmSpy}
				error={true}
			/>
		)
		cy.contains("Test Title")
		cy.contains("Test Message")
		cy.contains("Cancel").click()
		cy.get("@handleClose").should("have.been.calledOnce")
		cy.get("@handleConfirm").should("not.have.been.called")
	})
})