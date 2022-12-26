import React, { useState, KeyboardEvent } from "react"
import { TextField, Box, Autocomplete } from "@mui/material"

interface TagInputProps {
    tags: string[]
    setTags: (tags: string[]) => void
}

const TagInput = ({ tags, setTags }: TagInputProps) => {
	const [inputValue, setInputValue] = useState<string>("")

	const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>) => {
		if (event.key === "Enter") {
			setTags([...tags, inputValue])
			setInputValue("")
		}
	}

	return (
		<Box>
			<Autocomplete
				options={[]}
				multiple
				freeSolo
				value={tags}
				onChange={(_event, newValue) => {
					setTags(newValue)
				}}
				inputValue={inputValue}
				onInputChange={(_event, newInputValue) => {
					setInputValue(newInputValue)
				}}
				renderTags={(value) =>
					value.map((option, index) => (
						<Box
							key={index}
							sx={{ mr: 0.5, mb: 0.5, p: 0.5, borderRadius: 1, bgcolor: "primary.main", color: "primary.contrastText" }}
						>
							{option}
						</Box>
					))
				}
				renderInput={(params) => (
					<TextField
						{...params}
						variant="standard"
						label="Add tags"
						placeholder="Add tags"
						onKeyDown={handleKeyPress}
					/>
				)}
			/>
		</Box>
	)
}

export default TagInput