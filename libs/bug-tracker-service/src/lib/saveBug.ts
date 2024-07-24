import type { Bug } from "@ghbugtracker/bug-tracker-types";

export async function saveBug(bug: Bug): Promise<boolean> {
	let wasSaved = false;
	try {
		const result = await fetch("api/bugs", {
			method: "POST",
			mode: "cors",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(bug),
		});

		if (result.status === 201) {
			console.log("Bug saved successfully!");
			wasSaved = true;
		}
	} catch (error) {
		console.error("Error saving bug:", error);
	}
	return wasSaved;
}
