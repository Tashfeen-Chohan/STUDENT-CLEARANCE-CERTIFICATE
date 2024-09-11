const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// NEW STUDENT [STUDENT REGISTER]
const registerStudent = async (req, res) => {
  const { roll_no, name, password, dept } = req.body;
  if (!roll_no || !name || !password || !dept) {
    return res.status(400).send({ message: "All fields are required!" });
  }
  try {
    const [user] = await db.query("SELECT * FROM students WHERE roll_no = ?", [
      roll_no,
    ]);
    if (user.length > 0) {
      return res.status(400).send({ message: "Student already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const query =
      "INSERT INTO students (roll_no, name, password, dept) VALUES (?, ?, ?, ?)";
    await db.query(query, [roll_no, name, hashedPassword, dept]);
    res.status(200).send({ message: "Student registered successfully!" });
  } catch (error) {
    res.status(500).send({ message: "Failed to register student!" });
    console.log(error.message);
  }
};

// LOGIN STUDENT
const loginStudent = async (req, res) => {
  const { roll_no, password } = req.body;
  if (!roll_no || !password)
    return res
      .status(400)
      .send({ message: "Please provide Roll No & Password" });
  try {
    const [user] = await db.execute(
      "SELECT * FROM students WHERE roll_no = ?",
      [roll_no]
    );
    if (user.length === 0) {
      return res.status(400).send({ message: "Invalid Credentials!" });
    }
    const passMatched = await bcrypt.compare(password, user[0].password);
    if (!passMatched)
      return res.status(400).send({ message: "Invalid Credentials" });

    const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET);
    res.status(200).send({ message: "Student login successfully!", token });
  } catch (error) {
    res.status(500).send({message: "Failed to Login Student"})
    console.log(error.message)
  }
};

module.exports = {
  registerStudent,
  loginStudent
};
