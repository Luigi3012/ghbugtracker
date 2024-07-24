export async function deleteBugById(bugId: string): Promise<boolean> {
	const response = await fetch(`/api/bugs/${bugId}`, {
		method: "DELETE",
	});

	if (response.ok) {
		return true;
	} else {
		return false;
	}
}
