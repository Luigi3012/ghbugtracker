import type { Bug } from "@ghbugtracker/ghbugtracker-types";

export async function loadBugs(): Promise<Bug[]> {
	const response = await fetch("/api/bugs");
	const bugs = await response.json();
	return bugs;
}
