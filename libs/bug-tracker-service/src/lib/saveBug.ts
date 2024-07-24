import type { Bug } from "@ghbugtracker/bug-tracker-types";

export async function saveBug(bug: Bug): Promise<boolean> {
	try {
		await fetch("api/bug", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(bug),
		});

		console.log("Bug saved successfully!");

		return true;
	} catch (error) {
		console.error("Error saving bug:", error);

		return false;
	}
}
