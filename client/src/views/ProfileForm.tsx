import React, { useState } from "react"
import { Box, Button, Typography, TextField, Toolbar } from "@mui/material"
import { useAppSelector, useAppDispatch } from "hooks"
import { useNavigate } from "react-router-dom"
import { Formik, Form } from "formik"
import { updateUserAsync } from "reducers/Auth"
// import { setError } from "reducers/Messages"
import DrawerComponent from "components/Drawer"
import * as Yup from "yup"
import Avatar from "@mui/material/Avatar"
import ImageInput from "components/ImageInput"

const ProfileSchema = Yup.object().shape({
	name: Yup.string()
		.required("Name is required!"),
	email: Yup.string()
		.email("Invalid email!")
		.required("Email is required!"),
})

const ProfileForm = () => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const { user } = useAppSelector(state => state.auth)
	const [image, setImage] = useState(user?.profilePicture ? user?.profilePicture : null)

	return (
		<>
			<DrawerComponent />
			<Box component="main" sx={{ display: "flex", flexGrow: 1, p: 3, flexDirection: "column", alignItems: "center", mt: 5, width: { sm:  `calc(100% + ${240}px)` }  }}>
				<Toolbar />
				<Typography variant="h3" component="h3" sx={{ mb: 4 }}>
					Edit Profile
				</Typography>
				<Formik
					initialValues={{
						name: user ? user.name : "",
						email: user ? user.email : "",
					}}
					validationSchema={ProfileSchema}
					onSubmit={({ name, email }) => {
						dispatch(updateUserAsync(user ? user._id : "", { name, email, profilePicture: image }, navigate))
					}}
				>
					{formik => (
						<Form>
							<TextField
								id="Name"
								label="Name*"
								variant="outlined"
								sx={{ mb: 2, width: "100%" }}
								helperText={formik.touched.name && formik.errors.name ? formik.errors.name : null}
								error={formik.touched.name && formik.errors.name ? true : false}
								{...formik.getFieldProps("name")}
							/>
							<TextField
								id="Email"
								label="Email*"
								variant="outlined"
								sx={{ mb: 2, width: "100%" }}
								helperText={formik.touched.email && formik.errors.email ? formik.errors.email : null}
								error={formik.touched.email && formik.errors.email ? true : false}
								{...formik.getFieldProps("email")}
							/>
							<Typography variant="h6" component="h6" sx={{ mb: 1, textAlign: "center" }}>
								Profile Picture
							</Typography>
							<ImageInput setImage={setImage} />
							<Box
								sx={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								{image && image.base64 && <Avatar
									src={image ? image.base64 : ""}
									alt="Selected"
									sx={{ height: 300, width: 300, objectFit: "cover", mb: 2 }}
								/>}
							</Box>
							<Button sx={{ width: "100%", height: 55 }} variant="contained" type="submit">Edit</Button>
						</Form>
					)}
				</Formik>
			</Box>
		</>
	)
}

export default ProfileForm