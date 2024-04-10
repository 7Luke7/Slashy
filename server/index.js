require("dotenv").config()
const express = require("express")
const app = express()
const PORT = process.env.PORT || 5000
const router = require("./router")
const cors = require("cors")
const {
    globalError,
} = require("./errors/CustomError")
const compression = require("compression")
const connect_database = require("./database")
const session = require("express-session")
const MongoStore = require("connect-mongo")

app.use(compression({
    level: 1
}))

app.set('trust proxy', 1);
const sess = session({
    secret: process.env.SESSION_SECRET,  
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.DATABASE_URL,
    }),
    cookie: {
        secure: true,
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week in milliseconds
        domain: ".slashy.shop",
        sameSite: 'strict', // Set SameSite attribute to 'Strict'
    }
})
const origin = process.env.URL

app.use(cors({
    origin: origin,
    credentials: true,
}))

app.use(sess)
app.use(express.json())
app.use("/api", router)
app.use(globalError)

const setup = async () => {
    try {
        await connect_database()
        app.listen(PORT, () => {
            console.log(`server is running on port ${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}

setup()
