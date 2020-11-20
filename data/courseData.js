const mongoose = require("mongoose");
const courseSchema = require("../schema/courseSchema");
const dbCon = require("../util/dbConnection");
/***===========panding------------------- */
module.exports.addCourse = async (req, res) => {
  try {
    console.log(req.body);

    const Course = mongoose.model("Course");
    const courseExist = await Course.findOne({ ccode: req.body.ccode });
    console.log(courseExist);
    if (courseExist)
      return res.status(200).json({ responce: "course already exist" });
    let course = new courseSchema(req.body);
    await course.save(function (err, data) {
      if (err) {
        console.log(err);
        res.status(403).json({ responce: "failed" });
      } else {
        console.log(data);
        res.status(200).json({ responce: "success" });
      }
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.getCourse = async (req, res) => {
  try {
    const Course = mongoose.model("Course");
    const courseExist = await Course.find({});
    console.log(courseExist);
    //if(courseExist)
    res.status(200).json({ responce: courseExist });
    //else res.status()
  } catch (err) {
    console.log(err);
  }
};
