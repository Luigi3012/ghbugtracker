import { createEmptyBug } from "@ghbugtracker/bug-tracker-service";
import { Bug } from "@ghbugtracker/bug-tracker-types";
import type { SelectChangeEvent } from "@mui/material";
import { ChangeEvent, FormEvent, useMemo, useState } from "react";

/**
 * Custom hook to handle bug form state and submission of the bug.
 * @param addBug - function to add bug to the list
 * @param removeBugById - function to remove bug from the list by ID
 * @param bugs - list of all bugs
 * @returns bug, isExistingBug, handleInputChange, handleParentIdChange, handleSubmit
 */
export const useBugForm = (addBug: (bug: Bug) => Promise<void>, removeBugById: (id: string) => void, bugs: Bug[]) => {
	const [bug, setBug] = useState<Bug>(createEmptyBug());

	const isExistingBug = useMemo(() => {
		return bugs.some(b => b.id === bug.id);
	}, [bug.id, bugs]);

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setBug({ ...bug, [e.target.name]: e.target.value });
	};

	const handleParentIdChange = (e: SelectChangeEvent) => {
		const value = e.target.value as string;

		if (value && value !== "None") {
			setBug({ ...bug, parentId: e.target.value });
		}
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (isExistingBug) {
			removeBugById(bug.id);
		} else {
			addBug(bug);
		}
		setBug(createEmptyBug());
	};

	return { bug, isExistingBug, handleInputChange, handleParentIdChange, handleSubmit };
};
