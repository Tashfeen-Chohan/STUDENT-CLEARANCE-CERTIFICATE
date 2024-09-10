require("dotenv").config()
const express = require("express");
const app = express();
const db = require("./db");

db.query("SELECT 1")
  .then(() => {
    console.log("MySql connected successfully!");
    app.listen(3000, () => {
      console.log("Server is listening.");
    });
  })
  .catch((error) => console.log("MySql connection error : " + error));
