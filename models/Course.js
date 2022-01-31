const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Please add a course title'],
  },
  description: {
    type: String,
    required: [true, 'Please add description'],
  },
  weeks: {
    type: String,
    required: [true, 'Please add number of weeks'],
  },
  tuition: {
    type: Number,
    required: [true, 'Please add a tuition cose'],
  },
  minimumSkill: {
    type: String,
    required: [true, 'Please add minimum skill required'],
    enum: ['beginner', 'intermediate', 'advanced'],
  },
  scolarshipAvailable: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  bootcamp: {
    // When new document, it creates ObjectId
    type: mongoose.Schema.ObjectId,
    // Which model to reference
    ref: 'Bootcamp',
    required: [true, 'Course needs to have referenced Bootcamp'],
  },
});

CourseSchema.statics.getAverageCost = async function (bootcampId) {
  console.log('Calculating avg cost...');

  const aggregateSchema = await this.aggregate([
    { $match: { bootcamp: bootcampId } },
    { $group: { _id: '$bootcamp', averageCost: { $avg: '$tuition' } } },
  ]);

  try {
    await this.model('Bootcamp').findByIdAndUpadate(bootcampId, {
      averageCost: Math.ceil(aggregateSchema[0].averageCost / 10) * 10,
    });
  } catch (err) {
    console.error(err);
  }
};

// Call getAverageCost after save
CourseSchema.post('save', function () {
  this.constructor.getAverageCost(this.bootcamp);
});

// Call getAverageCost after remove
CourseSchema.pre('remove', function () {
  this.constructor.getAverageCost(this.bootcamp);
});

module.exports = mongoose.model('Course', CourseSchema);
