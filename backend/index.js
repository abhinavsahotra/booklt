require("dotenv").config();
const express = require("express")
const cors = require("cors");
const connectDB = require("./config/db");
const rootRouter = require("./routes/index");

const app = express();
connectDB()
const PORT = process.env.PORT || 8080

app.use(cors());
app.use(express.json());

app.use("/api/v1/user", rootRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});