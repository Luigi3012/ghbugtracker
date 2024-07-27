export async function deleteBugById(bugId: string, baseApiUrl: string): Promise<boolean> {
	const response = await fetch(`${baseApiUrl}/bugs/${bugId}`, {
		method: "DELETE",
	});

	if (response.ok) {
		return true;
	} else {
		return false;
	}
}
