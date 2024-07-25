import { config } from "dotenv";

// In this exercise we won't use any database, just csv storage
export const DB_FILE_PATH = config().parsed?.["DB_FILE_PATH"] || process.env["DB_FILE_PATH"] || "./db.csv";
