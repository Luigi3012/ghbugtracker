import { Bug } from "@ghbugtracker/ghbugtracker-types";
import { List, ListItem, ListItemText } from "@mui/material";
import { useMemo } from "react";

export type BugListOwnProps = {
	bugs: Bug[];
};

export const BugList: React.FC<BugListOwnProps> = ({ bugs }) => {
	const bugListItems = useMemo(() => {
		return bugs.map(bug => {
			return (
				<ListItem>
					<ListItemText primary={bug.description} secondary={bug.link}>
						<p>{bug.status}</p>
					</ListItemText>
				</ListItem>
			);
		});
	}, [bugs]);

	return (
		<div>
			<List>{bugListItems}</List>
		</div>
	);
};
