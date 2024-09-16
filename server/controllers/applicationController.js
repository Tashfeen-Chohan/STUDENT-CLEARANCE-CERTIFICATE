const db = require("../db");

const newApplication = async (req, res) => {
  const { student_id, purpose } = req.body;
  try {
    // const [duplicate] = await db.execute(
    //   "SELECT * FROM applications WHERE student_id = ? AND purpose = ?",
    //   [student_id, purpose]
    // );
    // if (duplicate.length > 0) {
    //   return res
    //     .status(400)
    //     .send({ message: "Duplicate application detected!" });
    // }
    const [app] = await db.execute(
      "insert into applications (student_id, purpose) values (?, ?)",
      [student_id, purpose]
    );

    res.status(200).send({ message: "Application submitted successfully!" });
  } catch (error) {
    res.status(500).send({ message: "Something went wrong" });
    console.log(error.message);
  }
};

const getAllApplications = async (req, res) => {
  try {
    const [allApplications] = await db.execute("Call GetAllApplications()");
    return res.status(200).send({ allApplications });
  } catch (error) {
    res.status(500).send({ message: "Something went wrong!" });
    console.log(error.message);
  }
};

const getStudentApplications = async (req, res) => {
  const student_id = req.params.id;
  try {
    const [stdApplications] = await db.query("CALL GetStudentApplications(?)", [
      student_id,
    ]);
    res.status(200).send({ stdApplications });
  } catch (error) {
    res.status(500).send({ message: "Something went wrong!" });
    console.log(error.message);
  }
};

const updateApplication = async (req, res) => {
  const app_id = req.params.id;
  const { status, comment } = req.body;
  try {
    await db.execute(
      "call UpdateApplication(?, ?, ?,)",
      [status, comment, app_id]
    );
    res.status(200).send({ message: "Application updated successfully" });
  } catch (error) {
    res.status(500).send({ message: "Something went wrong!" });
    console.log(error.message);
  }
};

module.exports = {
  newApplication,
  getAllApplications,
  getStudentApplications,
  updateApplication,
};
