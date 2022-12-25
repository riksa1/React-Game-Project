import React from "react"
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { SortOptions } from "types"

interface GameFilterProps {
    sort: SortOptions
    setSortOption: (filter: SortOptions) => void
}

const options = [
	{ label: "Latest", value: "createdAt -1" },
	{ label: "Oldest", value: "createdAt 1" },
	{ label: "A-Z", value: "title 1" },
	{ label: "Z-A", value: "title -1" },
	{ label: "Most viewed", value: "viewedBy -1" },
	{ label: "Least viewed", value: "viewedBy 1" }
]

const GameSorter = ({ sort, setSortOption }: GameFilterProps) => {
	return (
		<FormControl fullWidth>
			<InputLabel id="game-sorting-label">Sorting options</InputLabel>
			<Select
				labelId="game-sorting-label"
				id="game-sorter"
				value={sort}
				label="Sorting options"
				onChange={e => setSortOption(e.target.value as SortOptions)}
				sx={{ mb: 4 }}
			>
				{options.map(option => (
					<MenuItem key={option.value} value={option.value}>
						{option.label}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	)
}

export default GameSorter