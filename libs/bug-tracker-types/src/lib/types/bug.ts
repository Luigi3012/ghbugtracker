import BugStatus from "./bugStatus";

export type Bug = {
	id: string;
	description: string;
	link: string;
	parentId: string | undefined;
	creationTimestamp: Date;
	status: BugStatus;
};

export default Bug;
