const db = require("../db");

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .send({ message: "Please provide Username & Password" });
  try {
    let query;
    let role;

    if (username.includes("-")) {
      query = "SELECT * FROM students WHERE roll_no = ?";
      role = "Student";
    } else {
      query = "SELECT * FROM admins WHERE cnic = ?";
      // query = "Call AdminLogin(?)"
      role = "Admin";
    }

    const [user] = await db.execute(query, [username]);
    if (user[0].length === 0) {
      return res.status(400).send({ message: "Invalid Credentials! Username" });
    }
    if (password !== user[0].password) {
      return res.status(400).send({ message: "Invalid Credentials! Password" });
    }

    // const {password, ...userInfo} = user[0];
    res
      .status(200)
      .send({
        message: `${role} login successfully!`,
        role,
        userInfo: user[0],
      });
  } catch (error) {
    res.status(500).send({ message: "Something went wrong!" });
    console.log(error.message);
  }
};

module.exports = {
  login,
};
