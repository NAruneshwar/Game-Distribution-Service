// import all required files
const mongoCollections = require('../config/mongoCollections.js');
let { ObjectId } = require('mongodb');
const reviews = mongoCollections.reviews;


const reviewsByGameId = async(game_id)=>{

}
const deleteGameById= async(review_id)=>{

}

const addReviewForGame= async(game_id)=>{

}

module.exports={
    reviewsByGameId,
    deleteGameById,
    addReviewForGame
}