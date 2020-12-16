const dbConnection = require('./mongoConnection');

const getCollectionFn = (collection) => {
    let _col = undefined
    return async () => {
        if (!_col) {
            const db = await dbConnection();
            _col = await db.collection(collection);
        }
        return _col
    };
};

module.exports = {
    users: getCollectionFn('Users'),
    games: getCollectionFn('Games'),
    reviews: getCollectionFn('Reviews'),
    comments: getCollectionFn('Comments'),
    admin: getCollectionFn('Admin')

    //define collections here
};