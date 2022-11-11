// Mongoose is an Object Data Modeling (ODM) library for MongoDB and Nodejs.
// It manages relationships between data, provides schema validation,
// and is used to translate between objects in code and the representation of those objects in MongoDB
const mongoose = require('mongoose')

const connectDB = async () => {
    const connection = await mongoose.connect(process.env.MONGO_URI)

    console.log(`MongoDB connected: ${connection.connection.host}`.cyan.underline.bold)
}

module.exports = connectDB