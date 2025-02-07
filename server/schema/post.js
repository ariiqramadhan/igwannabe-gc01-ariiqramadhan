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
        updatedAt: String
        author: Author
    }

    type Author {
        username: String
    }

    input NewPost {
        content: String!
        tags: [String]
        imageUrl: String
    }

    type Comment {
        content: String!
        username: String!
        createdAt: String
        updatedAt: String
    }

    input NewComment {
        content: String!
    }

    type Like {
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
        CommentPost(newComment: NewComment, postId: ID): Comment
        LikePost(postId: ID): Like
    }
`

module.exports = typeDefs;