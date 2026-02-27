import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectdb from "./src/config/db.js";
import authRoutes from "./src/routes/user.routes.js";
import notesRoutes from "./src/routes/notes.routes.js";
import adminRoutes from "./src/routes/admin.routes.js";
import paperRoutes from "./src/routes/paper.routes.js";
import cookieParser from "cookie-parser";
import passport from "passport";
import "./src/config/googleAuth.js";
import "./src/job/cleanup.job.js";
import { initCloudinary } from "./utils/cloudnary.js";

const app = express();

// const port = process.env.PORT || 8000;
const port = 4000;

await connectdb();
initCloudinary();

//corse ka middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// middlewares
app.use(passport.initialize());
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/paper", paperRoutes);
app.use("/api/admin", adminRoutes);

app.listen(port, () => {
  console.log("app running at port :", port);
});
