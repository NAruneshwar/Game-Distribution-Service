// should contain the following functions
const mongoCollections = require("../config/mongoCollections.js");
let { ObjectId } = require("mongodb");
const users = mongoCollections.users;

const deleteProfileById = async (user_id) => {};

const getUserInfo = async (user_id) => {
  const usersCollect = await users();
  const user = await usersCollect.findOne({ _id: ObjectId(user_id) });
  if (user == null) throw "No game exist in the DB with that id";
  user._id = user._id.toString();
  return user;
};

module.exports = {
  deleteProfileById,
  getUserInfo,
};
