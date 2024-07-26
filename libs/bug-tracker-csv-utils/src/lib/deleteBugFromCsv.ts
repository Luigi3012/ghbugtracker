import * as fs from "fs";
import { DB_FILE_PATH } from "./database";

export function deleteBugFromCsv(id: string): boolean {
	let wasDeleted = false;
	try {
		const csvData = fs.readFileSync(DB_FILE_PATH, "utf-8");
		const lines = csvData.split("\n");

		const index = lines.findIndex(line => {
			const columns = line.split(",");
			return columns[0] === id; // Assuming the ID is in the first column
		});

		// If the line is found, remove it from the array, then join it back to csv string and write it back to the file
		if (index !== -1) {
			lines.splice(index, 1);
			const updatedCsvData = lines.join("\n");

			fs.writeFileSync(DB_FILE_PATH, updatedCsvData, "utf-8");
			wasDeleted = true;
		}
	} catch (error) {
		console.error("Failed to delete bug from CSV:", error);
	}
	return wasDeleted;
}
