import dotenv from "dotenv";
dotenv.config();
import express from "express";
import dbConnect from "./config/db.js";
import userRoute from "./route/user/userRoute.js";
import uploadRoute from "./route/user/upload.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

// ✅ DB connection
dbConnect();

app.use(express.json());
app.use(cors());

//✅ API routes
app.use("/user", userRoute);
app.use("/assets", uploadRoute);


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Serve frontend build (dist folder)
app.use(express.static(path.join(__dirname, "dist")));

// ✅ Catch-all → send index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const PORT = process.env.PORT || 9001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
