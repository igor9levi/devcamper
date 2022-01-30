const Bootcamp = require('./Bootcamp');
const Course = require('./Course');
const { modelKeys } = require('./const');

const models = {
  [modelKeys.bootcamp]: Bootcamp,
  [modelKeys.course]: Course,
};

const getModel = (modelKey) => {
  const Model = models[modelKey];

  if (!Model) {
    throw new Error(`Cannot use ${modelKey} model. Model doesn't exist`);
  } else {
    return Model;
  }
};

exports.findAll = async (modelKey, { query }) => {
  const Model = getModel(modelKey);

  const modelInstance = Model.find(query);

  return modelInstance;
};

exports.findRecord = async (modelKey, { id }) => {
  const Model = getModel(modelKey);

  const modelInstance = Model.findById(id);

  return modelInstance;
};

exports.createRecord = async (modelKey, { payload }) => {
  const Model = getModel(modelKey);

  const modelInstance = Model.create(payload);

  return modelInstance;
};

exports.updateRecord = async (modelKey, { id, payload, ...options }) => {
  const Model = getModel(modelKey);

  const modelInstance = Model.findByIdAndUpdate(id, payload, { ...options });

  return modelInstance;
};

exports.deleteRecord = async (modelKey, { id }) => {
  console.log('modelKey', modelKey);
  const Model = getModel(modelKey);
  console.log('check model: ', Model);

  const modelInstance = Model.findByIdAndDelete(id);

  return modelInstance;
};
