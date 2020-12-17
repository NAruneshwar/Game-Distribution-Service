// for data related to payment
const mongoCollections = require("../config/mongoCollections.js");
let objectId = require("mongodb").ObjectId;
const users = mongoCollections.users;
const userData = require('./users')

const addToGamersProfile = async (user_id, updateObject) => {
    console.log("this is user id:"+user_id)    
    console.log("this is to be posted in game_ids array"+updateObject)
    console.log("Done right!")
    return;
}

module.exports = {
    addToGamersProfile
}
