const gamesData = require('./games');
const reviewsData = require('./reviews');
const userData = require('./users');


module.exports = { // Add other data files if required
    games: gamesData,
    reviews: reviewsData,
    login: userData
};