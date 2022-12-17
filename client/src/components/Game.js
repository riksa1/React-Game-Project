import React from "react"
import { Card, CardMedia, CardContent, CardActions, Button, Typography, Box } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { removeGame } from "../reducers/Games"
import { useNavigate } from "react-router-dom"
import { setSelectedGame } from "../reducers/Games"

const Game = ({ _id, title, description, tags, image, creator }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
  return (
    <>
      <Card>
        <CardMedia
          component="img"
          image={image && image.base64 !== "" ? image.base64 : 
            "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
          }
          alt="random"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title ? title : ""}
          </Typography>
          <Typography sx={{ mb: 2 }}>
            {description ? description : ""}
          </Typography>
          {tags && tags.length > 0 && (
            <>
              {tags.map((tag) => (
                <Box 
                  key={tag} 
                  component="div" 
                  sx={{ 
                    display: "inline-block", 
                    p: 1,
                    mr: 1,
                    mb: 1,
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
        <CardActions>
          <Button size="small" onClick={() => {
            dispatch(setSelectedGame({ _id, title, description, tags, image, creator }))
            navigate(`/games/game`)
          }}>
            View
          </Button>
          {user && user._id.toString() === creator.toString() && (
            <>
              <Button size="small" onClick={() => {
                dispatch(setSelectedGame({ _id, title, description, tags, image, creator }))
                navigate("/editgame")
              }}>Edit</Button>
              <Button size="small" onClick={() => dispatch(removeGame(_id))}>Delete</Button>
            </> 
          )}
        </CardActions>
      </Card>
    </>
  )
}

export default Game