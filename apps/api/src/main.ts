import { deleteBugFromCsv, loadBugsFromCsv, saveBugsToCsv } from "@ghbugtracker/bug-tracker-csv-utils";
import { Bug } from "@ghbugtracker/bug-tracker-types";
import express from "express";
import * as path from "path";

const app = express();
const API_PATH = "/api/bugs";

app.use("/assets", express.static(path.join(__dirname, "assets")));

app.get("/api", (req, res) => {
	res.send({ message: "Welcome to bugs api!" });
});

app.get(API_PATH, async (req, res) => {
	const bugs = await loadBugsFromCsv();
	res.send(bugs);
});

app.delete(API_PATH + "/:id", async (req, res) => {
	console.log("DELETE in API", req.params.id);

	try {
		const bugId = req.params.id;

		deleteBugFromCsv(bugId);

		res.status(201).send(`Bug ${bugId} deleted successfully.`);
	} catch (error) {
		console.error("Error deleting bug:", error);
		res.status(500).send("Error deleting bug.");
	}
});

app.post(API_PATH, async (req, res) => {
	const bug = req.body as Bug;

	try {
		if (bug) {
			console.log("Saving bug:", bug);
			saveBugsToCsv([bug]);
		} else {
			throw new Error("Invalid bug object");
		}
		res.status(201).send("Bug saved successfully.");
	} catch (error) {
		console.error("Error saving bug:", error);
		res.status(500).send("Failed to save bug.");
	}
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}/api`);
});
server.on("error", console.error);
