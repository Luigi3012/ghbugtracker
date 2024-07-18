import { Bug, BugStatus } from "@ghbugtracker/ghbugtracker-types";

export const createEmptyBug = (): Bug => {
  return {
    id: createNewBugId(),
    description: "",
    link: "",
    status: BugStatus.Open,
    creationTimestamp: new Date(),
    parentId: undefined,
  };
};

const createNewBugId = (): string => {
  return "I-" + `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export default createEmptyBug;
