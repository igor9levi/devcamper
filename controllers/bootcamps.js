const { createRecord } = require('../models/modelsApi');

// @desc      Get all bootcamps
// @route     GET /api/v1/bootcamps
// @access    Public
exports.getBootcamps = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Getting all bootcamps' });
};

// @desc      Get single bootcamps
// @route     GET /api/v1/bootcamps/:id
// @access    Public
exports.getBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Getting ${req.params.id} bootcamp` });
};

// @desc      Create new bootcamp
// @route     POST /api/v1/bootcamps
// @access    Private
exports.createBootcamp = async (req, res, next) => {
  console.log('my body: ', req.body);
  try {
    // TODO: refactor this to error handler wrapper
    const bootcamp = await createRecord('bootcamp', { payload: req.body });
    res.status(201).json({ success: true, data: bootcamp });
  } catch (err) {
    console.log(err); // TODO: add logger
    res.status(400).json({ success: false, err, data: {} });
  }
};

// @desc      Update bootcamp
// @route     PUT /api/v1/bootcamps/:id
// @access    Private
exports.updateBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Updated ${req.params.id} bootcamp` });
};

// @desc      Delete bootcamp
// @route     DELETE /api/v1/bootcamp/:id
// @access    Public
exports.deleteBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Deleted ${req.params.id} bootcamp` });
};
