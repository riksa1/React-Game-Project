import React from "react"
import { Box, Button, Typography, TextField, Toolbar } from "@mui/material"
import { useAppSelector, useAppDispatch } from "hooks"
import { useNavigate } from "react-router-dom"
import { Formik, Form } from "formik"
import { resetPasswordAsync } from "reducers/Auth"
import DrawerComponent from "components/Drawer"
import * as Yup from "yup"

const ProfileSchema = Yup.object().shape({
	oldPassword: Yup.string()
		.required("Required")
		.min(8, "Password is too short!")
		.max(50, "Password is too long!"),
	newPassword: Yup.string()
		.required("Required")
		.min(8, "Password is too short!")
		.max(50, "Password is too long!"),
	confirmPassword: Yup.string()
		.required("Required")
		.min(8, "Password is too short!")
		.max(50, "Password is too long!")
		.oneOf([Yup.ref("newPassword"), null], "Passwords must match")
})

const ChangePasswordForm = () => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const { user } = useAppSelector(state => state.auth)

	return (
		<>
			<DrawerComponent />
			<Box component="main" sx={{ display: "flex", flexGrow: 1, p: 3, flexDirection: "column", alignItems: "center", mt: 5, width: { sm:  `calc(100% + ${240}px)` }  }}>
				<Toolbar />
				<Typography variant="h3" component="h3" sx={{ mb: 4 }}>
            Change Password
				</Typography>
				<Formik
					initialValues={{
						oldPassword: "",
						newPassword: "",
						confirmPassword: "",
					}}
					validationSchema={ProfileSchema}
					onSubmit={({ oldPassword, newPassword, confirmPassword }) => {
						dispatch(resetPasswordAsync(user ? user._id : "", { oldPassword, password: newPassword, confirmPassword }, navigate))
					}}
				>
					{formik => (
						<Form>
							<TextField
								id="OldPassword"
								label="Old Password*"
								variant="outlined"
								type="password"
								sx={{ mb: 2, width: "100%" }}
								helperText={formik.touched.oldPassword && formik.errors.oldPassword ? formik.errors.oldPassword : null}
								error={formik.touched.oldPassword && formik.errors.oldPassword ? true : false}
								{...formik.getFieldProps("oldPassword")}
							/>
							<TextField
								id="NewPassword"
								label="New Password*"
								variant="outlined"
								type="password"
								sx={{ mb: 2, width: "100%" }}
								helperText={formik.touched.newPassword && formik.errors.newPassword ? formik.errors.newPassword : null}
								error={formik.touched.newPassword && formik.errors.newPassword ? true : false}
								{...formik.getFieldProps("newPassword")}
							/>
							<TextField
								id="ConfirmPassword"
								label="Confirm Password*"
								variant="outlined"
								type="password"
								sx={{ mb: 2, width: "100%" }}
								helperText={formik.touched.confirmPassword && formik.errors.confirmPassword ? formik.errors.confirmPassword : null}
								error={formik.touched.confirmPassword && formik.errors.confirmPassword ? true : false}
								{...formik.getFieldProps("confirmPassword")}
							/>
							<Button sx={{ width: "100%", height: 55 }} variant="contained" type="submit">Submit</Button>
						</Form>
					)}
				</Formik>
			</Box>
		</>
	)
}

export default ChangePasswordForm