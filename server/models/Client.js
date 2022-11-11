const mongoose = require('mongoose')

// Create a mongoose schema (!NOT GRAPHQL SCHEMA! but a DB schema)
const ClientSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    }
})

module.exports =  mongoose.model('Client', ClientSchema)