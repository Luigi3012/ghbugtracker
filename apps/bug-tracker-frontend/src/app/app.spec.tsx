import { act, render, screen } from "@testing-library/react";

import App from "./app";

describe("App", () => {
	it("should render", () => {
		const { container } = render(<App />);
		expect(container).toMatchSnapshot();
	});

	it("should show welcome", async () => {
		act(() => render(<App />));
		expect(screen.getByText(/Welcome to bug tracker application/gi)).toBeTruthy();
	});
});
