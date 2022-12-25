import React, { useEffect, useState } from "react"
import { Box, Toolbar, Typography, Grid, Container, Grow, CircularProgress, Pagination, Checkbox } from "@mui/material"
import DrawerComponent from "../components/Drawer"
import GameComponent from "../components/Game"
import { searchGamesAsync } from "../reducers/Games"
import { useAppDispatch, useAppSelector } from "hooks"
import SearchBar from "../components/SearchBar"
import GameSorter from "components/GameSorter"

const Games = () => {
	const [search, setSearch] = useState("")
	const [own, setOwn] = useState(false)
	const { isAuth, user } = useAppSelector((state) => state.auth)
	const { games, page, total, limit, sort, loading } = useAppSelector((state) => state.games)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(searchGamesAsync(search, page, limit, sort, own))
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
				<GameSorter
					sort={sort}
					setSortOption={(sortOption) => dispatch(searchGamesAsync(search, page, limit, sortOption, own))}
				/>
				{isAuth && user && (
					<>
						<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
							<Checkbox
								checked={!own}
								onChange={() => {
									dispatch(searchGamesAsync(search, page, limit, sort, !own))
									setOwn(!own)
								}}
								inputProps={{ "aria-label": "controlled" }}
							/>
							<Typography variant="h6" component="h6" sx={{ mb: 2, mt: 2, textAlign: "center" }}>
								Show all games
							</Typography>
							<Checkbox
								checked={own}
								onChange={() => {
									dispatch(searchGamesAsync(search, page, limit, sort, !own))
									setOwn(!own)
								}}
								inputProps={{ "aria-label": "controlled" }}
							/>
							<Typography variant="h6" component="h6" sx={{ mb: 2, mt: 2, textAlign: "center" }}>
								Show only my games
							</Typography>
						</Box>
					</>
				)}
				<Container>
					{loading ? (
						<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 4 }}>
							<CircularProgress />
						</Box>
					) : games && games.length > 0 ? (
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
											viewedBy={game.viewedBy}
										/>
									</Grid>
								))}
							</Grid>
						</Grow>
					) : (
						<Typography variant="h6" component="h6" sx={{ mb: 4, mt: 2, textAlign: "center" }}>
							No games found...
						</Typography>
					)}
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
							onChange={(_e, value) => dispatch(searchGamesAsync(search, value, limit, sort, own))}
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