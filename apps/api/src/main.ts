/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Bug, BugStatus } from "@ghbugtracker/ghbugtracker-types";
import express from "express";
import * as path from "path";

const app = express();

// TODO: Remove me
const bugsMock: Bug[] = [
  {
    description: "Drained phone battery",
    id: "3",
    link: "www.google.com",
    parentId: "5",
    creationTimestamp: new Date(),
    status: BugStatus.Closed,
  },
  {
    description: "Crashed when opening the app",
    id: "2",
    link: "www.google.com",
    parentId: "1",
    creationTimestamp: new Date(),
    status: BugStatus.Open,
  },
];

app.use("/assets", express.static(path.join(__dirname, "assets")));

app.get("/api", (req, res) => {
  res.send({ message: "Welcome to bugs api!" });
});

app.get("/api/bugs", (req, res) => {
  // TODO: Read from file
  res.send(bugsMock);
});

app.post("/bugs", async (req, res) => {
  const bug = req.body;

  // Validate the bug object here if necessary
  try {
    // Write bug to CSV
    // await csvWriter.writeRecords([bug]);
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
