// import all required files
const mongoCollections = require('../config/mongoCollections.js');
let { ObjectId } = require('mongodb');
const games = require('./games')
const users = require('./users')
const reviews = mongoCollections.reviews;


const reviewsByGameId = async(game_id)=>{
    const reviewsCollect = await reviews();
    const game = await games.getOne(game_id);
    if(game===null){
        throw `Game not found.`
    }
    const reviewslist = await reviewsCollect.find({"game_id":game_id}).toArray();
    return(reviewslist)
}

const deleteGameById= async(review_id)=>{
    const reviewsCollect = await reviews();
    const reviewsDelete = await reviewsCollect.deleteALL({review_id});
     if (deletionGame.deletedCount === 0) {
        throw `Could not delete Game with id of ${id}`;
      }
    return(reviewsDelete)
}

const addReviewForGame= async(game_id, userId, review, rating, media)=>{
    const game = await games.getOne(game_id);
    // const user = await users.check_usernames(userId)

    if(!review|| typeof(review)!='string') {
        throw 'You must provide a review in string format';
    }
    if(review.trim()=== ""){
        throw 'the given review is empty string please provide the review of the user';
    }
    if(!rating|| typeof(rating)!='string') {
        throw 'You must provide a review in string format';
    }
    if(rating.trim()=== ""){
        throw 'the given rating is empty string please provide the rating of the user';
    }
    try{
        age = Number(rating)
    }
    catch(e){
        throw 'Error provided rating is not a number.'
    }
    if(!media|| typeof(media)!='string') {
        throw 'You must provide a media';
    }
    if(rating.trim()=== ""){
        throw 'the given media is empty string';
    }

    let newReview ={
        game_id, 
        userId, 
        review, 
        rating, 
        media
    }
    const reviewsCollect = await reviews();
    const reviewsAdd = await reviewsCollect.insertOne(newReview);
    if (reviewsAdd.insertedCount === 0) throw 'Could not add Game please debug';
    const newId = reviewsAdd.insertedId;

    return newId.toString();
}

module.exports={
    reviewsByGameId,
    deleteGameById,
    addReviewForGame
}