const typeDefs = `#graphql
    
    type Follow {
        _id: ID
        followingId: ID
        followerId: ID
        createdAt: String
        updatedAt: String,
        user: Author
    }
    
    input NewFollow {
        followingId: ID
    }

    type Mutation {
        FollowUser(newFollow: NewFollow): Follow
    }
`

module.exports = typeDefs;