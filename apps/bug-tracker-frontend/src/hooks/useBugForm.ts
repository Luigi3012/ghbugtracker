import { createEmptyBug } from "@ghbugtracker/ghbugtracker-service";
import { Bug } from "@ghbugtracker/ghbugtracker-types";
import type { SelectChangeEvent } from "@mui/material";
import { ChangeEvent, FormEvent, useMemo, useState } from "react";

export const useBugForm = (addBug: (bug: Bug) => Promise<void>, removeBugById: (id: string) => Promise<void>, bugs: Bug[]) => {
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
		} else if (bug.link && bug.description) {
			addBug(bug);
		}
		setBug(createEmptyBug());
	};

	return { bug, isExistingBug, handleInputChange, handleParentIdChange, handleSubmit };
};
