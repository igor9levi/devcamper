const express = require('express');
const {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
} = require('../controllers/courses');

const Course = require('../models/Course');
const advancedResults = require('../middlewares/advancedResults');

// Adding mergeParams to enable to re-route from bootcamps to this sub-route
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(
    // .populate('bootcamp') will return all bootcamp data
    advancedResults(Course, { path: 'bootcamp', select: 'name description' }),
    getCourses
  )
  .post(createCourse);
router.route('/:id').get(getCourse).put(updateCourse).delete(deleteCourse);

module.exports = router;
