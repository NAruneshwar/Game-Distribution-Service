const path = require("path")
const gamesroutes = require("./games");
const reviewroutes = require("./reviews");
const loginroutes = require("./login");
const signuproutes = require("./signup");
const adminroutes = require("./admin");
const profileroutes = require("./profile");
const paymentroutes = require("./payment");

const constructorMethod = (app) => {
  app.use("/admin", adminroutes);
  app.use('/about',(req,res)=>{
    res.status(200).sendFile(path.resolve("public/about.html"))
  })
  app.use("/profile", profileroutes);
  app.use("/reviews", reviewroutes);
  app.use("/games", gamesroutes);
  app.use("/login", loginroutes);
  app.use("/signup", signuproutes);
  app.use("/payment", paymentroutes);
  app.get("/", (req, res) => {
    res.redirect('/games/')
  });
  app.use("*", (req, res) => {
    res.status(404).render("posts/errors", {
      title: "Error",
      statusCode: "404",
      message: "The page that you are looking for does not exist!",
    });
  });
};

module.exports = constructorMethod;
