/* Here could be a DB instead of this js file */

const {projects, clients} = require('../sampleData')

const {GraphQLObjectType} = require('graphql')

// Client type
const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => {

    }
})