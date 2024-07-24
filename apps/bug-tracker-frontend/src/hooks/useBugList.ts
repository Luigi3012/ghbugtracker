import { deleteBugById, loadBugs, saveBug } from "@ghbugtracker/bug-tracker-service";
import type { Bug } from "@ghbugtracker/bug-tracker-types";

import { useEffect, useState } from "react";

/**
 * Custom hook to handle bug list which is fetched from the API. Using service.
 * This hook basically handles state of this simple application and also handles communication with service functions that communicate with API.
 * Could be improved by using redux or context, but with project of this size, this is sufficient.
 * @returns bugs, bugsError, bugsSuccess, removeBugById, addBug, clearBugAlert
 */
export const useBugList = () => {
	const [bugs, setBugs] = useState<Bug[]>([]);
	const [bugsError, setBugsError] = useState<string | undefined>(undefined);
	const [bugsSuccess, setBugsSuccess] = useState<string | undefined>(undefined);

	const removeBugById = async (id: string): Promise<void> => {
		try {
			const wasDeleted = await deleteBugById(id);
			if (wasDeleted) {
				setBugs(bugs.filter(bug => bug.id !== id));
				setBugsSuccess("Bug deleted successfully!");
			}
		} catch (error) {
			const errorMsg = "Failed to load bugs. " + error;
			console.error(errorMsg);
			setBugsError(errorMsg);
		}
	};

	const addBug = async (bug: Bug): Promise<void> => {
		try {
			const wasAdded = await saveBug(bug);
			if (wasAdded) {
				setBugs([...bugs, bug]);
				setBugsSuccess("Bug saved successfully!");
			} else {
				setBugsError("Failed to save bug.");
			}
		} catch (error) {
			const errorMsg = "Failed to save bug. " + error;
			console.error(errorMsg);
			setBugsError(errorMsg);
		}
	};

	const clearBugAlert = (type: "success" | "error") => {
		if (type === "success") {
			setBugsSuccess(undefined);
		} else {
			setBugsError(undefined);
		}
	};

	useEffect(() => {
		const loadBugsFromApi = async () => {
			try {
				setBugs(await loadBugs());
			} catch (error) {
				const errorMsg = "Failed to load bugs. " + error;
				console.error(errorMsg);
				setBugsError(errorMsg);
			}
		};

		loadBugsFromApi();
	}, []);

	return { bugs, bugsError, bugsSuccess, removeBugById, addBug, clearBugAlert };
};
