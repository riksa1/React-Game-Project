import React, { useRef } from "react"
import { Button, Box } from "@mui/material"
import { Image } from "types"
import toast from "react-hot-toast"

interface ImageInputProps {
    setImage: (image: Image) => void
}

const ImageInput = ({ setImage }: ImageInputProps) => {
	const imageInputRef = useRef<HTMLInputElement>(null)

	const handleTriggerImageInput = () => {
		if (imageInputRef.current) {
			imageInputRef.current.click()
		}
	}

	const handleBase64Image = ({ target: { files } }) => {
		const loadedImage = files[0]
		if(loadedImage.type !== "image/jpeg" && loadedImage.type !== "image/png") {
			toast.error("File type is not supported!")
			return
		} else if(loadedImage.size > 1000000) {
			toast.error("File size is too big!")
			return
		}
		const reader = new FileReader()
		reader.readAsDataURL(loadedImage)
		reader.onload = () => {
			setImage({
				base64: reader.result as string,
				name: loadedImage.name,
			})
		}
	}

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				width: "100%",
				height: "100%",
				cursor: "pointer",
			}}
		>
			<input type="file" ref={imageInputRef} hidden onChange={handleBase64Image} />
			<Button sx={{ width: "100%", mb: 2, height: 55 }} variant="contained" onClick={handleTriggerImageInput}>Upload Image</Button>
		</Box>
	)
}

export default ImageInput