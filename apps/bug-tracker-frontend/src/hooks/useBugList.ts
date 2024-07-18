import { loadBugs } from "@ghbugtracker/ghbugtracker-service";
import type { Bug } from "@ghbugtracker/ghbugtracker-types";
import { useEffect, useState } from "react";

export const useBugList = () => {
	const [bugs, setBugs] = useState<Bug[]>([]);
	const [bugsLoadError, setBugsLoadError] = useState<string | undefined>(undefined);

	useEffect(() => {
		const loadBugsFromApi = async () => {
			try {
				setBugs(await loadBugs());
			} catch (error) {
				const errorMsg = "Failed to load bugs. " + error;
				console.error(errorMsg);
				setBugsLoadError(errorMsg);
			}
		};

		loadBugsFromApi();
	}, []);

	return { bugs, bugsLoadError };
};
