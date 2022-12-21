import React, { useState } from "react"
import { Box, Toolbar, Typography, Avatar, Button } from "@mui/material"
import DrawerComponent from "../components/Drawer"
import { useAppSelector, useAppDispatch } from "hooks"
import { useNavigate } from "react-router-dom"
import { deleteUserAsync } from "../reducers/Auth"
import ConfirmationModal from "components/ConfirmationModal"

const Profile = () => {
	const [open, setOpen] = useState(false)
	const { user } = useAppSelector((state) => state.auth)
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	return (
		<>
			<DrawerComponent />
			<Box component="main" sx={{ display: "flex", flexGrow: 1, p: 3, flexDirection: "column", alignItems: "center", mt: 5, width: { sm:  `calc(100% + ${240}px)` }  }}>
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
				<Box
					sx={{
						mt: "auto",
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<Button variant="contained" color="success" sx={{ mr: 2 }}
						onClick={() => navigate("/editprofile")}
					>
            Edit Profile
					</Button>
					<Button variant="contained" sx={{ mr: 2 }}
						onClick={() => navigate("/changepassword")}
					>
            Change Password
					</Button>
					<Button variant="contained" color="error"
						onClick={() => setOpen(true)}
					>
            Delete Account
					</Button>
				</Box>
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