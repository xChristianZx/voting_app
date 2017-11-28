const express = require("express"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  session = require("express-session"),
  LocalStrategy = require("passport-local"),
  passportLocalMongoose = require("passport-local-mongoose"),
  User = require("./models/user");

mongoose.Promise = global.Promise;

const app = express();
mongoose.connect("mongodb://localhost/voting_app", { useMongoClient: true });
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.use(
  session({
    secret: "Duke was here",
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serving on ${PORT}`);
});
//*********** */
//  ROUTES
//*********** */

//HOME
app.get("/", (req, res) => {
  res.render("home");
});

//POLL
app.get("/poll", (req, res) => {
  res.render("poll");
});

//REGISTER
app.get("/register", (req, res) => {
  res.render("register");
});

//REGISTER - Create New User
app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const newUser = {
    username: username,
    password: password
  };
  User.register(new User({ username }), password, (err, user) => {
    if (err) {
      console.log(err);
      return res.render("register");
    }
    passport.authenticate("local")(req, res, () => {
      res.redirect("/secret");
    });
  });
});

//LOGIN
app.get("/login", (req, res) => {
  res.render("login");
});

//LOGIN-Authenticate
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
  }),
  (req, res) => {}
);

//LOGOUT
app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};

app.get("/secret", isLoggedIn, (req, res) => {
  res.render("secret");
});
