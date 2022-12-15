const db = require("../models/index"),
    User = db.user,
    path = require("path"),
    getUserParams = body => {
        return {
            id: body.id,
            name: body.name,
            nickname: body.nickname,
            email: body.email,
            gender: body.gender
        };
    };


module.exports = {
    index: (req, res) => {
        res.render("index");
        //res.sendFile(path.join(__dirname, "../", "/views", "/index.html"));
    }

};


