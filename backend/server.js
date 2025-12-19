import express from "express";
import connectdb from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
const app = express();

connectdb();
// body parser
app.use(express.json());

// routes
app.use("/api/auth/", authRoutes);

app.get("/", (req, res) => {
  res.send("First");
});

app.listen(4000, () => {
  console.log("app running at port : ", 4000);
});
