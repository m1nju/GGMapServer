const port = 80,
    express = require("express"),
    app = express(),
    cookieParser = require("cookie-parser"),
    session = require("express-session"),
    passport = require("passport"),
    db = require("./models/index"),
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


app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/views/index.html");
});

app.get("/login", (req, res)=>{
    res.sendFile(__dirname + "/views/signin.html");
});

app.get("/signup", (req, res)=>{
    res.sendFile(__dirname + "/views/signup.html");
});
    
app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

app.listen(app.get("port"), () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
});
  