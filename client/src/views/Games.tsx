import React, { useEffect, useState } from "react"
import { Box, Toolbar, Typography, Grid, Container, Grow, CircularProgress, Pagination } from "@mui/material"
import DrawerComponent from "../components/Drawer"
import GameComponent from "../components/Game"
import { fetchGamesAsync } from "../reducers/Games"
import { useAppDispatch, useAppSelector } from "hooks"
import SearchBar from "../components/SearchBar"

const Games = () => {
	const [search, setSearch] = useState("")
	const { games, page, total, limit } = useAppSelector((state) => state.games)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(fetchGamesAsync(search, page, limit))
	}, [dispatch, page, search])

	return (
		<>
			<DrawerComponent />
			<Box component="main" sx={{ display: "flex", flexGrow: 1, p: 3, flexDirection: "column", alignItems: "center", mt: 5, width: { sm:  `calc(100% - ${240}px)` }, ml: { sm: "240px" } }}>
				<Toolbar />
				<Typography variant="h3" component="h3" sx={{ mb: 4 }}>
					Games
				</Typography>
				<SearchBar search={setSearch} />
				<Container>
					{games && games.length > 0 ? (
						<Grow in>
							<Grid container spacing={2}>
								{games.map((game) => (
									<Grid item xs={12} sm={12} md={6} lg={4} key={game._id}>
										<GameComponent
											_id={game._id}
											title={game.title}
											description={game.description}
											tags={game.tags}
											image={game.image}
											creator={game.creator}
											createdAt={game.createdAt}
											updatedAt={game.updatedAt}
										/>
									</Grid>
								))}
							</Grid>
						</Grow>
					) : games.length === 0 ? (
						<Typography variant="h6" component="h6" sx={{ mb: 4, mt: 2, textAlign: "center" }}>
              No games found...
						</Typography>
					) : <CircularProgress />}
					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							mt: 4,
						}}
					>
						<Pagination
							count={Math.ceil(total / limit)}
							page={page}
							onChange={(e, value) => dispatch(fetchGamesAsync(search, value, limit))}
							color="primary"
							sx={{ mt: 2 }}
						/>
					</Box>
				</Container>
			</Box>
		</>
	)
}

export default Games