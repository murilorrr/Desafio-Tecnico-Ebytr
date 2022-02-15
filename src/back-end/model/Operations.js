const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createOne = async (collection, entity) => {
  try {
    const result = await connection()
      .then((db) => db.collection(collection)
        .insertOne(entity));
    return result.ops.pop() || null;
  } catch (error) {
    return error.message;
  }
};

const getOneByEmail = async (collection, email) => {
  try {
    const result = await connection()
      .then((db) => db.collection(collection)
        .find({ email }).toArray());
    return result.length > 0 ? result : null;
  } catch (error) {
    return error.message;
  }
};

const getAll = async (collection) => {
  try {
    const result = await connection()
      .then((db) => db.collection(collection)
        .find({})
        .toArray());
    return result || null;
  } catch (error) {
    return error.message;
  }
};

const getOne = async (collection, email, password) => {
  try {
    const result = await connection()
      .then((db) => db.collection(collection)
        .findOne({ email, password }));
    return result || null;
  } catch (error) {
    return error.message;
  }
};

const deleteAll = async (collection) => {
  try {
    await connection().then((db) => db.collection(collection).deleteMany({}));
    return true;
  } catch (error) {
    console.log('not deleted collection');
    return error.message;
  }
};

const deleteOne = async (collection, id) => {
  try {
    const result = await connection()
      .then((db) => db.collection(collection)
        .findOneAndDelete(
          { _id: ObjectId(id) },
          { returnOriginal: 'after' },
        ));
    return result.value || null;
  } catch (error) {
    return error.message;
  }
};

const updateOne = async (collection, entity, id) => {
  try {
    const result = await connection()
      .then((db) => db.collection(collection)
        .findOneAndUpdate(
          { _id: ObjectId(id) },
          { $set: entity },
          { returnDocument: 'after' },
        ));
    return result.value || null;
  } catch (error) {
    return error.message;
  }
};

const getById = async (collection, id) => {
  try {
    const result = await connection()
      .then((db) => db.collection(collection)
        .findOne({ _id: ObjectId(id) }));
    return result || null;
  } catch (err) {
    return err.message;
  }
};

module.exports = (collection) => ({
  createOne: (entity) => createOne(collection, entity),
  getAll: () => getAll(collection),
  getOne: (email, password) => getOne(collection, email, password),
  getOneByEmail: (email) => getOneByEmail(collection, email),
  deleteAll: () => deleteAll(collection),
  updateOne: (entity, userId) => updateOne(collection, entity, userId),
  deleteOne: (userId) => deleteOne(collection, userId),
  getById: (id) => getById(collection, id),
});
