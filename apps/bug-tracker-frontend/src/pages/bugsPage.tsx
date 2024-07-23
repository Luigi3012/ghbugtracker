import { Alert, Grid, Paper } from "@mui/material";
import React from "react";
import { BugList } from "../components/bugList/bugList";
import { BugTrackingForm } from "../components/bugTrackingForm";
import { useBugList } from "../hooks/useBugList";
import style from "./bugsPage.module.scss";

const BugsPage: React.FC = () => {
	const { bugs, bugsError, bugsSuccess, removeBugById, addBug } = useBugList();

	return (
		<div>
			{bugsError && <Alert severity="error">{bugsError}</Alert>}
			{bugsSuccess && <Alert severity="success">{bugsSuccess}</Alert>}
			<div className={style.welcome}>
				<h1>Bug Tracker Application</h1>
				<p>Welcome to bug tracker application. Simple application to report and view bugs, born as react exercise.</p>
			</div>
			<Grid container spacing={2}>
				<Grid item xs={6}>
					<Paper>
						<BugTrackingForm bugs={bugs} addBug={addBug} removeBugById={removeBugById} />
					</Paper>
				</Grid>
				<Grid item xs={6}>
					<Paper>
						<BugList bugs={bugs} removeBugById={removeBugById} />
					</Paper>
				</Grid>
			</Grid>
		</div>
	);
};

export default BugsPage;
