import React from "react"
import { Card, CardMedia, CardContent, CardActions, Button, Typography } from "@mui/material"

const Game = ({ title, description, image }) => {
  return (
    <>
      <Card>
        <CardMedia
          component="img"
          image={image && image !== "" ? image : 
            "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
          }
          alt="random"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title ? title : ""}
          </Typography>
          <Typography>
            {description ? description : ""}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">View</Button>
          <Button size="small">Edit</Button>
          <Button size="small">Delete</Button>
        </CardActions>
      </Card>
    </>
  )
}

export default Game