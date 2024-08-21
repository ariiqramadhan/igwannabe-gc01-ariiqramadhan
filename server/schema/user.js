const typeDefs = `#graphql

    type User {
        _id: ID
        name: String
        username: String!
        email: String!
        following: [User]
        followers: [User]
    }

    input NewUser {
        name: String
        username: String!
        email: String!
        password: String!
    }

    type AccessToken {
        access_token: String!
    }

    type Query {
        SearchUsers(username: String): [User]
        GetUser(id: ID): User
    }

    type Mutation {
        AddUser(newUser: NewUser): User
        Login(username: String, password: String): AccessToken
    }
`

module.exports = typeDefs;