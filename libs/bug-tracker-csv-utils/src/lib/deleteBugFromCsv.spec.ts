import * as fs from "fs";
import { deleteBugFromCsv } from "./deleteBugFromCsv";

describe("deleteBugFromCsv", () => {
	beforeEach(() => {
		jest
			.spyOn(fs, "readFileSync")
			.mockReturnValue(
				"id,description,link,parentId,creationTimestamp,status\nBUG-001,Null pointer exception on login,http://example.com/bugs/BUG-001,,2024-07-20 10:15:00,Open\n"
			);

		jest.spyOn(fs, "writeFileSync").mockImplementation(() => true);
	});

	it("should delete a existing bug from the CSV file", () => {
		const wasDeleted = deleteBugFromCsv("BUG-001");
		expect(wasDeleted).toBe(true);
	});

	it("should return false if the bug does not exist in the CSV file", () => {
		const wasDeleted = deleteBugFromCsv("BUG-Nonexistent");
		expect(wasDeleted).toBe(false);
	});
});
