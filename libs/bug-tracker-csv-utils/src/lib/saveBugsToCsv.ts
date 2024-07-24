import type { Bug } from "@ghbugtracker/bug-tracker-types";
import * as fs from "fs";
import { DB_FILE_PATH } from "./utils/database";

export function saveBugsToCsv(bugs: Bug[]): boolean {
	try {
		const csvData = bugs
			.map(bug => `${bug.id},${bug.description || ""},${bug.link || ""},${bug.parentId || ""},${bug.creationTimestamp},${bug.status}`)
			.join("\n");
		fs.appendFileSync(DB_FILE_PATH, csvData);
		return true;
	} catch (error) {
		return false;
	}
}
