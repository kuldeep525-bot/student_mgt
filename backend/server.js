import express from "express";
import connectdb from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import cookieParser from "cookie-parser";
const app = express();

await connectdb();
// body parser
app.use(express.json());
app.use(cookieParser());
// routes
app.use("/api/auth/", authRoutes);

app.get("/", (req, res) => {
  res.send("First");
});

app.listen(4000, () => {
  console.log("app running at port : ", 4000);
});
