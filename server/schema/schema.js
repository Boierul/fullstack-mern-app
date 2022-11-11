/* The DB models */
const Project = require('../models/Project')
const Client = require('../models/Client')

const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull} = require('graphql')
const {extendSchemaImpl} = require("graphql/utilities/extendSchema");

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
                return Client.findById(parent.id)
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
                return Client.find()
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
                return Client.findById(args.id)
            }
        },

        // GET all projects
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(parent, args) {
                return Project.find()
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
                return Project.findById(args.id)
            }
        }
    }
})


// Make mutations (POST,PATCH,DELETE)
// The resolver will return the necessary data if needed
const RootMutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        // Add Client - POST
        addClient: {
            type: ClientType,
            args: {
                name: {type: GraphQLNonNull(GraphQLString)},
                email: {type: GraphQLNonNull(GraphQLString)},
                phone: {type: GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args) {
                // Create a new Client mongoose model
                const client = new Client({
                    name: args.name,
                    email: args.email,
                    phone: args.phone
                })

                return client.save()

                // Alternatively this could be done by returning:
                //     return Client.create({
                //                     name: args.name,
                //                     email: args.email,
                //                     phone: args.phone
                //                 })
            }
        },

        // Delete a Client - DELETE
        deleteClient: {
            type: ClientType,
            args: {
                id: {type: GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args) {
                // Delete the projects related to the client
                Project.find({clientId: args.id}).then((projects) => {
                    projects.forEach((project) => {
                        project.remove();
                    });
                });

                // Mongoose method of removing an object
                return Client.findByIdAndRemove(args.id)
            }
        },

        // Update a Client - PATCH
        updateClient: {
            type: ClientType,
            args: {
                id: {type: GraphQLNonNull(GraphQLID)},
                name: {type:GraphQLNonNull(GraphQLString)},
                email: {type:GraphQLNonNull(GraphQLString)},
                phone: {type:GraphQLNonNull(GraphQLString)},
            },
            resolve(parent, args) {
                return Client.findByIdAndUpdate(args.id, {
                    // Update query
                    name: args.name,
                    email: args.email,
                    phone: args.phone
                })
            }
        }

    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
})