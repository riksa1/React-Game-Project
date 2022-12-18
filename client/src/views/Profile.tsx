import React from "react"
import { Box, Toolbar, Typography, Avatar } from "@mui/material"
import DrawerComponent from "../components/Drawer"
import { useAppSelector } from "hooks"

const Profile = () => {
  const { user } = useAppSelector((state) => state.auth)
  return (
    <>
      <DrawerComponent />
      <Box component="main" sx={{ display: "flex", flexGrow: 1, p: 3, flexDirection: 'column', alignItems: 'center', mt: 5, width: { sm:  `calc(100% + ${240}px)` }  }}>
        <Toolbar />
        <Typography variant="h3" component="h3" sx={{ mb: 4 }}>
          Profile
        </Typography>
        <Avatar alt="Profile image" sx={{ width: 200, height: 200, mb: 2 }} />
        <Typography variant="h6" component="h6" sx={{ mb: 4, mt: 2, textAlign: "center" }}>
          {user && user.name}
        </Typography>
        <Typography variant="h6" component="h6" sx={{ mb: 4, mt: 2, textAlign: "center" }}>
          {user && user.email}
        </Typography>
      </Box>
    </>
  )
}

export default Profile