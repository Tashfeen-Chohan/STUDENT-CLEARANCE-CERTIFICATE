const db = require("../db");
const bcrypt = require("bcrypt");

// NEW STUDENT [STUDENT REGISTER]
const newStudent = async (req, res) => {
  const { roll_no, name, password, dept } = req.body;
  if (!roll_no || !name || !password || !dept) {
    return res.status(400).send({ message: "All fields are required!" });
  }
  try {
    const [user] = await db.query(
      "SELECT * FROM students WHERE roll_no = ?",
      [roll_no]
    );
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

module.exports = {
  newStudent,
};
