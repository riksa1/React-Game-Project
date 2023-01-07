import React, { useEffect } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./views/Home"
import Profile from "./views/Profile"
import Games from "./views/Games"
import Game from "./views/Game"
import EditGameForm from "./views/EditGameForm"
import CreateGameForm from "./views/CreateGameForm"
import ProfileForm from "./views/ProfileForm"
import ChangePasswordForm from "./views/ChangePasswordForm"
import { Toaster } from "react-hot-toast"
import SignIn from "./views/SignIn"
import SignUp from "./views/SignUp"
import { initializeAuth, setTheme } from "./reducers/Auth"
import { useAppDispatch, useAppSelector } from "hooks"
import { ThemeProvider } from "@mui/material/styles"
import { darkTheme, lightTheme } from "theme"

const App = () => {
	const { isAuth, theme } = useAppSelector(state => state.auth)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(initializeAuth())
	}, [dispatch])

	useEffect(() => {
		if (localStorage.getItem("theme")) {
			dispatch(setTheme(localStorage.getItem("theme") as "light" | "dark"))
		}
	}, [dispatch])

	return (
		<ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
			<BrowserRouter>
				<Toaster />
				<Routes>
					<Route path="*" element={<Home />} />
					<Route path="/" element={<Home />} />
					<Route path="/games" element={<Games />} />
					<Route path="/games/game" element={<Game />} />
					{isAuth ? (
						<>
							<Route path="/profile" element={<Profile />} />
							<Route path="/newgame" element={<CreateGameForm />} />
							<Route path="/editgame" element={<EditGameForm />} />
							<Route path="/editprofile" element={<ProfileForm />} />
							<Route path="/changepassword" element={<ChangePasswordForm />} />
						</>
					) : (
						<>
							<Route path="/signin" element={<SignIn />} />
							<Route path="/signup" element={<SignUp />} />
						</>
					)}
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	)
}

export default App
