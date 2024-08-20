const resolvers = {
    Query: {
        GetPosts: () => {
            return;
        },
        GetPost: (_, args) => {
            return args;
        }
    },
    Mutation: {
        AddPost: (_, args) => {
            return args;
        },
        CommentPost: (_, args) => {
            return args;
        },
        LikePost: (_, args) => {
            return args;
        }
    }
}

module.exports = resolvers;