import React from "react"
import { AppBar, Toolbar, Typography, Button, Switch } from "@mui/material"
import { useAppDispatch, useAppSelector } from "hooks"
import { setTheme } from "reducers/Auth"
import { useNavigate } from "react-router-dom"

const NavBar = () => {
	const { theme } = useAppSelector(state => state.auth)
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const handleThemeChange = () => {
		dispatch(setTheme(theme === "dark" ? "light" : "dark"))
	}

	return (
		<>
			<AppBar component="nav">
				<Toolbar>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						<Button color="inherit" onClick={() => navigate("/")}>Home</Button>
						<Button color="inherit" onClick={() => navigate("/games")}>Games</Button>
					</Typography>
					<Typography variant="h6">
						{theme === "dark" ? "Dark Mode" : "Light Mode"}
					</Typography>
					<Switch id="theme-switch" checked={theme === "dark"} onChange={handleThemeChange} />
				</Toolbar>
			</AppBar>
		</>
	)
}

export default NavBar
