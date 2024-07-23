import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";
import { useMemo } from "react";

export type BugAppDialogOwnProps = {
	isOpen: boolean;
	title: string;
	description: string;
	buttons: { text: string; onClick: () => void }[];
};

export const BugAppDialog: React.FC<BugAppDialogOwnProps> = ({ title, description, buttons, isOpen }) => {
	const [open, setOpen] = React.useState(isOpen);

	const handleClose = () => {
		setOpen(false);
	};

	const buttonElements = useMemo(() => {
		return buttons.map((button, index) => {
			return (
				<Button
					key={index}
					onClick={() => {
						button.onClick();
						handleClose();
					}}
					color="primary"
				>
					{button.text}
				</Button>
			);
		});
	}, [buttons]);

	return (
		<Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
			<DialogTitle id="alert-dialog-title">{title}</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">{description}</DialogContentText>
			</DialogContent>
			<DialogActions>{buttonElements}</DialogActions>
		</Dialog>
	);
};

export default BugAppDialog;
