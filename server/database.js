require("dotenv").config()
const mongoose = require("mongoose")

const connect_database = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL)
    } catch (error) {
        console.log(error);
    }
}

module.exports = connect_database