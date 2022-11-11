/* Here could be a DB instead of this js file */

const {projects, clients} = require('../sampleData')

const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList} = require('graphql')

// Client type -> set all the field of the requested GQL obj
const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        phone: {type: GraphQLString}
    })
})

// Project type -> set all the field of the requested GQL obj
const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        status: {type: GraphQLString},
        client: {
            // The type is custom and will be dynamically fetched with the request
            type: ClientType,
            resolve(parent, args) {
                return clients.find(client => client.id === parent.clientId)
            }
        }
    })
})

// To make a query, root object is necessary, here we configure the query
// The resolver will return the necessary data
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        // GET all client
        clients: {
            type: new GraphQLList(ClientType),
            resolve(parent, args) {
                return clients
            }
        },

        // GET client by ID
        client: {
            type: ClientType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                // Insert GQL query from DB
                return clients.find(client => client.id === args.id)
            }
        },

        // GET all projects
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(parent, args) {
                return projects
            }
        },

        // GET project by ID
        project: {
            type: ProjectType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                // Insert GQL query from DB
                return projects.find(project => project.id === args.id)
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})