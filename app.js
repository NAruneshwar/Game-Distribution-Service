const express = require('express');
const app = express()
const session = require('express-session');
const cookieParser = require('cookie-parser');
const configRoutes = require('./routes')
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const static = express.static(__dirname + '/public');
const exphbs = require("express-handlebars");
app.use("/public", static);
app.use(cookieParser())
app.use(express.json())
// app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));
app.engine('handlebars', exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(
    session({
        name: 'gamedistribution',
        secret: 'cookieforgames',
        resave: false,
        saveUninitialized: true
    }));

configRoutes(app)

app.listen(3000, () => {
    console.log("Connected to the server at http://localhost:3000/");
})