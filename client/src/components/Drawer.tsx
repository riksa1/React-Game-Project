import React, { useState } from "react"
import { CssBaseline, AppBar, Divider, Toolbar, Typography, IconButton, Drawer, Box, List, ListItemButton, ListItem, ListItemIcon, ListItemText, Avatar, Button, Switch } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import LogoutIcon from "@mui/icons-material/Logout"
import SportsEsportsIcon from "@mui/icons-material/SportsEsports"
import GamesIcon from "@mui/icons-material/Games"
import AccountBoxIcon from "@mui/icons-material/AccountBox"
import HomeIcon from "@mui/icons-material/Home"
import { useNavigate } from "react-router-dom"
import { setTheme, signOut } from "../reducers/Auth"
import { useAppDispatch, useAppSelector } from "hooks"

const drawerWidth = 240

interface DrawerProps {
  window?: () => Window;
}

const DrawerComponent = (props: DrawerProps) => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const [mobileOpen, setMobileOpen] = useState<boolean>(false)
	const { window } = props
	const { isAuth, user, theme } = useAppSelector(state => state.auth)

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen)
	}

	// Drawer content
	const drawer = (
		<Box>
			<Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 5 }}>
				{isAuth ? (
					<>
						<Avatar alt="Profile Image" sx={{ width: 72, height: 72 }}
							src={user?.profilePicture ? user?.profilePicture.base64 : "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"}
						/>
						<Typography variant="h6" sx={{
							mt: 2,
							mb: 2,
							textAlign: "center",
						}}
						>
							{user?.name}
						</Typography>
					</>
				) : (
					<>
						<Typography variant="h6" noWrap component="div" sx={{ mb: 2 }}>
							Log in to view your profile
						</Typography>
						<Button sx={{ mb: 3 }} variant="contained" onClick={() => navigate("/signin")}>Login</Button>
					</>
				)}
			</Box>
			<Divider />
			<List>
				<ListItem disablePadding>
					<ListItemButton onClick={() => navigate("/")}>
						<ListItemIcon>
							<HomeIcon />
						</ListItemIcon>
						<ListItemText primary="Home" />
					</ListItemButton>
				</ListItem>
				<ListItem disablePadding>
					<ListItemButton onClick={() => navigate("/games")}>
						<ListItemIcon>
							<SportsEsportsIcon />
						</ListItemIcon>
						<ListItemText primary="Games" />
					</ListItemButton>
				</ListItem>
				{isAuth && (
					<>
						<ListItem disablePadding>
							<ListItemButton onClick={() => navigate("/newgame")}>
								<ListItemIcon>
									<GamesIcon />
								</ListItemIcon>
								<ListItemText primary="New Game" />
							</ListItemButton>
						</ListItem>
						<ListItem disablePadding>
							<ListItemButton onClick={() => navigate("/profile")}>
								<ListItemIcon>
									<AccountBoxIcon />
								</ListItemIcon>
								<ListItemText primary="Profile" />
							</ListItemButton>
						</ListItem>
						<ListItem disablePadding>
							<ListItemButton onClick={() => {
								dispatch(signOut(navigate))
								navigate("/")
							}}>
								<ListItemIcon>
									<LogoutIcon />
								</ListItemIcon>
								<ListItemText primary="Logout" />
							</ListItemButton>
						</ListItem>
					</>
				)}
			</List>
		</Box>
	)

	const container = window !== undefined ? () => window().document.body : undefined

	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<AppBar position="fixed" sx={{
				width: { sm: `calc(100% - ${drawerWidth}px)` },
				ml: { sm: `${drawerWidth}px` },
			}}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { sm: "none" } }}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6">
						{theme === "light" ? "Light" : "Dark"} Mode
					</Typography>
					<Switch
						id="theme-switch"
						checked={theme === "light" ? false : true}
						onChange={() => {
							localStorage.setItem("theme", theme === "light" ? "dark" : "light")
							dispatch(setTheme(theme === "light" ? "dark" : "light"))
						}}
						color="default"
					/>
				</Toolbar>
			</AppBar>
			<Box
				component="nav"
				sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
				aria-label="actions menu"
			>
				{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
				<Drawer
					container={container}
					variant="temporary"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
				>
					{drawer}
				</Drawer>
				<Drawer
					variant="permanent"
					sx={{
						display: { xs: "none", sm: "block" },
						"& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
					}}
					open
				>
					{drawer}
				</Drawer>
			</Box>
		</Box>
	)
}

export default DrawerComponent
