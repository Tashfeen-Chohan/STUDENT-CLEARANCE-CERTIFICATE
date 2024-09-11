const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// NEW STUDENT [STUDENT REGISTER]
const teacherRegister = async (req, res) => {
  const { email, name, password, dept } = req.body;
  if (!email || !name || !password || !dept) {
    return res.status(400).send({ message: "All fields are required!" });
  }
  try {
    const [teacher] = await db.query("SELECT * FROM teachers WHERE email = ?", [
      email,
    ]);
    if (teacher.length > 0) {
      return res.status(400).send({ message: "Teacher already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const query =
      "INSERT INTO teachers ( name, email, password, dept) VALUES (?, ?, ?, ?)";
    await db.query(query, [name, email, hashedPassword, dept]);
    res.status(200).send({ message: "Teacher registered successfully!" });
  } catch (error) {
    res.status(500).send({ message: "Failed to register teacher!" });
    console.log(error.message);
  }
};

// TEACHER LOGIN
const teacherLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .send({ message: "Please provide Email & Password" });
  try {
    const [teacher] = await db.execute(
      "SELECT * FROM teachers WHERE email = ?",
      [email]
    );
    if (teacher.length === 0) {
      return res.status(400).send({ message: "Invalid Credentials!" });
    }
    const passMatched = await bcrypt.compare(password, teacher[0].password);
    if (!passMatched)
      return res.status(400).send({ message: "Invalid Credentials" });

    const token = jwt.sign({ id: teacher[0].id }, process.env.JWT_SECRET);
    res.status(200).send({ message: "Teacher login successfully!", token });
  } catch (error) {
    res.status(500).send({message: "Failed to Login Teacher"})
    console.log(error.message)
  }
};

module.exports = {
  teacherRegister,
  teacherLogin
};
