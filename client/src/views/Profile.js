import React from 'react'
import { Box, Toolbar, Typography } from '@mui/material'
import DrawerComponent from '../components/Drawer'

const Profile = () => {
  return (
    <>
      <DrawerComponent />
      <Box component="main" sx={{ display: "flex", flexGrow: 1, p: 3, flexDirection: 'column', alignItems: 'center', mt: 5, width: { sm:  `calc(100% + ${240}px)` }  }}>
        <Toolbar />
        <Typography paragraph>
          Profile
        </Typography>
      </Box>
    </>
  )
}

export default Profile