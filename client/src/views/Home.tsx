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
	const { ownLatestGames, loading, games } = useAppSelector(state => state.games)

	useEffect(() => {
		dispatch(fetchLatestGamesAsync())
	}, [])

	return (
		<>
			<DrawerComponent />
			<Box component="main" sx={{ display: "flex", flexGrow: 1, p: 3, flexDirection: "column", alignItems: "center", mt: 5, width: { sm:  `calc(100% + ${240}px)` }  }}>
				<Toolbar />
				<Typography variant="h4" component="h1" gutterBottom>
					Welcome to the Game Library
				</Typography>
				{isAuth && user && (
					<Container>
						{loading ? (
							<CircularProgress />
						) : ownLatestGames.length > 0 ? (
							<>
								<Typography variant="h5" component="h2" gutterBottom sx={{ textAlign: "center" }}>
									Your latest games
								</Typography>
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
							</>
						) : (
							<Typography variant="h5" component="h2" gutterBottom>
								You have no games yet created
							</Typography>
						)}
						{loading ? (
							<CircularProgress />
						) : games.length > 0 ? (
							<>
								<Typography variant="h5" component="h2" gutterBottom sx={{ textAlign: "center" }}>
									Latest games
								</Typography>
								<Grow in>
									<Grid container spacing={2}>
										{games.map(game => (
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
							</>
						) : (
							<Typography variant="h5" component="h2" gutterBottom>
								No games yet created
							</Typography>
						)}
					</Container>
				)}
			</Box>
		</>
	)
}

export default Home