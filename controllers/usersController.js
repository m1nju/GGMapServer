const db = require("../models/index"),
    User = db.user,
    passport=require("passport"),
    httpStatus = require("http-status-codes"),
    path = require("path"),
    getUserParams = body => {
        return {
            id: body.id,
            password: body.password,
            password2: body.password2,
            name: body.name,
            nickname: body.nickname,
            email: body.email,
            birthdate: body.birthdate,
            gender: body.gender
        };
    };

module.exports = {
    create: async(req,res, next) => {
        if(req.skip) next();
        let userParams = getUserParams(req.body);
        
        try { 
            let user = new User(userParams);
            if(await User.findOne({ where: {nickname:userParams.nickname}})) {
                res.locals.redirect="/users/signup";
            }

            User.register(user, req.body.password, (error, user)=>{
                if(user){
                    res.locals.redirect = "/users/create";
                    res.locals.user = user;
                    next();
                }else{
                    res.locals.redirect = "/users/signup";
                    console.log(`Error from signup : ${error.message}`);
                    next(error);
                }
            });
        } catch (error) {
            console.log(`Error from signup ~ : ${error.message}`);
            res.locals.redirect="/users/signup";
            next(error);
        };
    }, 

    signup: (req, res) => {
        res.sendFile(path.join(__dirname, "../", "/views", "/signup.html"));
    },
    
    signupSuccess: (req, res)=>{
        res.sendFile(path.join(__dirname, "../", "/views", "/index.html"));
    }

};


