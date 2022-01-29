const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: '.env' });

// Load models
const Bootcamp = require('./models/Bootcamp');

// connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Read mocked data
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8')
);

// Seed DB with data
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);
    console.log('Data successfully feeded in DB!');
    process.exit();
  } catch (err) {
    console.log('Error: Seeding data failed with error: ', err);
  }
};

// Delete data from DB
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany(bootcamps);
    console.log('Data successfully destroyed from DB!');
    process.exit();
  } catch (err) {
    console.log('Error: Deleting data failed with error: ', err);
  }
};

// node seeder -i  #seed data
// node seeder -d  #delete data
if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
