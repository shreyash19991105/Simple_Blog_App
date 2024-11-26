import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

//components
// import Connection from "./database/db.js";
import Router from "./routes/route.js";
import { connectDB } from "./config/db.js";

const PORT = process.env.PORT || 5000;

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", Router);

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
  connectDB();
});
