import React, { useState } from "react"
import { Box, Toolbar, Typography, Avatar, Button, Grid } from "@mui/material"
import DrawerComponent from "../components/Drawer"
import { useAppSelector, useAppDispatch } from "hooks"
import { useNavigate } from "react-router-dom"
import { deleteUserAsync } from "../reducers/Auth"
import ConfirmationModal from "components/ConfirmationModal"

const Profile = () => {
	const [open, setOpen] = useState<boolean>(false)
	const { user } = useAppSelector((state) => state.auth)
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	return (
		<>
			<DrawerComponent />
			<Box component="main" sx={{ display: "flex", flexGrow: 1, p: 3, flexDirection: "column", alignItems: "center", mt: 5, width: { sm:  `calc(100% - ${240}px)` }, ml: { sm: "240px" } }}>
				<Toolbar />
				<Typography variant="h3" component="h3" sx={{ mb: 4 }}>
					Profile
				</Typography>
				<Avatar alt="Profile image" sx={{ width: 200, height: 200, mb: 2 }}
					src={user?.profilePicture ? user?.profilePicture.base64 : "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"}
				/>
				<Typography variant="h6" component="h6" sx={{ mb: 4, mt: 3, textAlign: "center" }}>
					{user && user.name}
				</Typography>
				<Typography variant="h6" component="h6" sx={{ mb: 5, textAlign: "center" }}>
					{user && user.email}
				</Typography>
				<Grid>
					<Grid item sx={{ mb: 2, textAlign: "center" }}>
						<Button sx={{ width: "100%", height: 55 }} variant="contained" color="success" onClick={() => navigate("/editprofile")}>
							Edit Profile
						</Button>
					</Grid>
					<Grid item sx={{ mb: 2, textAlign: "center" }}>
						<Button sx={{ width: "100%", height: 55 }} variant="contained" onClick={() => navigate("/changepassword")}>
							Change Password
						</Button>
					</Grid>
					<Grid item sx={{ mb: 2, textAlign: "center" }}>
						<Button sx={{ width: "100%", height: 55 }} variant="contained" color="error" onClick={() => setOpen(true)}>
							Delete Account
						</Button>
					</Grid>
				</Grid>
			</Box>
			<ConfirmationModal
				open={open}
				handleClose={() => setOpen(false)}
				handleConfirm={() => dispatch(deleteUserAsync(user?._id, navigate))}
				title="Delete Account"
				message="Are you sure you want to delete your account?"
				error
			/>
		</>
	)
}

export default Profile