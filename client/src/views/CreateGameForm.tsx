import React, { useState } from "react"
import { Box, Toolbar, Typography, Button, TextField } from "@mui/material"
import DrawerComponent from "../components/Drawer"
import { Formik, Form } from "formik"
import { createGameAsync } from "../reducers/Games"
import { useNavigate } from "react-router-dom"
import * as Yup from "yup"
import ImageInput from "components/ImageInput"
import { Image } from "types"
import TagInput from "components/TagInput"

const CreateGameSchema = Yup.object().shape({
	title: Yup.string()
		.min(3, "Title is too short!")
		.max(100, "Title is too long!")
		.required("Title is required!"),
	description: Yup.string()
		.min(3, "Description is too short!")
		.max(1000, "Description is too long!")
		.required("Description is required!"),
	developer: Yup.string()
		.min(3, "Developer is too short!")
		.max(100, "Developer is too long!")
		.required("Developer is required!"),
	releaseDate: Yup.date()
		.required("Release date is required!"),
})

const CreateGameForm = () => {
	const navigate = useNavigate()
	const [tags, setTags] = useState<string[]>([])
	const [image, setImage] = useState<Image | null>(null)

	return (
		<>
			<DrawerComponent />
			<Box component="main" sx={{ display: "flex", flexGrow: 1, p: 3, flexDirection: "column", alignItems: "center", mt: 5, width: { sm: `calc(100% - ${240}px)` }, ml: { sm: "240px" } }}>
				<Toolbar />
				<Box sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					maxWidth: 500,
					ml: 2,
					mr: 2,
				}}>
					<Typography variant="h3" component="h3" sx={{ mb: 4 }}>
						Create Game
					</Typography>
					<Formik
						initialValues={{
							title: "",
							description: "",
							developer: "",
							releaseDate: "",
						}}
						validationSchema={CreateGameSchema}
						onSubmit={({ title, description, developer, releaseDate }) => {
							createGameAsync({ title, description, tags, image, developer, releaseDate }, navigate)
						}}
					>
						{formik => (
							<Form>
								<TextField
									fullWidth
									id="title"
									label="Title*"
									variant="outlined"
									sx={{ mb: 2 }}
									helperText={formik.touched.title && formik.errors.title ? formik.errors.title : null}
									error={formik.touched.title && formik.errors.title ? true : false}
									{...formik.getFieldProps("title")}
								/>
								<TextField
									fullWidth
									id="description"
									label="Description*"
									variant="outlined"
									multiline
									sx={{ mb: 2 }}
									rows={5}
									helperText={formik.touched.description && formik.errors.description ? formik.errors.description : null}
									error={formik.touched.description && formik.errors.description ? true : false}
									{...formik.getFieldProps("description")}
								/>
								<TextField
									fullWidth
									id="developer"
									label="Developer*"
									variant="outlined"
									sx={{ mb: 2  }}
									helperText={formik.touched.developer && formik.errors.developer ? formik.errors.developer : null}
									error={formik.touched.developer && formik.errors.developer ? true : false}
									{...formik.getFieldProps("developer")}
								/>
								<TextField
									fullWidth
									id="releaseDate"
									label="Release Date*"
									variant="outlined"
									sx={{ mb: 2 }}
									type="date"
									InputLabelProps={{
										shrink: true,
									}}
									helperText={formik.touched.releaseDate && formik.errors.releaseDate ? formik.errors.releaseDate : null}
									error={formik.touched.releaseDate && formik.errors.releaseDate ? true : false}
									{...formik.getFieldProps("releaseDate")}
								/>
								<TagInput tags={tags} setTags={setTags} />
								<Typography variant="h6" component="h6" sx={{ mt: 2, mb: 1, textAlign: "center" }}>
									Game Image
								</Typography>
								<ImageInput setImage={setImage} />
								<Box
									sx={{
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
									}}
								>
									{image && image.base64 && <img
										src={image ? image.base64 : ""}
										alt="Selected"
										style={{ maxHeight: 400, maxWidth: 400, objectFit: "cover", marginBottom: 20 }}
									/>}
								</Box>
								<Button sx={{ width: "100%", height: 55 }} variant="contained" type="submit">Create</Button>
							</Form>
						)}
					</Formik>
				</Box>
			</Box>
		</>
	)
}

export default CreateGameForm