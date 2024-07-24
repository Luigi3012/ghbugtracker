import * as fs from "fs";
import { loadBugsFromCsv } from "./loadBugsFromCsv";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const stream = require("stream");

describe("loadBugsFromCsv", () => {
	it("should return one test bug from CSV file", async () => {
		const csvData =
			"id,description,link,parentId,creationTimestamp,status\n" +
			"BUG-001,Null pointer exception on login,http://example.com/bugs/BUG-001,,2024-07-20 10:15:00,Open\n";

		const mockStream = new stream.Readable();
		mockStream.push(csvData);
		mockStream.push(null);

		jest.spyOn(fs, "createReadStream").mockReturnValue(mockStream);
		const bugs = await loadBugsFromCsv();
		expect(bugs).toBeDefined();
		expect(bugs.length).toBe(1);
		expect(bugs[0].id).toBe("BUG-001");
	});

	it("should handle empty csv file", async () => {
		const csvData = "";

		const mockStream = new stream.Readable();
		mockStream.push(csvData);
		mockStream.push(null);

		jest.spyOn(fs, "createReadStream").mockReturnValue(mockStream);
		const bugs = await loadBugsFromCsv();
		expect(bugs).toBeDefined();
		expect(bugs.length).toBe(0);
	});

	it("should load two bugs from CSV file", async () => {
		const csvData =
			"id,description,link,parentId,creationTimestamp,status\n" +
			"BUG-001,Null pointer exception on login,http://example.com/bugs/BUG-001,,2024-07-20 10:15:00,Open\n" +
			"BUG-004,Unexpected logout on profile update,http://example.com/bugs/BUG-004,BUG-003,2024-07-23 11:45:00,Resolved";

		const mockStream = new stream.Readable();
		mockStream.push(csvData);
		mockStream.push(null);

		jest.spyOn(fs, "createReadStream").mockReturnValue(mockStream);
		const bugs = await loadBugsFromCsv();
		expect(bugs).toBeDefined();
		expect(bugs.length).toBeGreaterThanOrEqual(2);
	});

	it("should handle CSV parsing error", async () => {
		// Mock a CSV parsing error
		jest.spyOn(fs, "createReadStream").mockImplementation(() => {
			throw new Error("CSV parsing error");
		});

		await expect(loadBugsFromCsv()).rejects.toThrow("CSV parsing error");
	});
});
