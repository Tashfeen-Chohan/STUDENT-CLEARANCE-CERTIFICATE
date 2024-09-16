require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./db");
const PORT = 3000;

const startApp = async () => {
  try {
    await db.getConnection();
    console.log("MySql connected successfully!");
    app.listen(PORT, () => console.log(`Server is listening on port ${PORT}!`));
  } catch (error) {
    console.log("MySql connection error : ", error);
  }
};
startApp();

// MIDDLEWARES FUNCTIONS

app.use(express.json());
app.use(cors());

// API ENDPOINTS
app.use("/login", require("./routes/loginRoutes"));
app.use("/applications", require("./routes/applicationRoutes"));
