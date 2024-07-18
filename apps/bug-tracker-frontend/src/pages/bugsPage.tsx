import { Alert, Grid, Paper } from "@mui/material";
import React from "react";
import { BugList } from "../components/bugList/bugList";
import { BugTrackingForm } from "../components/bugTrackingForm";
import { useBugList } from "../hooks/useBugList";
import style from "./bugsPage.module.scss";

const BugsPage: React.FC = () => {
	const { bugs, bugsLoadError } = useBugList();

	return (
		<div>
			{bugsLoadError && <Alert severity="error">{bugsLoadError}</Alert>}
			<div className={style.welcome}>
				<h1>Bug Tracker Application</h1>
				<p>Welcome to bug tracker application. Simple application to report and view bugs, born as react exercise.</p>
			</div>
			<Grid container spacing={2}>
				<Grid item xs={6}>
					<Paper>
						<BugTrackingForm />
					</Paper>
				</Grid>
				<Grid item xs={6}>
					<Paper>
						<BugList bugs={bugs} />
					</Paper>
				</Grid>
			</Grid>
		</div>
	);
};

export default BugsPage;
