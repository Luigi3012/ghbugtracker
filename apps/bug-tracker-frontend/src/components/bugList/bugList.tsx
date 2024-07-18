import { Bug } from "@ghbugtracker/ghbugtracker-types";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Container, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { useMemo } from "react";
import style from "./bugList.module.scss";

export type BugListOwnProps = {
	bugs: Bug[];
};

export const BugList: React.FC<BugListOwnProps> = ({ bugs }) => {
	const bugListItems = useMemo(() => {
		return bugs.map(bug => {
			return (
				<ListItem>
					<ListItemText primary={`${bug.id}: ${bug.description}`} secondary={bug.link}>
						<p>{bug.status}</p>
					</ListItemText>
					<ListItemIcon title={"Delete"} onClick={() => console.log("DELETE", bug.id)} sx={{ "&:hover": { color: "black" } }}>
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
