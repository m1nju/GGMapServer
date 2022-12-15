const port = 80,
    express = require("express"),
    app = express(),
    cookieParser = require("cookie-parser"),
    session = require("express-session"),
    passport = require("passport"),
    db = require("./models/index"),
    flash = require("connect-flash"),
    usersController = require("./controllers/usersController"),
    errorController = require("./controllers/errorController");

app.set("port", process.env.PORT || 80);
app.use("/public", express.static("public"));
app.use(cookieParser("secret"));
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
    })
);

app.use(express.json());
app.use(
    express.urlencoded({
        extended: false
    })
);

db.sequelize.sync();
const User = db.user;

app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(flash());
app.use((req, res, next) => {
    res.locals.loggedIn = req.isAuthenticated();
    res.locals.currentUser = req.user;
    res.locals.flashMessages = req.flash();
    next();
  });


app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/views/index.html");
});
app.get("/users/fail", usersController.loginFail);
app.get("/users/login", usersController.login);
app.post("/users/login", usersController.authenticate, usersController.redirectView);
app.get("/users/signup", usersController.signup);
app.get("/users/create", usersController.signupSuccess);
app.post("/users/create", usersController.create, usersController.redirectView);

app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

app.listen(5000);
console.log('Running on http://localhost:' + 5000);
