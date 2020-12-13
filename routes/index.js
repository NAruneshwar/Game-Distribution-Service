const gamesroutes = require('./games');
const commentroutes = require('./comments');
const reviewroutes = require('./reviews');
const loginroutes = require('./login');
const signuproutes = require('./signup');

const constructorMethod = (app) => {
    app.use('/comments', commentroutes);
    app.use('/reviews', reviewroutes);
    app.use('/games', gamesroutes);
    app.use('/login', loginroutes);
    app.use('/signup', signuproutes);
    app.get('/', (req,res) =>{
       res.render("posts/homepage",{title: "Home page"});
    });
    app.use('*', (req, res) => {
        res.status(404).render("posts/errors", { title: "Error", statusCode: "404", message: "The page that you are looking for does not exist!" })
    });
};

module.exports = constructorMethod;