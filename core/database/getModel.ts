import mongoose, { Model, Schema } from "mongoose";

const getModel = <T, P = Model<T>>(
  database: typeof mongoose,
  modelName: string,
  schema: Schema
) => {
  let model;
  try {
    model = database.model<T, P>(modelName);
  } catch (err) {
    model = database.model<T, P>(modelName, schema);
  }
  return model;
};

export default getModel;
