const express = require('express')
const {graphqlHTTP} = require('express-graphql')

const schema = require('./schema/schema')
const port = process.env.PORT || 5000
const app = express()

// GraphiQL (like POSTMAN but for GQL)should be set to process.env.NODE_ENV === 'development' instead of true,
// in order to set the env var of the project. But the thing is not working,
// even with dotenv lib.

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}))

app.listen(port, () => {
    console.log(`Server started on port: ${port}`)
})
