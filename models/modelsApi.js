const Bootcamp = require('./Bootcamp');
const { modelKeys } = require('./const');

const models = {
  [modelKeys.bootcamp]: Bootcamp,
};

const getModel = (modelKey) => {
  const Model = models[modelKey];

  if (!Model) {
    throw new Error(`Cannot use ${modelKey} model. Model doesn't exist`);
  } else {
    return Model;
  }
};

exports.findAll = async (modelKey) => {
  const Model = getModel(modelKey);

  const modelInstance = Model.find();

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
  const Model = getModel(modelKey);

  const modelInstance = Model.findByIdAndRemove(id);

  return modelInstance;
};
