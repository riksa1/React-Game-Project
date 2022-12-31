import React from "react"
import ConfirmationModal from "../components/ConfirmationModal"

describe("<ConfirmationModal />", () => {
	it("renders error modal", () => {
		const handleCloseSpy = cy.spy().as("handleClose")
		const handleConfirmSpy = cy.spy().as("handleConfirm")
		cy.mount(
			<ConfirmationModal
				open
				title="Test Title"
				message="Test Message"
				handleClose={handleCloseSpy}
				handleConfirm={handleConfirmSpy}
				error
			/>
		)
		cy.contains("Test Title")
		cy.contains("Test Message")
		cy.contains("Cancel").click()
		cy.get("@handleClose").should("have.been.calledOnce")
		cy.get("@handleConfirm").should("not.have.been.called")
		cy.contains("Confirm").click()
		cy.get("@handleClose").should("have.been.calledOnce")
		cy.get("@handleConfirm").should("have.been.calledOnce")
	})

	it("renders success modal", () => {
		const handleCloseSpy = cy.spy().as("handleClose")
		const handleConfirmSpy = cy.spy().as("handleConfirm")
		cy.mount(
			<ConfirmationModal
				open
				title="Test Title"
				message="Test Message"
				handleClose={handleCloseSpy}
				handleConfirm={handleConfirmSpy}
				success
			/>
		)
		cy.contains("Test Title")
		cy.contains("Test Message")
		cy.contains("Cancel").click()
		cy.get("@handleClose").should("have.been.calledOnce")
		cy.get("@handleConfirm").should("not.have.been.called")
		cy.contains("Confirm").click()
		cy.get("@handleClose").should("have.been.calledOnce")
		cy.get("@handleConfirm").should("have.been.calledOnce")
	})

	it("renders message modal", () => {
		const handleCloseSpy = cy.spy().as("handleClose")
		cy.mount(
			<ConfirmationModal
				open
				title="Test Title"
				message="Test Message"
				handleClose={handleCloseSpy}
			/>
		)
		cy.contains("Test Title")
		cy.contains("Test Message")
		cy.contains("Ok").click()
		cy.get("@handleClose").should("have.been.calledOnce")
	})
})