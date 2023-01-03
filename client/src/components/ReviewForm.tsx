import React from "react"
import { TextField, Button, Box, Typography, Rating } from "@mui/material"
import { Formik, Form } from "formik"
import { useAppDispatch, useAppSelector } from "hooks"
import { createReviewAsync } from "reducers/Games"
import * as Yup from "yup"

const ReviewSchma = Yup.object().shape({
	description: Yup.string().max(1000, "Description must be less than 1000 characters"),
	rating: Yup.number().required("Rating is required").min(0, "Rating must be between 0 and 5").max(5, "Rating must be between 0 and 5")
})

const ReviewForm = () => {
	const dispatch = useAppDispatch()
	const { selectedGame } = useAppSelector(state => state.games)

	return (
		<>
			<Typography variant="h3" component="h3" sx={{ mb: 4, textAlign: "center" }}>
                Add Review
			</Typography>
			<Formik
				initialValues={{
					description: "",
					rating: 0,
				}}
				validationSchema={ReviewSchma}
				onSubmit={({ description, rating }) => {
					dispatch(createReviewAsync(selectedGame ? selectedGame._id : "", {
						description: description !== "" ? description : undefined,
						rating
					}))
				}}
			>
				{formik => (
					<Form>
						<TextField
							fullWidth
							id="description"
							label="Description"
							variant="outlined"
							multiline
							sx={{ mb: 2 }}
							rows={5}
							helperText={formik.touched.description && formik.errors.description ? formik.errors.description : null}
							error={formik.touched.description && formik.errors.description ? true : false}
							{...formik.getFieldProps("description")}
						/>
						<Typography component="legend" sx={{ mt: 2, textAlign: "center" }}>
							Rating*
						</Typography>
						<Box sx={{ mb: 2, textAlign: "center" }}>
							<Rating
								name="rating"
								value={formik.values.rating}
								onChange={(_event, newValue) => {
									formik.setFieldValue("rating", newValue)
								}}
								sx={{ mb: 2 }}
								precision={0.5}
							/>
							{formik.touched.rating && formik.errors.rating ? (
								<Typography variant="body2" color="error">
									{formik.errors.rating}
								</Typography>
							) : null}
						</Box>
						<Button fullWidth type="submit" variant="contained" sx={{ mb: 2 }}>
                            Submit Review
						</Button>
					</Form>
				)}
			</Formik>
		</>
	)
}

export default ReviewForm