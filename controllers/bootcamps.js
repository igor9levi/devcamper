const ErrorResponse = require('../utils/errorResponse');
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
exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await findAll(bootcamp);

    res
      .status(200)
      .json({ success: true, count: bootcamps.length, data: bootcamps });
  } catch (error) {
    // console.log(error); // TODO: add logger

    // res.status(400).json({ success: false, error, data: {} });
    next(new ErrorResponse(`Error: Could not fetch bootcamps`, 404));
  }
};

// @desc      Get single bootcamps
// @route     GET /api/v1/bootcamps/:id
// @access    Public
exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcampRecord = await findRecord(bootcamp, { id: req.params.id });

    if (!bootcampRecord) {
      return next(
        new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
      );
    }

    // todo: make return status generator function
    res.status(200).json({ success: true, data: bootcampRecord });
  } catch (error) {
    // console.log(error); // TODO: add logger
    next(error);
    // next(
    // new ErrorResponse(
    //   `Error: Bootcamp not found for given id of ${req.params.id}`,
    //   404
    // )
    // );
  }
};

// @desc      Create new bootcamp
// @route     POST /api/v1/bootcamps
// @access    Private
exports.createBootcamp = async (req, res, next) => {
  try {
    // TODO: refactor this to error handler wrapper
    const bootcamp = await createRecord(bootcamp, { payload: req.body });

    res.status(201).json({ success: true, data: bootcamp });
  } catch (error) {
    console.log(error); // TODO: add logger

    next(error);
    // res.status(400).json({ success: false, error, data: {} });
  }
};

// @desc      Update bootcamp
// @route     PUT /api/v1/bootcamps/:id
// @access    Private
exports.updateBootcamp = async (req, res, next) => {
  try {
    // TODO: refactor this to error handler wrapper
    const bootcamp = await updateRecord(bootcamp, {
      payload: req.body,
      id: req.params.id,
      options: { new: true, runValidators: true },
    });

    if (!bootcamp) {
      return next(
        new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
      );
      // return res.status(400).json({
      //   success: false,
      //   data: {},
      //   error: { message: `No record with id: ${req.params.id}` },
      // });
    }

    res.status(200).json({ success: true, data: bootcamp });
  } catch (error) {
    console.log(error); // TODO: add logger

    next(error);
    // res.status(400).json({ success: false, error, data: {} });
  }
};

// @desc      Delete bootcamp
// @route     DELETE /api/v1/bootcamp/:id
// @access    Public
exports.deleteBootcamp = async (req, res, next) => {
  try {
    // TODO: refactor this to error handler wrapper
    const bootcamp = await deleteRecord(bootcamp, { payload: req.body });

    if (!bootcamp) {
      return next(
        new ErrorResponse(
          `Error: Bootcamp not found for given id of ${req.params.id}. Not in db.`,
          404
        )
      );
      // return res.status(400).json({
      //   success: false,
      //   data: {},
      //   error: { message: `No record with id: ${req.params.id}` },
      // });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    console.log(error); // TODO: add logger

    next(error);
    // res.status(400).json({ success: false, error, data: {} });
  }
};
