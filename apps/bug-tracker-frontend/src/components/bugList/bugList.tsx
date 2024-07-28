import { Bug } from "@ghbugtracker/bug-tracker-types";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Container, IconButton, List, ListItem, ListItemText } from "@mui/material";
import { useMemo } from "react";
import style from "./bugList.module.scss";

export type BugListOwnProps = {
	bugs: Bug[];
	removeBugById: (id: string) => Promise<void>;
};

export const BugList: React.FC<BugListOwnProps> = ({ bugs, removeBugById }) => {
	const bugListItems = useMemo(() => {
		return bugs.map(bug => {
			return (
				<ListItem key={bug.id}>
					<ListItemText
						primary={`${bug.id}: ${bug.description}`}
						secondary={
							<div className={style["bug-data"]}>
								<span>
									Link:{" "}
									<a href={bug.link} target="blank">
										{bug.link}
									</a>
								</span>
								<span>Status: {bug.status}</span>
								{bug.parentId && <span>Parent ID: {bug.parentId}</span>}
							</div>
						}
					></ListItemText>
					<IconButton title={"Delete"} onClick={() => removeBugById(bug.id)} sx={{ "&:hover": { color: "black" } }}>
						<DeleteForeverIcon />
					</IconButton>
				</ListItem>
			);
		});
	}, [bugs, removeBugById]);

	return (
		<Container className={style["wrapper"]}>
			<h2>Reported Bugs</h2>
			<List>{bugListItems}</List>
		</Container>
	);
};
