import React from "react"
import { Formik, Form } from "formik"
import { Typography, TextField, Button, Box, CssBaseline } from "@mui/material"
import { useNavigate, Link } from "react-router-dom"
import { signIn } from "../reducers/Auth"
import * as Yup from "yup"
import { useAppDispatch } from "hooks"
import NavBar from "components/NavBar"

const SignIn = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const SignInSchema = Yup.object().shape({
		email: Yup.string()
			.email("Invalid email!")
			.required("Email is required!"),
		password: Yup.string()
			.min(8, "Password is too short!")
			.max(50, "Password is too long!")
			.required("Password is required!"),
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
				flexGrow: 1,
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
			}}>
				<Typography variant="h3" component="h3" sx={{ mb: 4 }}>
                    Sign In
				</Typography>
				<Formik
					initialValues={{ email: "", password: "" }}
					validationSchema={SignInSchema}
					onSubmit={({ email, password }) => {
						dispatch(signIn({ email, password }, navigate))
					}}
				>
					{formik => (
						<Form>
							<TextField
								fullWidth
								id="email"
								name="email"
								label="Email"
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
								label="Password"
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
                                Sign In
							</Button>
						</Form>
					)}
				</Formik>
				<Typography>
                    Don&apos;t have an account? <Link to="/signup">Sign Up</Link>
				</Typography>
			</Box>
		</Box>
	)
}

export default SignIn