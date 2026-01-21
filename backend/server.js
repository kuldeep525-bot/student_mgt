import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectdb from "./src/config/db.js";
import authRoutes from "./src/routes/auth.routes.js";
import notesRoutes from "./src/routes/notes.routes.js";
import cookieParser from "cookie-parser";
import passport from "passport";
import "./src/config/googleAuth.js";

const app = express();

// const port = process.env.PORT || 8000;
const port = 4000;

await connectdb();

//corse ka middleware
app.use(
  cors({
    origin: "http://localhost:5500",
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

app.get("/", (req, res) => {
  res.send("First");
});

app.listen(port, () => {
  console.log("app running at port :", port);
});
