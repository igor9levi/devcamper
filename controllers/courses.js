const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const Course = require('../models/Course');
const Bootcamp = require('../models/Bootcamp');

// @desc      Get all courses
// @route     GET /api/v1/courses
// @route     GET /api/v1/bootcamps/:bootcampId/courses
// @access    Public
exports.getCourses = asyncHandler(async (req, res, next) => {
  if (req.params.bootcampId) {
    // For particular bootcamp we will return all courses with no pagination
    const courses = await Course.find({ bootcamp: req.params.bootcampId });
    return res
      .status(200)
      .json({ success: true, count: courses.length, data: courses });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

// @desc      Get single course
// @route     GET /api/v1/courses/:id
// @access    Public
exports.getCourse = asyncHandler(async (req, res, next) => {
  const courseRecord = await Course.findById(req.params.id).populate({
    path: 'bootcamp',
    select: 'name description',
  });

  if (!courseRecord) {
    return next(
      new ErrorResponse(`course not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: courseRecord });
});

// @desc      Create new course
// @route     POST /api/v1/bootcamp/:bootcampId/courses
// @access    Private
exports.createCourse = asyncHandler(async (req, res, next) => {
  // We get bootcampId in req, but bootcamp is a field of Course Model that's wy we
  // want this info to be in req.body
  req.body.bootcamp = req.params.bootcampId;
  const bootcamp = await Bootcamp.findById(req.params.bootcampId);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`No bootcamp with id of ${req.params.bootcampId}`, 404)
    );
  }
  const courseRecord = await Course.create(req.body);

  res.status(201).json({ success: true, data: courseRecord });
});

// @desc      Update course
// @route     PUT /api/v1/courses/:id
// @access    Private
exports.updateCourse = asyncHandler(async (req, res, next) => {
  let courseRecord = await Course.findById(req.params.id);

  if (!courseRecord) {
    return next(
      new ErrorResponse(`course not found with id of ${req.params.id}`, 404)
    );
  }

  courseRecord = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true, // To return newly updated value
    runValidators: true,
  });

  res.status(200).json({ success: true, data: courseRecord });
});

// @desc      Delete course
// @route     DELETE /api/v1/course/:id
// @access    Public
exports.deleteCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return next(
      new ErrorResponse(
        `Error: course not found for given id of ${req.params.id}. Not in db.`,
        404
      )
    );
  }

  await course.remove();

  res.status(200).json({ success: true, data: {} });
});
