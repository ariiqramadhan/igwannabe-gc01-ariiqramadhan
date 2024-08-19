const typeDefs = `#graphql

    type User {
        _id: ID
        name: String
        username: String!
        email: String!
        password: String!
    }

    input NewUser {
        name: String
        username: String!
        email: String!
        password: String!
    }

    type Query {
        SearchUsers(name: String, username: String): [User]
        GetUser(id: ID): User
    }

    type Mutation {
        AddUser(newUser: NewUser): User
        Login(username: String, password: String): User
    }
`

module.exports = typeDefs;