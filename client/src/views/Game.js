import React from "react"
import { Box, Card, CardContent, CardMedia, Toolbar, Typography } from "@mui/material"
import DrawerComponent from "../components/Drawer"
import { useSelector } from "react-redux"

const Game = () => {
  const { selectedGame } = useSelector(state => state.games)
  return (
    <>
      <DrawerComponent />
      <Box component="main" sx={{ display: "flex", flexGrow: 1, p: 3, alignItems: 'center', mt: 5, width: { sm:  `calc(100% - ${240}px)` }, ml: { sm: "240px" } }}>
        <Toolbar />
        <Card 
          sx={{
            height: "100%", 
            width: "100%", 
            mr: 2, 
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CardMedia
            component="img"
            image={selectedGame?.image && selectedGame?.image.base64 !== "" ? selectedGame?.image.base64 : 
              "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
            alt="random"
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography variant="h3" component="h3" sx={{ mb: 4, mt: 2 }}>
              {selectedGame ? selectedGame.title : "Game"}
            </Typography>
            <Typography variant="h5" component="h5" sx={{ mb: 4 }}>
              {selectedGame ? selectedGame.description : "Description"}
            </Typography>
            {selectedGame?.tags && selectedGame?.tags.length > 0 && (
                <>
                  {selectedGame.tags.map((tag) => (
                    <Box 
                      key={tag} 
                      component="div" 
                      sx={{ 
                        display: "inline-block", 
                        p: 1,
                        mr: 1,
                        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
                        color: (theme) =>
                          theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
                        border: '1px solid',
                        borderRadius: 2,
                        borderColor: (theme) =>
                          theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',        
                        fontSize: '0.875rem',
                        fontWeight: '600',
                      }}
                    >
                      {tag}
                    </Box>  
                  ))}
                </>
              )}
          </CardContent>
        </Card>
      </Box>
    </>
  )
}

export default Game