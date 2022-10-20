import React from "react"
import { Box, Toolbar, Typography, Grid, Container, Grow, CircularProgress } from "@mui/material"
import DrawerComponent from "../components/Drawer"
import GameComponent from "../components/Game" 

const Games = () => {
  const games = [
    {
      title: "God of war",
      description: "This is general description of the game and also some extra information on top of that and maybe even some more content to fill up the space",
      image: "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png",
      id: "1"
    },
    {
      title: "God of war 2",
      description: "This is general description of the game",
      image: "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png",
      id: "2"
    },
    {
      title: "God of war 3",
      description: "This is general description of the game",
      image: "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png",
      id: "3"
    },
    {
      title: "God of war 4",
      description: "This is general description of the game",
      image: "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png",
      id: "4"
    },
    {
      title: "God of war 5",
      description: "This is general description of the game", 
      image: "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png",
      id: "5"
    },
  ]

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
                  <Grid item xs={12} sm={12} md={6} lg={4} key={game.id}>
                    <GameComponent title={game.title} description={game.description} image={game.image} />
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