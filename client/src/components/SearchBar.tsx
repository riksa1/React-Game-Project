import React, { useState, useEffect, useRef } from "react"
import { TextField, InputAdornment } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"

interface SearchFieldProps {
    search: (query: string) => void
}

const SearchField = ({ search }: SearchFieldProps) => {
	const [searchQuery, setSearchQuery] = useState<string>("")
	const debouncedSearchQuery = useRef<string>(searchQuery)
	const debounceTimeout = useRef<number | undefined>(undefined)

	useEffect(() => {
		debouncedSearchQuery.current = searchQuery
	}, [searchQuery])

	useEffect(() => {
		if (debounceTimeout.current) {
			clearTimeout(debounceTimeout.current)
		}

		debounceTimeout.current = setTimeout(() => {
			search(debouncedSearchQuery.current)
		}, 500)

		return () => {
			clearTimeout(debounceTimeout.current)
		}
	}, [searchQuery])

	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		setSearchQuery(event.target.value)
	}

	return (
		<TextField
			id="search"
			label="Search"
			type="search"
			variant="outlined"
			value={searchQuery}
			onChange={handleChange}
			InputProps={{
				endAdornment: (
					<InputAdornment position="end">
						<SearchIcon />
					</InputAdornment>
				),
			}}
			sx={{ width: "100%", mb: 4 }}
		/>
	)
}

export default SearchField