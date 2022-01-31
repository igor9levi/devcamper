const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const {
  createRecord,
  findRecord,
  findAll,
  updateRecord,
  deleteRecord,
} = require('../models/modelsApi');
const Course = require('../models/Course');
const Bootcamp = require('../models/Bootcamp');

// @desc      Get all courses
// @route     GET /api/v1/courses
// @route     GET /api/v1/bootcamp/:bootcampId/courses
// @access    Public
exports.getCourses = asyncHandler(async (req, res, next) => {
  console.log(req.query);
  let query;

  if (req.params.bootcampId) {
    query = Course.find({ bootcamp: req.params.bootcampId });
  } else {
    // .populate('bootcamp') will return all bootcamp data
    query = Course.find().populate({
      path: 'bootcamp',
      select: 'name description',
    });
  }

  const courses = await query;

  res.status(200).json({ success: true, count: courses.length, data: courses });
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
// @route     POST /api/v1/courses
// @access    Private
exports.createCourse = asyncHandler(async (req, res, next) => {
  const courseRecord = await createRecord(course, { payload: req.body });

  res.status(201).json({ success: true, data: courseRecord });
});

// @desc      Update course
// @route     PUT /api/v1/courses/:id
// @access    Private
exports.updateCourse = asyncHandler(async (req, res, next) => {
  const courseRecord = await updateRecord(course, {
    // TODO: returns old value, not new ??
    payload: req.body,
    id: req.params.id,
    options: { new: true, runValidators: true },
  });

  if (!courseRecord) {
    return next(
      new ErrorResponse(`course not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: courseRecord });
});

// @desc      Delete course
// @route     DELETE /api/v1/course/:id
// @access    Public
exports.deleteCourse = asyncHandler(async (req, res, next) => {
  const courseRecord = await deleteRecord(course, { payload: req.body });

  if (!courseRecord) {
    return next(
      new ErrorResponse(
        `Error: course not found for given id of ${req.params.id}. Not in db.`,
        404
      )
    );
  }

  res.status(200).json({ success: true, data: {} });
});
