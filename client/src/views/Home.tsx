import React from "react"
import DrawerComponent from "../components/Drawer"
import { Typography, Toolbar, Box } from "@mui/material"

const Home = () => {
	return (
		<>
			<DrawerComponent />
			<Box component="main" sx={{ display: "flex", flexGrow: 1, p: 3, flexDirection: "column", alignItems: "center", mt: 5, width: { sm:  `calc(100% + ${240}px)` }  }}>
				<Toolbar />
				<Typography paragraph>
          Home
				</Typography>
			</Box>
		</>
	)
}

export default Home