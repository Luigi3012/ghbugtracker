import { ChangeEvent, FormEvent, useState } from "react";
import { Bug } from "@ghbugtracker/ghbugtracker-types";
import { createEmptyBug } from "@ghbugtracker/ghbugtracker-service";

export const useBugForm = () => {
	const [bug, setBug] = useState<Bug>(createEmptyBug());

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setBug({ ...bug, [e.target.name]: e.target.value });
	};

	const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setBug({ ...bug, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (bug.link && bug.description) {
			// save bug using service and clear form
			setBug(createEmptyBug());
		}
	};

	return { bug, handleInputChange, handleTextAreaChange, handleSubmit };
};
