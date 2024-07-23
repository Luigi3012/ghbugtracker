import { createEmptyBug } from "@ghbugtracker/ghbugtracker-service";
import { Bug } from "@ghbugtracker/ghbugtracker-types";
import { ChangeEvent, FormEvent, useState } from "react";

export const useBugForm = (addBug: (bug: Bug) => void) => {
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
			addBug(bug);
		}
	};

	return { bug, handleInputChange, handleTextAreaChange, handleSubmit };
};
