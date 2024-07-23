import { Bug, BugStatus } from "@ghbugtracker/ghbugtracker-types";

export const createEmptyBug = (): Bug => {
	return {
		id: "",
		description: "",
		link: "",
		status: BugStatus.Open,
		creationTimestamp: new Date(),
		parentId: undefined,
	};
};

export default createEmptyBug;
