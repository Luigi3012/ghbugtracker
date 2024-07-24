import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import { Bug, BugStatus } from "@ghbugtracker/bug-tracker-types";
import { BugList } from "./bugList";

describe("BugList", () => {
	it("should render", () => {
		const bugsMock = [{ id: "1", description: "Broken link", link: "https://www.google.com", status: BugStatus.Open }] as Bug[];
		render(<BugList bugs={bugsMock} removeBugById={jest.fn()} />);
		expect(screen.getByRole("listitem")).toBeInTheDocument();
	});

	it("should render list with provided bug description", () => {
		const bugsMock = [{ id: "1", description: "Broken link", link: "https://www.google.com", status: BugStatus.Open }] as Bug[];
		render(<BugList bugs={bugsMock} removeBugById={jest.fn()} />);
		expect(screen.getByText("1: Broken link")).toBeInTheDocument();
	});

	it("should call removeBugById callback when user clicks on trash icon", () => {
		const bugsMock = [{ id: "1", description: "Broken link", link: "https://www.google.com", status: BugStatus.Open }] as Bug[];
		const deleteBugMock = jest.fn();
		render(<BugList bugs={bugsMock} removeBugById={deleteBugMock} />);
		screen.getByRole("button").click();
		expect(deleteBugMock).toHaveBeenCalledWith("1");
	});
});
