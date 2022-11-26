import React, { useEffect } from "react"
import { Box, Toolbar, Typography, Grid, Container, Grow, CircularProgress } from "@mui/material"
import DrawerComponent from "../components/Drawer"
import GameComponent from "../components/Game"
import { useSelector, useDispatch } from "react-redux"
import { initializeGames } from "../reducers/Games"

const Games = () => {
  const games = useSelector((state) => state.games)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeGames())
  }, [dispatch])

  return (
    <>
      <DrawerComponent />
      <Box component="main" sx={{ display: "flex", flexGrow: 1, p: 3, flexDirection: 'column', alignItems: 'center', mt: 5, width: { sm:  `calc(100% - ${240}px)` }, ml: { sm: "240px" } }}>
        <Toolbar />
        <Typography variant="h3" component="h3" sx={{ mb: 4 }}>
          Games
        </Typography>

        <Container>
          {games && games.length > 0 ? (
            <Grow in>
              <Grid container spacing={2}>
                {games.map((game) => (
                  <Grid item xs={12} sm={12} md={6} lg={4} key={game._id}>
                    <GameComponent
                      id={game._id} 
                      title={game.title} 
                      description={game.description} 
                      image={game.image}
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
        </Container>
      </Box>
    </>
  )
}

export default Games