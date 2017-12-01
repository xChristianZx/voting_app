const express = require("express"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  flash = require("connect-flash"),
  methodOverride = require("method-override"),
  seedDB = require("./seed"),
  passport = require("passport"),
  session = require("express-session"),
  LocalStrategy = require("passport-local"),
  passportLocalMongoose = require("passport-local-mongoose"),
  User = require("./models/user"),
  Poll = require("./models/poll"),
  keys = require("./config/keys");

mongoose.Promise = global.Promise;

const app = express();
mongoose.connect(keys.mongoURI, { useMongoClient: true });
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

seedDB();

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
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

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
  Poll.find({}, (err, allPolls) => {
    if (err) {
      console.log(err);
    } else {
      res.render("poll", { polls: allPolls });
    }
  });
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
    successFlash: "Welcome",
    failureRedirect: "/login",
    failureFlash: true
  })
);

//LOGOUT
app.get("/logout", (req, res) => {
  req.logout();
  req.flash("success", "You have been successfully logged out");
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
