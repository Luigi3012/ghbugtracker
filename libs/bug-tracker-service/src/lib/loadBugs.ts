import type { Bug } from "@ghbugtracker/ghbugtracker-types";

export async function loadBugs(): Promise<Bug[]> {
	const response = await fetch("/api/bugs");
	return await response.json();
}
