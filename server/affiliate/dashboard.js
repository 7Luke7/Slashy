const exntendedError = require("../errors/ExtendedError")
const { Affiliate, VerificationCode } = require("../models/model")
const nodemailer = require("nodemailer")
const bcrypt = require("bcrypt")

const get_affiliate = async (req, res, next) => {
    try {
        const affiliate = await Affiliate.findById(req.session.affiliate).select('-password')

        if (!affiliate) {
            throw new exntendedError("Affiliate doesn't exist. please try again.", 400)
        }

        res.status(200).json(affiliate)
    } catch (error) {
        next(error)
    }
}

const logout = async (req, res, next) => {
    try {  
        if (req.session.affiliate) {
            req.session.destroy((err) => {
                if (err) {
                    throw new exntendedError("Sign out could happen try again.", 500)
                }
            })
    
            res.status(200).json({message: "success"})
        } else {
            throw new exntendedError("You are not authorized", 401)
        }
    } catch (error) {
        next(error)
    }
}

const get_code = async (req, res, next) => {
    try {  
        const affiliate = await Affiliate.findById(req.session.affiliate)

        if (!affiliate) {
            throw new exntendedError("Affiliate wasn't found try again.", 400)
        }
        
        const check_code = await VerificationCode.findOne({ affiliateId: affiliate._id });
        if (check_code) {
            throw new exntendedError("We already sent you a code. check spam folder as well.", 400)
        }

        const verificationCode = Math.floor(1000 + Math.random() * 9000).toString();
        
        const expiryTime = new Date(Date.now() + 3 * 60 * 1000);
        await VerificationCode.create({ code: verificationCode, expiresAt: expiryTime, affiliateId: affiliate._id });       
        
        const transporter = nodemailer.createTransport({
            host: "mail.privateemail.com",
            port: 465,
            secure: true,
            auth: {
                user: "info@slashy.shop",
                pass: process.env.EMAIL_PASSWORD,
            },
            });

            async function main() {
                try {
                    const info = await transporter.sendMail({
                        from: '"Slashy" <info@slashy.shop>',
                        to: affiliate.email,
                        subject: "Password Reset Code",
                        html: `
                                <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
                            <h2 style="text-align: center;">Password Reset Code</h2>
                            <p style="text-align: center;">Use the following code to reset your password:</p>
                            <div style="background-color: #f4f4f4; border-radius: 5px; padding: 20px; text-align: center;">
                                <h3 style="margin-bottom: 20px;">Verification Code:</h3>
                                <p style="font-size: 24px; font-weight: bold;">${verificationCode}</p>
                            </div>
                            <p style="text-align: center; margin-top: 20px;">If you did not request a password reset, please ignore this email.</p>
                            <p style="text-align: center;">Thank you,<br>Slashy</p>
                        </div>
                        `
                    });
        
                    res.status(200).json({message: "success"})
                } catch (error) {
                    throw new exntendedError("Mail couldn't be sent server error, try again later.", 500)
                }
            }
            main()
    } catch (error) {
        next(error)
    }
}

const verify_code = async (req, res, next) => {
    try {
        const verification_code = await VerificationCode.findOne({affiliateId: req.session.affiliate})

        if (!verification_code) {
            throw new exntendedError("Code isn't sent or is expired, please click 'Get Code' button to receive new code.", 400)
        }

        if (verification_code.code !== req.body.client_code) {
            throw new exntendedError("Code provided by you isn't valid, try again.", 400)
        }

        await VerificationCode.findByIdAndDelete(verification_code._id)
        res.status(200).json({message: "Code valid."})
    } catch (error) {
        next(error)
    }
} 

const reset_password = async (req, res, next) => {
    try {
        if (req.body.password.trim().length < 8 ) {
            throw new exntendedError("Password must be at least 8 characters long without spaces.", 400)
        }

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
                        await Affiliate.findByIdAndUpdate(req.session.affiliate, {password: hash})

                        res.status(200).json({message: "Passowrd updated successfully."})
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

const add_affiliate_product = async (req, res, next) => {
    try {
        const link_with_affiliate = `${req.body.link}?affiliate=${req.session.affiliate}`
        const affiliate = await Affiliate.findOneAndUpdate(
            { 
                _id: req.session.affiliate, 
                "affiliateLinks.link": { $ne: link_with_affiliate }
            },
            { 
                $addToSet: { affiliateLinks: { link: link_with_affiliate } }
            },
            { 
                upsert: true
            }
        ).then(() => {
            res.status(200).json({message: "Link added successfully"})
        }).catch((err) => {
            next({message: "Link is already added.", status: 400})
        })           
    } catch (error) {
        next(error)
    }
}

const delete_affiliate_link = async (req, res, next) => {
    try {
        const affiliate = await Affiliate.findOneAndUpdate(
            { 
                _id: req.session.affiliate, 
            },
            {
                $pull: {
                    affiliateLinks: { _id: req.params.id }
                }
            }
        ).then(() => {
            res.status(200).json({message: "Link deleted successfully"})
        }).catch((err) => {
            next({message: "Link doesn't exist.", status: 400})
        })           
    } catch (error) {
        next(error)
    }
}

module.exports = {
    get_affiliate,
    logout,
    verify_code,
    get_code,
    delete_affiliate_link,
    reset_password,
    add_affiliate_product,
}