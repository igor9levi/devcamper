const Bootcamp = require('./Bootcamp');

const models = {
  bootcamp: Bootcamp,
};

const getModel = (modelKey) => {
  const Model = models[modelKey];

  if (!Model) {
    throw new Error(`Cannot use ${modelKey} model. Model doesn't exist`);
  } else {
    return Model;
  }
};

exports.createRecord = async (modelKey, { payload }) => {
  const Model = getModel(modelKey);

  const modelInstance = Model.create(payload);

  return modelInstance;
};
