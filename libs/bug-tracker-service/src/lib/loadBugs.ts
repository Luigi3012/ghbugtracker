import type { Bug } from "@ghbugtracker/bug-tracker-types";

export async function loadBugs(baseApiUrl: string): Promise<Bug[]> {
	const response = await fetch(`${baseApiUrl}/bugs`);
	return await response.json();
}
