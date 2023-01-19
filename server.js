if(process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");
const path = require("path");

const initializePassport = require("./passport_config");
initializePassport(passport,
        email => users.find(user => user.email === email),
        id => users.find(user => user.id === id)
);

users = [];

app.use(express.urlencoded({ extended: false}));
app.use(methodOverride("_method"));
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());

app.get("/", checkNotAuthenticated,(req, res) => {
    res.sendFile(__dirname + "/views/index.html",);
})

app.get("/index_l", checkAuthenticated, (req, res) => {
    res.sendFile(__dirname + "/views/index_loggedin.html");
})

app.get("/logowanie", checkNotAuthenticated, (req, res) => {
    res.render(__dirname + "/views/logowanie.ejs");
})

app.get("/rejestracja", checkNotAuthenticated, (req, res) => {
    res.render(__dirname + "/views/rejestracja.ejs");
})

app.get("/uslugi", (req, res) => {
    res.sendFile(__dirname + "/views/uslugi.html");
})

app.get("/partnerzy", checkNotAuthenticated, (req, res) => {
    res.sendFile(__dirname + "/views/partnerzy.html");
})

app.get("/partnerzy_l", checkAuthenticated, (req, res) => {
    res.sendFile(__dirname + "/views/partnerzy_loggedin.html");
})

app.get("/onas", checkNotAuthenticated,(req, res) => {
    res.sendFile(__dirname + "/views/onas.html");
})

app.get("/onas_l", checkAuthenticated, (req, res) => {
    res.sendFile(__dirname + "/views/onas_loggedin.html");
})

app.get("/kontakt", checkNotAuthenticated,(req, res) => {
    res.sendFile(__dirname + "/views/kontakt.html");
})

app.get("/kontakt_l", checkAuthenticated, (req, res) => {
    res.sendFile(__dirname + "/views/kontakt_loggedin.html")
})

app.post("/rejestracja", checkNotAuthenticated,  async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        res.redirect("/logowanie");
    } catch{
        res.redirect("/rejestracja");
    }
})

app.post("/logowanie", checkNotAuthenticated, passport.authenticate("local",{
    successRedirect: "/index_l",
    failureRedirect: "/logowanie",
    failureFlash: true
}))

app.delete("/wyloguj", (req, res, next) =>{
    req.logOut(function (err){
        if (err) { return next(err);}
        res.redirect("/");
    })
})

function checkAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/logowanie");
}

function checkNotAuthenticated(req, res, next){
    if (req.isAuthenticated()){
        return res.redirect("/index_l");
    }
    next();
}

app.delete("/usun_uzytkownika",(req, res, next) => {
    req.logOut(function (err){
        if(err) {return next(err);}
    })
    for(var i=0; i<=users.length-1; i++){
        if(users[i] === user){
            users.splice(i, 1);
        }
    }
    res.redirect("/");
})

app.use(express.static(path.join(__dirname, "/views")));

app.listen(3000);