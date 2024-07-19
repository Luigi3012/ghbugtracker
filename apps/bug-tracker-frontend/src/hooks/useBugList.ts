import { deleteBugById, loadBugs } from "@ghbugtracker/ghbugtracker-service";
import type { Bug } from "@ghbugtracker/ghbugtracker-types";
import { useEffect, useState } from "react";

export const useBugList = () => {
	const [bugs, setBugs] = useState<Bug[]>([]);
	const [bugsListError, setBugsListError] = useState<string | undefined>(undefined);

	const removeBugById = async (id: string): Promise<boolean> => {
		try {
			return deleteBugById(id);
		} catch (error) {
			const errorMsg = "Failed to load bugs. " + error;
			console.error(errorMsg);
			setBugsListError(errorMsg);
		}
		return false;
	};

	useEffect(() => {
		const loadBugsFromApi = async () => {
			try {
				setBugs(await loadBugs());
			} catch (error) {
				const errorMsg = "Failed to load bugs. " + error;
				console.error(errorMsg);
				setBugsListError(errorMsg);
			}
		};

		loadBugsFromApi();
	}, []);

	return { bugs, bugsListError, removeBugById };
};
