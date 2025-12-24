import dotenv from "dotenv";
import express from "express";
import connectdb from "./src/config/db.js";
import authRoutes from "./src/routes/auth.routes.js";
import notesRoutes from "./src/routes/notes.routes.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

// const port = process.env.PORT || 8000;
const port = 4000;

await connectdb();

// middlewares
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);

app.get("/", (req, res) => {
  res.send("First");
});

app.listen(port, () => {
  console.log("app running at port :", port);
});
