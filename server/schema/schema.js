/* The DB models */
const Project = require('../models/Project')
const Client = require('../models/Client')

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLEnumType
} = require('graphql')

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
// The type:ClientType is custom and will be dynamically fetched with the request
const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        status: {type: GraphQLString},
        client: {
            type: ClientType,
            resolve(parent, args) {
                return Client.findById(parent.clientId)
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
                name: {type: GraphQLNonNull(GraphQLString)},
                email: {type: GraphQLNonNull(GraphQLString)},
                phone: {type: GraphQLNonNull(GraphQLString)},
            },
            resolve(parent, args) {
                return Client.findByIdAndUpdate(args.id, {
                    // Update query
                    name: args.name,
                    email: args.email,
                    phone: args.phone
                })
            }
        },


        // Add Project - POST
        addProject: {
            type: ProjectType,
            args: {
                name: {type: GraphQLNonNull(GraphQLString)},
                description: {type: GraphQLNonNull(GraphQLString)},
                status: {
                    type: new GraphQLEnumType({
                        name: 'ProjectStatus',
                        values: {
                            new: {value: 'Not Started'},
                            progress: {value: 'In Progress'},
                            completed: {value: 'Completed'},
                        },
                    }),
                    defaultValue: 'Not Started',
                },
                clientId: {type: GraphQLNonNull(GraphQLID)},
            },
            resolve(parent, args) {
                const project = new Project({
                    name: args.name,
                    description: args.description,
                    status: args.status,
                    clientId: args.clientId,
                });

                return project.save();
            },
        },


        // Update a Project - PATCH
        updateProject: {
            type: ProjectType,
            args: {
                id: {type: GraphQLNonNull(GraphQLID)},
                name: {type: GraphQLString},
                description: {type: GraphQLString},
                status: {
                    type: new GraphQLEnumType({
                        name: 'ProjectStatusUpdate',
                        values: {
                            new: {value: 'Not Started'},
                            progress: {value: 'In Progress'},
                            completed: {value: 'Completed'},
                        },
                    }),
                },
            },
            resolve(parent, args) {
                return Project.findByIdAndUpdate(
                    args.id,
                    {
                        $set: {
                            name: args.name,
                            description: args.description,
                            status: args.status,
                        },
                    },
                    {new: true}
                );
            },
        },


        // Delete a Project - DELETE
        deleteProject: {
            type: ProjectType,
            args: {
                id: {type: GraphQLNonNull(GraphQLID)},
            },
            resolve(parent, args) {
                return Project.findByIdAndRemove(args.id);
            },
        },

    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
})