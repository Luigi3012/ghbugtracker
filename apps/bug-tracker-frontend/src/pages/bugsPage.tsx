import { Alert, Grid, Paper } from "@mui/material";
import React, { useState } from "react";
import { BugAppDialog } from "../components/bugAppDialog";
import { BugList } from "../components/bugList";
import { BugTrackingForm } from "../components/bugTrackingForm";
import { useBugList } from "../hooks/useBugList";
import style from "./bugsPage.module.scss";

const BugsPage: React.FC = () => {
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);
	const [bugIdToDelete, setBugIdToDelete] = useState<string | undefined>(undefined);
	const { bugs, bugsError, bugsSuccess, removeBugById, addBug, clearBugAlert } = useBugList();

	const deleteBugByIdWithDialog = (bugId: string) => {
		setBugIdToDelete(bugId);
		setShowDeleteDialog(true);
	};

	const closeDeleteDialog = () => {
		setShowDeleteDialog(false);
	};

	return (
		<div>
			{bugsError && (
				<Alert severity="error" onClose={() => clearBugAlert("error")}>
					{bugsError}{" "}
				</Alert>
			)}
			{bugsSuccess && (
				<Alert severity="success" onClose={() => clearBugAlert("success")}>
					{bugsSuccess}
				</Alert>
			)}
			<div className={style.welcome}>
				<h1>Bug Tracker Application</h1>
				<p>Welcome to bug tracker application. Simple application to report and view bugs, born as react exercise.</p>
			</div>
			<Grid container spacing={2}>
				<Grid item xs={6}>
					<Paper>
						<BugTrackingForm bugs={bugs} addBug={addBug} removeBugById={deleteBugByIdWithDialog} />
					</Paper>
				</Grid>
				<Grid item xs={6}>
					<Paper>
						<BugList bugs={bugs} removeBugById={removeBugById} />
					</Paper>
				</Grid>
			</Grid>
			{bugIdToDelete && (
				<BugAppDialog
					isOpen={showDeleteDialog}
					title="Are you sure?"
					description={`Do you want to delete bug with ID ${bugIdToDelete}?`}
					buttons={[
						{
							text: "Delete Bug",
							onClick: () => {
								closeDeleteDialog();
								removeBugById(bugIdToDelete);
							},
						},
						{ text: "Cancel", onClick: () => closeDeleteDialog() },
					]}
				/>
			)}
		</div>
	);
};

export default BugsPage;
