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

    res.status(200).json({ success: true, data: bootcamps });
  } catch (error) {
    console.log(error); // TODO: add logger

    res.status(400).json({ success: false, error, data: {} });
  }
};

// @desc      Get single bootcamps
// @route     GET /api/v1/bootcamps/:id
// @access    Public
exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcampRecord = await findRecord(bootcamp, { id: req.params.id });

    if (!bootcampRecord) {
      // todo: repeated 3x abstract this to function
      return res.status(400).json({
        success: false,
        data: {},
        error: { message: `No record with id: ${req.params.id}` },
      });
    }

    // todo: make return status generator function
    res.status(200).json({ success: true, data: bootcampRecord });
  } catch (error) {
    console.log(error); // TODO: add logger

    res.status(400).json({ success: false, error, data: {} });
  }
  res
    .status(200)
    .json({ success: true, msg: `Getting ${req.params.id} bootcamp` });
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

    res.status(400).json({ success: false, error, data: {} });
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
      return res.status(400).json({
        success: false,
        data: {},
        error: { message: `No record with id: ${req.params.id}` },
      });
    }

    res.status(200).json({ success: true, data: bootcamp });
  } catch (error) {
    console.log(error); // TODO: add logger

    res.status(400).json({ success: false, error, data: {} });
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
      return res.status(400).json({
        success: false,
        data: {},
        error: { message: `No record with id: ${req.params.id}` },
      });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    console.log(error); // TODO: add logger

    res.status(400).json({ success: false, error, data: {} });
  }
};
