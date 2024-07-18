import { Grid } from "@mui/material";
import React from "react";
import { BugList } from "../components/bugList/bugList";
import { BugTrackingForm } from "../components/bugTrackingForm";
import { useBugList } from "../hooks/useBugList";

const BugsPage: React.FC = () => {
	const { bugs, bugsLoadError } = useBugList();

	return (
		<Grid container spacing={2}>
			<Grid item xs={6}>
				<BugTrackingForm />
			</Grid>
			<Grid item xs={6}>
				<BugList bugs={bugs} />
			</Grid>
		</Grid>
	);
};

export default BugsPage;
