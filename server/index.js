require('dotenv').config();
const colors = require('colors')

const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const cors = require('cors')

const connectDB = require('./config/db')

const schema = require('./schema/schema')
const port = process.env.PORT || 5000
const app = express()

// Connect to DB
connectDB()

// Middleware
// Always use cors as a function!! 1 hour of your debugging. Congrats!
app.use(cors())

// GraphiQL (like POSTMAN but for GQL) lib.
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development',
}))

app.listen(port, () => {
    console.log(`Server started on port: ${port}`)
})


