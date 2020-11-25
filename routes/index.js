const gamesroutes = require('./games')
const commentroutes = require('./comments')
const reviewroutes = require('./reviews')

const constructorMethod = (app) => {
    // app.use('/', ())  ----> USE THIS FOR LOADING DASHBOARD
    // app.use('games/', gamesroutes);
    // app.use('comments/', commentroutes);
    // app.use('reviews/', reviewroutes);

    app.use('*', (req, res) => {
        res.status(404).render("posts/errors", { title: "Error", statusCode: "404", message: "The page that you are looking for does not exist!" })
    });
};

module.exports = constructorMethod;