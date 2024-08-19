const typeDefs = `#graphql
    
    type Follow {
        _id: ID
        followingId: ID
        followerId: ID
        createdAt: String
        updatedAt: String
    }
    
    input NewFollow {
        followingId: ID
        followerId: ID
        createdAt: String
        updatedAt: String
    }

    type Mutation {
        FollowUser(newFollow: NewFollow): Follow
    }
`

module.exports = typeDefs;