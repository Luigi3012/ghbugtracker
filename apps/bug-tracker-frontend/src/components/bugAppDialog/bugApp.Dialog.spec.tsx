import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import { BugAppDialog } from "./bugAppDialog";

describe("BugList", () => {
	it("should render list with provided description and title", () => {
		render(<BugAppDialog isOpen={true} title="Test" description="Description" buttons={[]} />);
		expect(screen.getByText("Test")).toBeInTheDocument();
		expect(screen.getByText("Description")).toBeInTheDocument();
	});

	it("should render two buttons", () => {
		render(
			<BugAppDialog
				isOpen={true}
				title="Test"
				description="Description"
				buttons={[
					{ text: "1", onClick: () => console.log("") },
					{ text: "2", onClick: () => console.log("") },
				]}
			/>
		);
		expect(screen.queryAllByRole("button")).toHaveLength(2);
	});
});
