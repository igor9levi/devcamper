const express = require('express');
const {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
} = require('../controllers/courses');

// Adding mergeParams to enable to re-route from bootcamps to this sub-route
const router = express.Router({ mergeParams: true });

router.route('/').get(getCourses);

module.exports = router;
