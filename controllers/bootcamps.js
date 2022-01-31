const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const Bootcamp = require('../models/Bootcamp');

// @desc      Get all bootcamps
// @route     GET /api/v1/bootcamps
// @access    Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  console.log(req.query);

  const bootcamps = await Bootcamp.find(req.query).populate('courses');

  res
    .status(200)
    .json({ success: true, count: bootcamps.length, data: bootcamps });
});

// @desc      Get single bootcamps
// @route     GET /api/v1/bootcamps/:id
// @access    Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcampRecord = await Bootcamp.findById(req.params.id);

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
  const bootcampRecord = await Bootcamp.create(req.body);

  res.status(201).json({ success: true, data: bootcampRecord });
});

// @desc      Update bootcamp
// @route     PUT /api/v1/bootcamps/:id
// @access    Private
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcampRecord = await Bootcamp.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!bootcampRecord) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: bootcampRecord });
});

// @desc      Delete bootcamp
// @route     DELETE /api/v1/bootcamp/:id
// @access    Private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  // findByIdAndDelete will not trigger 'remove' middleware in BootcampSchema.pre()
  // Need to use findById and then call remove() on returned record
  const bootcampRecord = await Bootcamp.findById(req.params.id);

  if (!bootcampRecord) {
    return next(
      new ErrorResponse(
        `Error: Bootcamp not found for given id of ${req.params.id}. Not in db.`,
        404
      )
    );
  }

  bootcampRecord.remove();

  res.status(200).json({ success: true, data: {} });
});

// @desc      Upload photo to bootcamp
// @route     PUT /api/v1/bootcamp/:id/photo
// @access    Private
exports.bootcampPhotoUpload = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(
        `Error: Bootcamp not found for given id of ${req.params.id}. Not in db.`,
        404
      )
    );
  }

  if (!req.files) {
    return next(new ErrorResponse(`Please upload the file`, 400));
  }

  const file = req.files.file;

  // Make sure file is photo
  if (!file.mimetype.startsWith('image')) {
    return next(new ErrorResponse(`Please upload the an image file`, 400));
  }

  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload the an image file less then size of ${process.env.MAX_FILE_UPLOAD}`,
        400
      )
    );
  }

  // Create custom filename - can append id, timestamp...
  file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`;

  // Upload file to upload dir
  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.error(err);
      return next(
        new ErrorResponse(`Problem with file upload: ${file.name}`, 500)
      );
    }

    await Bootcamp.findByIdAndUpdate(req.params.id, { photo: file.name });

    res.status(200).json({ success: true, data: file.name });
  });
});
