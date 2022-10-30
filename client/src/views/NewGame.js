import React, { useState } from "react"
import { Box, Toolbar, Typography, Button, TextField, Autocomplete } from "@mui/material"
import DrawerComponent from "../components/Drawer"
import FileBase from 'react-file-base64';
import { Formik, Form } from "formik"
import { addGame } from "../reducers/Games"
import { useDispatch } from "react-redux"

const NewGame = () => {
  const [tags, setTags] = useState([]);
  const dispatch = useDispatch()
  return (
    <>
      <DrawerComponent />
      <Box component="main" sx={{ display: "flex", flexGrow: 1, p: 3, flexDirection: 'column', alignItems: 'center', mt: 5, width: { sm:  `calc(100% + ${240}px)` }  }}>
        <Toolbar />
        <Typography variant="h3" component="h3" sx={{ mb: 4 }}>
          Add a new game
        </Typography>
        <Formik
          initialValues={{ title: "", description: "", image: "" }}
          onSubmit={({ title, description, image }) => dispatch(addGame({ title, description, tags, image }))}
        >
            {formik => (
              <Form>
                <TextField
                  id="title"
                  name="title"
                  label="Title"
                  variant="outlined"
                  sx={{ mb: 2, width: "100%" }}
                  {...formik.getFieldProps("title")}
                />
                <TextField
                  id="description"
                  name="description"
                  label="Description"
                  variant="outlined"
                  sx={{ mb: 2, width: "100%" }}
                  {...formik.getFieldProps("description")}
                />
                <Autocomplete
                  multiple
                  id="tags"
                  name="tags"
                  options={tags}
                  freeSolo
                  autoSelect
                  onChange={(e) => {
                    if(e.target.value !== undefined && e.target.value !== "") {
                      setTags([ ...tags, e.target.value])
                    }
                    else {
                      setTags([])
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Tags"
                      placeholder="Tags"
                      value={tags}
                    />
                  )}
                />;
                <div style={{ width: "100%", marginBottom: 20 }}><FileBase type="file" multiple={false} onDone={({ base64 }) => formik.setFieldValue("image", base64)} /></div>
                <Button sx={{ width: "100%", height: 55 }} variant="contained" type="submit">Submit</Button>
              </Form>
            )}
        </Formik>
      </Box>
    </>
  )
}

export default NewGame