import type { Bug } from "@ghbugtracker/ghbugtracker-types";
import { Box, Button, Container, TextField } from "@mui/material";
import { useBugForm } from "../../hooks/useBugForm";
import style from "./bugTrackingForm.module.scss";
export type BugTrackingFormOwnProps = {
	addBug: (bug: Bug) => void;
};

export const BugTrackingForm: React.FC<BugTrackingFormOwnProps> = ({ addBug }: BugTrackingFormOwnProps) => {
	const { bug, handleInputChange, handleTextAreaChange, handleSubmit } = useBugForm(addBug);

	return (
		<Container className={style.wrapper}>
			<Box component="form" onSubmit={handleSubmit}>
				<h2 className={style.title}>Report new bug</h2>
				<TextField
					fullWidth
					label="Description"
					name="description"
					value={bug.description}
					onChange={handleInputChange}
					margin="normal"
					multiline
					rows={4}
					required={true}
				/>
				<TextField fullWidth label="Link" name="link" value={bug.link} onChange={handleInputChange} margin="normal" required={true} />
				<TextField fullWidth label="Parent ID" name="parentId" value={bug.parentId} onChange={handleInputChange} margin="normal" />
				<Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
					Submit
				</Button>
			</Box>
		</Container>
	);
};
