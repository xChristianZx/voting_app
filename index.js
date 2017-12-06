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

// Requiring Routes
const indexRoutes = require("./routes/index"),
  pollRoutes = require("./routes/poll");

const app = express();
mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, {
  useMongoClient: true
});
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use('/scripts', express.static(__dirname + "/node_modules/chart.js/dist"));
app.use(methodOverride("_method"));
app.use(flash());

// seedDB();

//express session
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

app.use("/", indexRoutes);
app.use("/poll", pollRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serving on ${PORT}`);
});
