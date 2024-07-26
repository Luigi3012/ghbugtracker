import { BugStatus, type Bug } from "@ghbugtracker/bug-tracker-types";
import * as fs from "fs";
import * as constants from "./database";
import { DB_FILE_PATH } from "./database";
import { saveBugsToCsv } from "./saveBugsToCsv";

describe("saveBugsToCsv", () => {
	it("should save bugs to CSV file", () => {
		// Test data
		const bugs: Bug[] = [
			{ id: "1", link: "www.test.sk", description: "Description 1", parentId: "2", status: BugStatus.Open, creationTimestamp: new Date() },
			{ id: "2", link: "www.test.sk", description: "Description 2", parentId: undefined, status: BugStatus.Closed, creationTimestamp: new Date() },
			{ id: "3", link: "www.test.sk", description: "Description 3", parentId: "2", status: BugStatus.Open, creationTimestamp: new Date() },
		];

		Object.defineProperty(constants, "DB_FILE_PATH", { value: "db-test.csv", writable: true });

		const wasSaved = saveBugsToCsv(bugs);
		expect(wasSaved).toBe(true);

		// Read the saved CSV file
		const csvData = fs.readFileSync(DB_FILE_PATH, "utf8");

		expect(csvData).toContain("1");
		expect(csvData).toContain("2");
		expect(csvData).toContain("3");
		expect(csvData).toContain("Description 1");
		expect(csvData).toContain("Description 2");
		expect(csvData).toContain("Description 3");

		// Remove changes done by test from CSV file
		fs.writeFileSync(DB_FILE_PATH, "id,description,link,parentId,creationTimestamp,status", "utf8");
	});
});
