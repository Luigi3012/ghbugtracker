import { render } from "@testing-library/react";

import App from "./app";

describe("App", () => {
	it("should render", () => {
		const { container } = render(<App />);
		expect(container).toMatchSnapshot();
	});

	it("should show welcome", () => {
		const { getByText } = render(<App />);
		expect(getByText(/Welcome to bug tracker application/gi)).toBeTruthy();
	});

	/*it("should have a greeting as the title", async () => {
		render(<App />);
		const bugIdInput = screen.getByLabelText("Bug ID");
		await userEvent.type(bugIdInput, "BUG-005");

		expect(screen.getByRole("button")).toHaveProperty("disabled", true);
	});*/
});
