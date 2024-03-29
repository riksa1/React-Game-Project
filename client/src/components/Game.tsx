import React from "react"
import { Card, CardMedia, CardContent, CardActions, Button, Typography, Box, Rating } from "@mui/material"
import { deleteGameAsync, setSelectedGame, setGameViewedAsync } from "../reducers/Games"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "hooks"
import { format } from "date-fns"
import { Game } from "types"

const GameComponent = ({ _id, title, description = "", tags, image, creator, createdAt, updatedAt, viewedBy, reviews, developer, releaseDate, averageRating }: Game) => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const { user } = useAppSelector(state => state.auth)
	return (
		<>
			<Card>
				<CardMedia
					component="img"
					image={image && image.base64 !== "" ? image.base64 :
						"https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
					}
					alt="Game Image"
				/>
				<CardContent>
					<Typography gutterBottom variant="h5" component="h2">
						{title ? title : ""}
					</Typography>
					<Typography sx={{ mb: 2 }}>
						{description.length > 100 ? `${description.substring(0, 100)} ...` : description}
					</Typography>
					{tags && tags.length > 0 && (
						<>
							{tags.slice(0, 5).map(tag => (
								<Box
									key={tag}
									component="div"
									sx={{
										display: "inline-block",
										p: 1,
										mr: 1,
										mb: 1,
										bgcolor: (theme) => (theme.palette.mode === "dark" ? "#101010" : "#fff"),
										color: (theme) =>
											theme.palette.mode === "dark" ? "grey.300" : "grey.800",
										border: "1px solid",
										borderRadius: 2,
										borderColor: (theme) =>
											theme.palette.mode === "dark" ? "grey.800" : "grey.300",
										fontSize: "0.875rem",
										fontWeight: "600",
									}}
								>
									{tag}
								</Box>
							))}
							{tags.length > 5 && (
								<Box
									component="div"
									sx={{
										display: "inline-block",
										p: 1,
										mr: 1,
										mb: 1,
										bgcolor: (theme) => (theme.palette.mode === "dark" ? "#101010" : "#fff"),
										color: (theme) =>
											theme.palette.mode === "dark" ? "grey.300" : "grey.800",
										border: "1px solid",
										borderRadius: 2,
										borderColor: (theme) =>
											theme.palette.mode === "dark" ? "grey.800" : "grey.300",
										fontSize: "0.875rem",
										fontWeight: "600",
									}}
								>
									+{tags.length - 5}
								</Box>
							)}
						</>
					)}
					<Typography variant="body2" color="text.secondary">
						Developer: {developer}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						Release Date: {format(new Date(releaseDate), "dd/MM/yyyy")}
					</Typography>
					{user && user._id === creator?._id && (
						<Typography variant="body2" color="text.secondary">
							{viewedBy?.length} Views
						</Typography>
					)}
					<Typography variant="body2" color="text.secondary">
						{creator?.name} {user && user._id === creator?._id && "(You)"}
					</Typography>
					{averageRating > 0 && (
						<Box sx={{ display: "flex", alignItems: "center", pt: 2 }}>
							<Box sx={{ display: "flex", alignItems: "center" }}>
								<Rating
									name="game-rating"
									value={averageRating}
									readOnly
									sx={{ fontSize: "0.875rem" }}
									precision={0.1}
								/>
								<Typography variant="body2" sx={{ ml: 1 }}>
									{averageRating.toFixed(1)}
								</Typography>
							</Box>
						</Box>
					)}
				</CardContent>
				<CardActions
					sx={{
						mt: "auto",
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<Button size="small" color="success" onClick={() => {
						dispatch(setGameViewedAsync(_id))
						dispatch(setSelectedGame({
							_id,
							title,
							description,
							tags, image,
							creator,
							createdAt,
							updatedAt,
							viewedBy,
							reviews,
							developer,
							releaseDate,
							averageRating,
						}))
						navigate("/games/game")
					}}>
						View
					</Button>
					{user && user?._id.toString() === creator?._id.toString() && (
						<>
							<Button size="small" onClick={() => {
								dispatch(setSelectedGame({
									_id,
									title,
									description,
									tags,
									image,
									creator,
									createdAt,
									updatedAt,
									viewedBy,
									reviews,
									developer,
									releaseDate,
									averageRating,
								}))
								navigate("/editgame")
							}}>Edit</Button>
							<Button size="small" color="error" onClick={() => dispatch(deleteGameAsync(_id))}>Delete</Button>
						</>
					)}
				</CardActions>
			</Card>
		</>
	)
}

export default GameComponent