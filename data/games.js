const mongoCollections = require('../config/mongoCollections.js');
let { ObjectId } = require('mongodb');
const games = mongoCollections.games;

const create = async (game) =>{
    const gamesCollect = await games();
    let newGame ={
        game
    };
    const insertInfo = await gamesCollect.insertOne(newGame);
    if (insertInfo.insertedCount === 0) throw 'Could not add Book';
    const newId = insertInfo.insertedId;

    return newId
}

module.exports = {
    create
}