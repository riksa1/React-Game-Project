import React from "react"
import { Formik, Form } from "formik"
import { Typography, TextField, Button, Box, Container } from "@mui/material"
import { useNavigate, Link } from "react-router-dom"
import { signUp } from "../reducers/Auth"
import * as Yup from "yup"
import { useAppDispatch } from "hooks"

const SignUp = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const SignUpSchema = Yup.object().shape({
		name: Yup.string()
			.required("Name is required!"),
		email: Yup.string()
			.email("Invalid email!")
			.required("Email is required!"),
		password: Yup.string()
			.min(8, "Password is too short!")
			.max(50, "Password is too long!")
			.required("Password is required!"),
	})

	return (
		<Container component="main" maxWidth="xs">
			<Box sx={{
				marginTop: 8,
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}>
				<Typography variant="h3" component="h3" sx={{ mb: 4 }}>
                    Sign Up
				</Typography>
				<Formik
					initialValues={{ email: "", password: "", name: "" }}
					validationSchema={SignUpSchema}
					onSubmit={({ email, password, name }) => {
						dispatch(signUp({ email, password, name }, navigate))
					}}
				>
					{formik => (
						<Form>
							<TextField
								fullWidth
								id="name"
								name="name"
								label="Name*"
								value={formik.values.name}
								onChange={formik.handleChange}
								error={formik.touched.name && Boolean(formik.errors.name)}
								helperText={formik.touched.name && formik.errors.name}
								sx={{ mb: 2 }}
							/>
							<TextField
								fullWidth
								id="email"
								name="email"
								label="Email*"
								value={formik.values.email}
								onChange={formik.handleChange}
								error={formik.touched.email && Boolean(formik.errors.email)}
								helperText={formik.touched.email && formik.errors.email}
								sx={{ mb: 2 }}
							/>
							<TextField
								fullWidth
								id="password"
								name="password"
								label="Password*"
								type="password"
								value={formik.values.password}
								onChange={formik.handleChange}
								error={formik.touched.password && Boolean(formik.errors.password)}
								helperText={formik.touched.password && formik.errors.password}
								sx={{ mb: 2 }}
							/>
							<Button
								fullWidth
								type="submit"
								variant="contained"
								sx={{ mt: 2, mb: 2, height: 55 }}
							>
                                Sign Up
							</Button>
						</Form>
					)}
				</Formik>
				<Typography>
                    Already have an account? <Link to="/signin">Sign In</Link>
				</Typography>
			</Box>
		</Container>
	)
}

export default SignUp