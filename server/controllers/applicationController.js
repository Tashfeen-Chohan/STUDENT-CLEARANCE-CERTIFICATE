const db = require("../db");

const newApplication = async (req, res) => {
  const { student_id, purpose } = req.body; // Extracts student_id and purpose from the request body
  try {
    // Check for duplicate applications (same student and purpose)
    const [duplicate] = await db.execute(
      "SELECT * FROM applications WHERE student_id = ? AND purpose = ?",
      [student_id, purpose]
    );
    if (duplicate.length > 0) {
      return res
        .status(400)
        .send({ message: "Duplicate application detected!" });
    }
    const [app] = await db.execute(
      // Insert a new application into the database
      "insert into applications (student_id, purpose) values (?, ?)",
      [student_id, purpose]
    );
    // Respond with success if the application is submitted
    res.status(200).send({ message: "Application submitted successfully!" });
  } catch (error) {
    res.status(500).send({ message: "Something went wrong" });
    console.log(error.message); // Logs error for debugging
  }
};
/*
const getAllApplications = async (req, res) => {
  try {
    const [allApplications] = await db.execute(
      "SELECT app.id, std.name, std.roll_no, std.semester, std.dept, app.purpose, app.comment, app.status FROM applications app INNER JOIN students std on app.student_id = std.id"
    );
    return res.status(200).send({ allApplications }); // Sends all applications as the response...The results are sent back to the client as JSON.
  } catch (error) {
    res.status(500).send({ message: "Something went wrong!" });
    console.log(error.message);
  }
};*/

const getAllApplications = async (req, res) => {
  try {
    console.log("Received request to get all applications"); // Log the request

    // Call the stored procedure
    const [rows] = await db.query("CALL GetAllApplications()");

    // Log the result to the console
    console.log("Applications retrieved:", rows);

    // Send the results as a response
    res.status(200).send({ allApplications: rows[0] });
  } catch (error) {
    console.error("Error retrieving applications:", error.message);
    res.status(500).send({ message: "Something went wrong!" });
  }
};

const getStudentApplications = async (req, res) => {
  const student_id = req.params.id; // Extracts the student ID from the request parameters
  try {
    const [stdApplications] = await db.query(
      "SELECT std.name, std.roll_no, std.semester, std.dept, app.purpose, app.comment, app.status FROM applications app INNER JOIN students std on app.student_id = std.id WHERE app.student_id = ?",
      [student_id]
    );
    res.status(200).send({ stdApplications }); // Sends the applications for the specific student
  } catch (error) {
    res.status(500).send({ message: "Something went wrong!" });
    console.log(error.message);
  }
};

const updateApplication = async (req, res) => {
  const app_id = req.params.id; // Extracts application ID from the request parameters
  const { status, comment } = req.body; // Extracts the status and comment from the request body
  try {
    await db.execute(
      // Update the application status and comment in the database
      "UPDATE applications SET status = ?, comment = ? WHERE id = ?",
      [status, comment, app_id]
    );
    res.status(200).send({ message: "Application updated successfully" }); // Sends success message
  } catch (error) {
    res.status(500).send({ message: "Something went wrong!" });
    console.log(error.message); // Logs error for debugging
  }
};

module.exports = {
  newApplication,
  getAllApplications,
  getStudentApplications,
  updateApplication,
};
