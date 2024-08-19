const typeDefs = `#graphql

    type Post {
        _id: ID
        content: String!
        tags: [String]
        imageUrl: String
        authorId: ID!
        comments: [Comment]
        likes: [Like]
        createdAt: String
        updateAt: String
    }

    input NewPost {
        content: String!
        tags: [String]
        imageUrl: String
        authorId: ID!
        comments: NewComment
        likes: NewLike
        createdAt: String
        updateAt: String
    }

    type Comment {
        content: String!
        username: String!
        createdAt: String
        updatedAt: String
    }

    input NewComment {
        content: String!
        username: String!
        createdAt: String
        updatedAt: String
    }

    type Like {
        username: String!
        createdAt: String
        updatedAt: String
    }

    input NewLike {
        username: String!
        createdAt: String
        updatedAt: String
    }

    type Query {
        GetPosts: [Post]
        GetPost(id: ID): Post
    }

    type Mutation {
        AddPost(newPost: NewPost): Post
        CommentPost(newComment: NewComment): Comment
        LikePost(newLike: NewLike): Like
    }
`

module.exports = typeDefs;