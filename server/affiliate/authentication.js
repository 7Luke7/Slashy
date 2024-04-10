const { Affiliate } = require("../models/model");
const exntendedError = require("../errors/ExtendedError");
const bcrypt = require("bcrypt")

const sign_up = async (req, res, next) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    try {
        if (req.body.password.trim().length < 8 ) {
            throw new exntendedError("Password must be at least 8 characters long without spaces.", 400)
        }
        if (!emailRegex.test(req.body.email)) {
            throw new exntendedError("Email incorrect.", 400)
        }

        const check = await Affiliate.find({email: req.body.email})
        if (check.length) throw new exntendedError("User with email already exists.", 400)
  
        const saltRounds = 10

        bcrypt.genSalt(saltRounds, async function(err, salt) {
            try {
                if (err) {
                    throw new exntendedError("Error while hashing password", 500)
                }
                bcrypt.hash(req.body.password, salt, async function(err, hash) {
                    try {
                        if (err) {
                            throw new exntendedError("Error while hashing password", 500)
                        }
                        const new_affiliate = new Affiliate({
                            email: req.body.email,
                            password: hash,            
                        })
                
                        new_affiliate.save()
                
                        req.session.affiliate = new_affiliate._id
                        res.status(200).json({message: "success"}); 
                    } catch (error) {
                        next(error)
                    }
                });
            } catch (error) {
                next(error)
            }
        });
               
    } catch (error) {
        next(error)
    }
}  

const sign_in = async (req, res, next) => {
    try {
        const user = await Affiliate.findOne({email: req.body.email})

        if (!user) {
            throw new exntendedError("Email is incorrect modify it and try again.", 400)
        }

        bcrypt.compare(req.body.password, user.password, async function(err, result) {
            try {
                if (err) throw new exntendedError("Error occured on servers behalf while comparing password.", 500)
                if (!result) throw new exntendedError("Password is incorrect. try again.", 400)

                req.session.affiliate = user._id
                res.status(200).json({message: "success"})

            } catch (error) {
                next(error)
            }
        });
    } catch (error) {
        next(error)
    }
}

const verify_affiliate = (req, res, next) => {
    try {
        if(req.session.affiliate) {
            next()
        } else {
            throw new exntendedError("Client has no authority to access the page", 401)
        }
    } catch (error) {
        next(error)
    }
}
module.exports = {
    sign_up,
    verify_affiliate,
    sign_in
}