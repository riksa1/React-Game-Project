import React, { useState } from "react"
import { Box, Toolbar, Typography, Button, TextField } from "@mui/material"
import DrawerComponent from "../components/Drawer"
import FileBase from 'react-file-base64';
import { Formik, Form } from "formik"
import { addGame, editGame } from "../reducers/Games"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import * as Yup from "yup"
import { setError } from "../reducers/Messages";
import { TagsInput } from "react-tag-input-component"

const NewGameSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title is too short!")
    .max(50, "Title is too long!")
    .required("Title is required!"),
  description: Yup.string()
    .min(3, "Description is too short!")
    .max(500, "Description is too long!")
    .required("Description is required!"),
})

const GameForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { selectedGame } = useSelector(state => state.games)
  const [tags, setTags] = useState(selectedGame ? selectedGame.tags : []);
  const [image, setImage] = useState(selectedGame ? selectedGame.image : null);

  return (
    <>
      <DrawerComponent />
      <Box component="main" sx={{ display: "flex", flexGrow: 1, p: 3, flexDirection: 'column', alignItems: 'center', mt: 5, width: { sm:  `calc(100% + ${240}px)` }  }}>
        <Toolbar />
        <Typography variant="h3" component="h3" sx={{ mb: 4 }}>
          {selectedGame ? "Edit Game" : "Add Game"}
        </Typography>
        <Formik
          initialValues={{ 
            title: selectedGame ? selectedGame.title : "", 
            description: selectedGame ? selectedGame.description : "",
          }}
          validationSchema={NewGameSchema}
          onSubmit={({ title, description }) => {
            if (selectedGame)
              dispatch(editGame(selectedGame._id, { title, description, tags, image }, navigate))
            else
              dispatch(addGame({ title, description, tags, image }, navigate))

          }}
        >
            {formik => (
              <Form>
                <TextField
                  id="title"
                  name="title"
                  label="Title*"
                  variant="outlined"
                  sx={{ mb: 2, width: "100%" }}
                  helperText={formik.touched.title && formik.errors.title ? formik.errors.title : null}
                  error={formik.touched.title && formik.errors.title ? true : false}
                  {...formik.getFieldProps("title")}
                />
                <TextField
                  id="description"
                  name="description"
                  label="Description*"
                  variant="outlined"
                  sx={{ mb: 2, width: "100%" }}
                  multiline
                  rows={5}
                  helperText={formik.touched.description && formik.errors.description ? formik.errors.description : null}
                  error={formik.touched.description && formik.errors.description ? true : false}
                  {...formik.getFieldProps("description")}
                />
                <div style={{ width: 450 }}>
                  <TagsInput
                    value={tags}
                    onChange={setTags}
                    name="tags"
                    placeHolder="Enter tags"
                  />
                </div>
                <div style={{ width: "100%", marginBottom: 20, marginTop: 20 }}>
                  <FileBase 
                    type="file" 
                    multiple={false} 
                    onDone={({ type, size, base64, name }) => {
                      if(type.split('/')[0] !== 'image' || (Number(size.split(" ")[0]) > 10000)) {
                        dispatch(setError("File size should be less than 10MB and should be an image!"))
                        return
                      }
                      setImage({ base64, name })
                    }}
                    value={image}
                  />
                </div>
                <div>
                  {image && image.base64 && <img 
                    src={image ? image.base64 : ""} 
                    alt="Selected" 
                    style={{ maxHeight: 300, maxWidth: 300, objectFit: "cover", marginBottom: 20 }} 
                  />}
                </div>
                <Button sx={{ width: "100%", height: 55 }} variant="contained" type="submit">{selectedGame ? "Edit" : "Create"}</Button>
              </Form>
            )}
        </Formik>
      </Box>
    </>
  )
}

export default GameForm