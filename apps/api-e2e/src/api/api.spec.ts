import { BugStatus, type Bug } from "@ghbugtracker/bug-tracker-types";
import { config } from "dotenv";

describe("GET /", () => {
	const baseUrl = config().parsed?.API_URL;
	it("should return a message", async () => {
		const res = await fetch(baseUrl);

		expect(res.status).toBe(200);
		const data = await res.json();
		expect(data).toEqual({ message: "Welcome to bugs api!" });
	});

	it("should return a list of bugs", async () => {
		const res = await fetch(`${baseUrl}/bugs`);

		expect(res.status).toBe(200);
		const data = await res.json();
		expect(Array.isArray(data)).toBe(true);
	});

	it("should create a new bug", async () => {
		const bug: Bug = {
			id: "1",
			link: "www.aaa.com",
			description: "This is a new bug",
			parentId: "2",
			status: BugStatus.Open,
			creationTimestamp: new Date(),
		};

		const res = await fetch(`${baseUrl}/bugs`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(bug),
		});

		expect(res.status).toBe(201);
	});

	it("should delete an existing bug", async () => {
		const bugId = "1";

		const res = await fetch(`${baseUrl}/bugs/${bugId}`, {
			method: "DELETE",
		});

		expect(res.status).toBe(201);
	});
});
