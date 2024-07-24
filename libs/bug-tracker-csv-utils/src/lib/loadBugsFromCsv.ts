import type { Bug, BugStatus } from "@ghbugtracker/bug-tracker-types";

import { parse } from "csv-parse";
import * as fs from "fs";
import { DB_FILE_PATH } from "./utils/database";

export function loadBugsFromCsv(): Promise<Bug[]> {
	return new Promise((resolve, reject) => {
		const bugs: Bug[] = [];
		try {
			fs.createReadStream(DB_FILE_PATH)
				.pipe(
					parse({
						columns: true, // Assumes the first row contains column names
						skip_empty_lines: true,
					})
				)
				.on("data", (row: Record<string, string>) => {
					// Convert row to Bug type, assuming the CSV columns match the Bug type properties
					const bug: Bug = {
						id: row["id"],
						parentId: row["parentId"],
						description: row["description"],
						status: row["status"] as BugStatus,
						creationTimestamp: new Date(row["creationTimestamp"]),
						link: row["link"],
					};
					bugs.push(bug);
				})
				.on("end", () => {
					resolve(bugs);
				})
				.on("error", (error: Error) => {
					reject(error);
				});
		} catch (error) {
			reject(error);
		}
	});
}
