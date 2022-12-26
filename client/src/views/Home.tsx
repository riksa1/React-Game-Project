import React, { useEffect } from "react"
import DrawerComponent from "../components/Drawer"
import { Typography, Toolbar, Box, Grid, Grow, Container } from "@mui/material"
import { useAppSelector, useAppDispatch } from "hooks"
import { fetchLatestGamesAsync } from "reducers/Games"
import CircularProgress from "@mui/material/CircularProgress"
import GameComponent from "components/Game"

const Home = () => {
	const dispatch = useAppDispatch()
	const { user, isAuth } = useAppSelector(state => state.auth)
	const { ownLatestGames, loading, latestGames } = useAppSelector(state => state.games)

	useEffect(() => {
		dispatch(fetchLatestGamesAsync())
	}, [])

	return (
		<>
			<DrawerComponent />
			<Box component="main" sx={{ display: "flex", flexGrow: 1, p: 3, flexDirection: "column", alignItems: "center", mt: 5, width: { sm:  `calc(100% - ${240}px)` }, ml: { sm: "240px" } }}>
				<Toolbar />
				<Typography variant="h4" component="h1" sx={{ mb: 4 }}>
					Welcome to the Game Library
				</Typography>
				<Container>
					{isAuth && user && (
						<>
							<Typography variant="h5" component="h2" gutterBottom sx={{ textAlign: "center" }}>
								Your latest games
							</Typography>
							{loading ? (
								<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 4 }}>
									<CircularProgress />
								</Box>
							) : ownLatestGames.length ? (
								<Grow in>
									<Grid container spacing={2}>
										{ownLatestGames.map(game => (
											<Grid item xs={12} sm={12} md={6} lg={4} key={game._id}>
												<GameComponent
													_id={game._id}
													title={game.title}
													tags={game.tags}
													description={game.description}
													image={game.image}
													creator={game.creator}
													createdAt={game.createdAt}
													updatedAt={game.updatedAt}
													viewedBy={game.viewedBy}
												/>
											</Grid>
										))}
									</Grid>
								</Grow>
							) : (
								<Typography variant="h6" color="lightgray" component="h3" gutterBottom sx={{ textAlign: "center" }}>
									You have no games yet...
								</Typography>
							)}
						</>
					)}
					<Typography variant="h5" component="h2" gutterBottom sx={{ textAlign: "center", mt: 4 }}>
						Latest games
					</Typography>
					{loading ? (
						<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 4 }}>
							<CircularProgress />
						</Box>
					) : latestGames.length > 0 ? (
						<Grow in>
							<Grid container spacing={2}>
								{latestGames.map(game => (
									<Grid item xs={12} sm={12} md={6} lg={4} key={game._id}>
										<GameComponent
											_id={game._id}
											title={game.title}
											tags={game.tags}
											description={game.description}
											image={game.image}
											creator={game.creator}
											createdAt={game.createdAt}
											updatedAt={game.updatedAt}
											viewedBy={game.viewedBy}
										/>
									</Grid>
								))}
							</Grid>
						</Grow>
					) : (
						<Typography variant="h6" color="lightgray" component="h3" gutterBottom sx={{ textAlign: "center" }}>
							No games found...
						</Typography>
					)}
				</Container>
			</Box>
		</>
	)
}

export default Home