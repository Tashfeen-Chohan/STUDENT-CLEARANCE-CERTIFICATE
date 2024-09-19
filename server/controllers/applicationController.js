const db = require("../db");

const newApplication = async (req, res) => {
  const {
    student_id,
    library_status,
    library_id,
    hostel_status,
    hostel_id,
    uni_card_possesion,
    reason,
    mailing_address,
  } = req.body;

  try {
    const [app] = await db.execute("call NewApplication (?,?,?,?,?,?,?,?)", [
      student_id,
      library_status,
      library_id || null,
      hostel_status,
      hostel_id || null,
      uni_card_possesion,
      reason,
      mailing_address,
    ]);

    res.status(200).send({ message: "Application submitted successfully!" });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      res
        .status(400)
        .send({ message: "Duplicate entry! The application already exists." });
    } else {
      res.status(500).send({ message: "Something went wrong" });
    }

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
    await db.execute("call UpdateApplication (?, ?, ?)", [
      status,
      comment,
      app_id,
    ]);
    res.status(200).send({ message: "Application updated successfully" });
  } catch (error) {
    res.status(500).send({ message: "Something went wrong!" });
    console.log(error.message);
  }
};

const getAllLibrariesAndHostels = async (req, res) => {
  try {
    const libraries = await db.execute("call GetAllLibraries()");
    const hostels = await db.execute("call GetAllHostels()");
    res.status(200).send({ libraries, hostels });
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
  getAllLibrariesAndHostels,
};
