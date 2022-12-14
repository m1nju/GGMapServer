const port = 80,
    express = require("express"),
    app = express(),
    errorController = require("./controllers/errorController");


app.set("port", process.env.PORT || 80);
app.use("/public", express.static("public"));

app.use(express.json());
app.use(
    express.urlencoded({
        extended: false
    })
);

app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/views/index.html");
});

app.get("/login", (req, res)=>{
    res.sendFile(__dirname + "/views/signin.html");
});

app.get("/signup", (req, res)=>{
    res.sendFile(__dirname + "/views/signup.html");
});
    

app.listen(app.get("port"), () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
});
  