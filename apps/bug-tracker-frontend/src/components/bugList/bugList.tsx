import { Bug } from "@ghbugtracker/ghbugtracker-types";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Container, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { useMemo } from "react";
import style from "./bugList.module.scss";

export type BugListOwnProps = {
	bugs: Bug[];
	removeBugById: (id: string) => Promise<boolean>;
};

export const BugList: React.FC<BugListOwnProps> = ({ bugs, removeBugById }) => {
	const bugListItems = useMemo(() => {
		return bugs.map(bug => {
			return (
				<ListItem key={bug.id}>
					<ListItemText primary={`${bug.id}: ${bug.description}`} secondary={bug.link}>
						<p>{bug.status}</p>
					</ListItemText>
					<ListItemIcon title={"Delete"} onClick={() => removeBugById(bug.id)} sx={{ "&:hover": { color: "black" } }}>
						<DeleteForeverIcon />
					</ListItemIcon>
				</ListItem>
			);
		});
	}, [bugs]);

	return (
		<Container className={style.wrapper}>
			<h2>Reported Bugs</h2>
			<List>{bugListItems}</List>
		</Container>
	);
};
