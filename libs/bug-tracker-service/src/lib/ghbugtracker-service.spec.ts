import { ghbugtrackerService } from "./ghbugtracker-service";

describe("ghbugtrackerService", () => {
	it("should work", () => {
		expect(ghbugtrackerService()).toEqual("ghbugtracker-service");
	});
});
