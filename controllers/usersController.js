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
    authenticate: passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/users/fail",
        failureFlash: "Failed to login.",
        successFlash:"Logged in!"
    }),

    create: async(req,res, next) => {
        if(req.skip) next();
        let userParams = getUserParams(req.body);
        
        try { 
            let user = new User(userParams);
            if(await User.findOne({ where: {nickname:userParams.nickname}})) {
                //req.flash("error", "중복 닉네임입니다");
                res.locals.redirect="/users/signup";
            }

            User.register(user, req.body.password, (error, user)=>{
                if(user){
                    //req.flash("success", `반가워요 ${user.nickname}님!`);
                    res.locals.redirect = "/users/create";
                    res.locals.user = user;
                    next();
                }else{
                    res.locals.redirect = "/users/signup";
                    console.log(`Error from signup : ${error.message}`);
                    //req.flash("error", "중복 아이디입니다");
                    next(error);
                }
            });
        } catch (error) {
            console.log(`Error from signup ~ : ${error.message}`);
            res.locals.redirect="/users/signup";
            req.flash("error", "Failed to signup");
            next(error);
        };
    }, 

    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if(redirectPath!= undefined) res.redirect(redirectPath);
        else next();
    },

    login: (req, res) => {
        res.render("signin");
    }, 

    loginFail: (req, res) => {
        res.render("signin_fail");
    }, 

    signup: (req, res) => {
        res.render("signup");
    },
    
    signupSuccess: (req, res)=>{
        res.render("index");
    },

    logout: (req, res, next)=>{
        req.logout((err)=>{
            res.locals.redirect="/"
            next();
        })
    },

};


