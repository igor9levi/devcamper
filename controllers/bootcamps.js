const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const {
  createRecord,
  findRecord,
  findAll,
  updateRecord,
  deleteRecord,
} = require('../models/modelsApi');
const { modelKeys } = require('../models/const');
const { bootcamp } = modelKeys;

// @desc      Get all bootcamps
// @route     GET /api/v1/bootcamps
// @access    Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamps = await findAll(bootcamp);

  res
    .status(200)
    .json({ success: true, count: bootcamps.length, data: bootcamps });
});

// @desc      Get single bootcamps
// @route     GET /api/v1/bootcamps/:id
// @access    Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcampRecord = await findRecord(bootcamp, { id: req.params.id });

  if (!bootcampRecord) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: bootcampRecord });
});

// @desc      Create new bootcamp
// @route     POST /api/v1/bootcamps
// @access    Private
exports.createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcampRecord = await createRecord(bootcamp, { payload: req.body });

  res.status(201).json({ success: true, data: bootcampRecord });
});

// @desc      Update bootcamp
// @route     PUT /api/v1/bootcamps/:id
// @access    Private
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcampRecord = await updateRecord(bootcamp, {
    // TODO: returns old value, not new ??
    payload: req.body,
    id: req.params.id,
    options: { new: true, runValidators: true },
  });

  if (!bootcampRecord) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: bootcampRecord });
});

// @desc      Delete bootcamp
// @route     DELETE /api/v1/bootcamp/:id
// @access    Public
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcampRecord = await deleteRecord(bootcamp, { payload: req.body });

  if (!bootcampRecord) {
    return next(
      new ErrorResponse(
        `Error: Bootcamp not found for given id of ${req.params.id}. Not in db.`,
        404
      )
    );
  }

  res.status(200).json({ success: true, data: {} });
});
