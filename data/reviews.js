// import all required files
const mongoCollections = require('../config/mongoCollections.js');
let objectId = require('mongodb').ObjectId;
const games = require('./games')
const users = require('./users')
const reviews = mongoCollections.reviews;

const check_id = async (gameid) => {
    if (!gameid || typeof gameid !== 'string') {
        throw `ID is not proper`
    }
    gameid = gameid.trim()
    if (gameid == "") {
        throw `ID should not be blank`
    }
    if (objectId.isValid(gameid) === false) {
        throw `ID is not valid`
    }
}

const reviewsByGameId = async (game_id) => {
    // check_id(game_id)
    const reviewsCollect = await reviews();
    const game = await games.getOne(game_id);
    if (game === null) {
        throw `Game not found.`
    }
    const reviewslist = await reviewsCollect.find({ "game_id": objectId(game_id) }).toArray();
    if (reviewslist == null) {
        throw `No Reviews Yet`
    }
    return reviewslist
}

// const deleteReviewById = async (review_id) => {
//     check_id(review_id)
//     const reviewsCollect = await reviews();
//     const reviewsDelete = await reviewsCollect.deleteOne({ _id: objectId(review_id) });
//     if (reviewsDelete.deletedCount === 0) {
//         throw `Could not delete review`;
//     }
//     return 1
// }

const addReviewForGame = async (game_id, userId, review, rating, media) => {
    check_id(game_id)
    check_id(userId)

    if (!review || typeof (review) != 'string') {
        throw 'You must provide a review in string format';
    }
    if (review.trim() === "") {
        throw 'the given review is empty string please provide the review of the user';
    }
    if (!rating || typeof (rating) != 'string') {
        throw 'You must provide a review in string format';
    }
    if (rating.trim() === "") {
        throw 'the given rating is empty string please provide the rating of the user';
    }
    try {
        age = Number(rating)
    }
    catch (e) {
        throw 'Error provided age is not a number.'
    }
    if (!media || typeof (media) != 'string') {
        throw 'You must provide a media';
    }
    if (rating.trim() === "") {
        throw 'The given media is empty string';
    }

    let newReview = {
        game_id: game_id,
        userId: userId,
        review: review,
        rating: rating,
        media: media
    }
    const reviewsCollect = await reviews();
    const reviewsAdd = await reviewsCollect.insertOne(newReview);
    if (reviewsAdd.insertedCount === 0) throw 'Could not add review';
    const newId = reviewsAdd.insertedId;

    return newId.toString();
}

module.exports = {
    reviewsByGameId,
    // deleteReviewById,
    addReviewForGame
}