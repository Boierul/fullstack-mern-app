require('dotenv').config();
const colors = require('colors')

const express = require('express')
const {graphqlHTTP} = require('express-graphql')

const connectDB = require('./config/db')

const schema = require('./schema/schema')
const port = process.env.PORT || 5000
const app = express()


// Conncect to DB
connectDB()

// GraphiQL (like POSTMAN but for GQL) lib.
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV,
}))

app.listen(port, () => {
    console.log(`Server started on port: ${port}`)
})
