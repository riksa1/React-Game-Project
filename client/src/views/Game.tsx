import React, { useEffect } from "react"
import { Box, Card, CardContent, CardMedia, Grid, Toolbar, Typography, Avatar, CardHeader, Rating } from "@mui/material"
import DrawerComponent from "../components/Drawer"
import { useAppSelector } from "hooks"
import { useNavigate } from "react-router-dom"
import { toast } from "react-hot-toast"
import { Review } from "types"
import ReviewForm from "components/ReviewForm"

const Game = () => {
	const navigate = useNavigate()
	const { selectedGame } = useAppSelector(state => state.games)
	const { isAuth, user } = useAppSelector(state => state.auth)
	const alreadyReviewed = selectedGame && user && selectedGame.reviews.some((review: Review) => review.creator._id === user._id)

	useEffect(() => {
		if(!selectedGame) {
			toast.error("Game not found!")
			navigate("/games")
		}
	}, [selectedGame, navigate])

	return (
		<>
			<DrawerComponent />
			<Box component="main" sx={{ display: "flex", flexGrow: 1, p: 3, alignItems: "center", mt: 5, width: { sm:  `calc(100% - ${240}px)` }, ml: { sm: "240px" } }}>
				<Toolbar />
				<Card
					sx={{
						display: "flex",
						flexGrow: 1,
						mr: 2,
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						p: 2,
					}}
				>
					<CardMedia
						component="img"
						image={selectedGame?.image && selectedGame?.image.base64 !== "" ? selectedGame?.image.base64 :
							"https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
						}
						alt="Game image"
					/>
					<CardContent sx={{ flexGrow: 1 }}>
						<Typography variant="h3" component="h3" sx={{ mb: 4, mt: 2, textAlign: "center" }}>
							{selectedGame ? selectedGame.title : "Game"}
						</Typography>
						<Typography variant="h5" component="h5" sx={{ mb: 4, textAlign: "center" }}>
							{selectedGame ? selectedGame.description : "Description"}
						</Typography>
						{selectedGame?.tags && selectedGame?.tags.length > 0 && (
							<Box
								sx={{
									display: "flex",
									flexDirection: "row",
									justifyContent: "center",
									alignItems: "center",
									flexWrap: "wrap",
								}}
							>
								{selectedGame.tags.map((tag: string) => (
									<Box
										key={tag}
										component="div"
										sx={{
											display: "inline-block",
											p: 1,
											mr: 1,
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
							</Box>
						)}
						<Grid container spacing={2} sx={{ mt: 4 }}>
							{!isAuth && (
								<Grid item xs={12} sm={6}>
									<Card
										sx={{
											display: "flex",
											flexGrow: 1,
											flexDirection: "column",
											alignItems: "center",
											justifyContent: "center",
											p: 2,
										}}
									>
										<CardContent sx={{ flexGrow: 1 }}>
											<Typography variant="h5" component="h5" sx={{ mb: 4, textAlign: "center" }}>
												Login to leave a review
											</Typography>
										</CardContent>
									</Card>
								</Grid>
							)}
							{isAuth && user && selectedGame && !alreadyReviewed && (
								<Grid item xs={12} sm={6}>
									<ReviewForm />
								</Grid>
							)}
							{selectedGame && selectedGame.reviews.length > 0 && selectedGame.reviews.map((review: Review) => (
								<Grid item xs={12} sm={alreadyReviewed ? 12 : 6} key={review._id}>
									<Card
										sx={{
											display: "flex",
											flexGrow: 1,
											flexDirection: "column",
											alignItems: "center",
											justifyContent: "center",
											p: 2,
										}}
									>
										<CardHeader
											avatar={<Avatar src={
												review?.creator?.profilePicture ? review.creator.profilePicture.base64 : "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
											}/>}
											title={review.creator.name}
										/>
										<CardContent sx={{ flexGrow: 1 }}>
											{review.description && (
												<Typography variant="h6" component="h6" sx={{ mb: 4, textAlign: "center" }}>
													{review.description}
												</Typography>
											)}
											<Box sx={{ mb: 2, textAlign: "center" }}>
												<Rating
													name="game-rating"
													value={review.rating}
													readOnly
												/>
											</Box>
										</CardContent>
									</Card>
								</Grid>
							))}
						</Grid>
					</CardContent>
				</Card>
			</Box>
		</>
	)
}

export default Game