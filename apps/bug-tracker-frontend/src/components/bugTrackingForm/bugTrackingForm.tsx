import type { Bug } from "@ghbugtracker/ghbugtracker-types";
import { Alert, Box, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useMemo } from "react";
import { useBugForm } from "../../hooks/useBugForm";
import style from "./bugTrackingForm.module.scss";
export type BugTrackingFormOwnProps = {
	addBug: (bug: Bug) => Promise<void>;
	removeBugById: (id: string) => void;
	bugs: Bug[];
};

export const BugTrackingForm: React.FC<BugTrackingFormOwnProps> = ({ bugs, addBug, removeBugById }: BugTrackingFormOwnProps) => {
	const { bug, isExistingBug, handleInputChange, handleParentIdChange, handleSubmit } = useBugForm(addBug, removeBugById, bugs);

	// Provide list of IDs for possible parent IDs, remove own ID from the list
	const possibleParentIds = useMemo(() => {
		const allBugs = bugs
			.map(b => (
				<MenuItem key={b.id} value={b.id}>
					{b.id}
				</MenuItem>
			))
			.filter(b => b.key !== bug.id);

		allBugs.push(
			<MenuItem key={"none"} value={"None"}>
				None
			</MenuItem>
		);

		return allBugs;
	}, [bug.id, bugs]);

	return (
		<Container className={style.wrapper}>
			<Box component="form" onSubmit={handleSubmit}>
				<h2 className={style.title}>Report new bug or delete existing</h2>
				{isExistingBug && <Alert severity="warning">Bug with ID {bug.id} already exists and will be deleted on submit.</Alert>}
				<TextField
					fullWidth
					label="Bug ID"
					name="id"
					value={bug.id}
					onChange={handleInputChange}
					margin="normal"
					multiline
					rows={1}
					required={true}
					helperText="Provide existing ID to delete bug or use list"
				/>
				<TextField
					fullWidth
					label="Description"
					name="description"
					value={bug.description}
					onChange={handleInputChange}
					margin="normal"
					multiline
					rows={4}
					required={false}
				/>
				<TextField fullWidth label="Link" name="link" value={bug.link} onChange={handleInputChange} margin="normal" required={false} />
				<FormControl fullWidth margin="normal">
					<InputLabel id="parentId-label">Parent Id</InputLabel>
					<Select labelId="parentId-label" id="parentId" value={bug?.parentId ?? "None"} label="Age" onChange={handleParentIdChange}>
						{possibleParentIds}
					</Select>
				</FormControl>
				<Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
					Submit
				</Button>
			</Box>
		</Container>
	);
};
