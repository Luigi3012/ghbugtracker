import { Box, Button, Container, TextField } from "@mui/material";
import { useBugForm } from "../../hooks/useBugForm";

export const BugTrackingForm: React.FC = () => {
	const { bug, handleInputChange, handleTextAreaChange, handleSubmit } = useBugForm();

	return (
		<div>
			<h1>Bug Tracking Form</h1>
			<Container maxWidth="sm">
				<Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
					<TextField fullWidth label="Parent ID" name="parentId" value={bug.parentId} onChange={handleInputChange} margin="normal" />
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
					<Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
						Submit
					</Button>
				</Box>
			</Container>
		</div>
	);
};
