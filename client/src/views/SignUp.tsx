import React from "react"
import { Formik, Form } from "formik"
import { Typography, TextField, Button, Box, CssBaseline } from "@mui/material"
import { useNavigate, Link } from "react-router-dom"
import { signUp } from "../reducers/Auth"
import * as Yup from "yup"
import { useAppDispatch } from "hooks"
import NavBar from "components/NavBar"

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
		confirmPassword: Yup.string()
			.oneOf([Yup.ref("password"), null], "Passwords must match!")
			.required("Confirm password is required!"),
	})

	return (
		<Box sx={{
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			justifyContent: "center",
			height: "100vh",
		}}>
			<CssBaseline />
			<NavBar />
			<Box component="main" sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
			}}>
				<Typography variant="h3" component="h3" sx={{ mb: 4 }}>
                    Sign Up
				</Typography>
				<Formik
					initialValues={{ email: "", password: "", name: "", confirmPassword: "" }}
					validationSchema={SignUpSchema}
					onSubmit={({ email, password, name, confirmPassword }) => {
						dispatch(signUp({ email, password, name, confirmPassword }, navigate))
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
							<TextField
								fullWidth
								id="confirmPassword"
								name="confirmPassword"
								label="Confirm Password*"
								type="password"
								value={formik.values.confirmPassword}
								onChange={formik.handleChange}
								error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
								helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
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
		</Box>
	)
}

export default SignUp