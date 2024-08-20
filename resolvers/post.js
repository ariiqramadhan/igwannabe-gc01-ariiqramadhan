const { ObjectId } = require("mongodb");

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
        AddPost: async (_, args, contextValue) => {
            const { authentication, db } = contextValue;
            const { newPost } = args;
            const user = await authentication();
            const { id } = user;

            newPost.authorId = new ObjectId(id);
            newPost.comments = [];
            newPost.likes = [];
            newPost.createdAt = newPost.updatedAt = new Date();
            const posts = db.collection('Posts');
            await posts.insertOne(newPost);

            return newPost;
        },
        CommentPost: async (_, args, contextValue) => {
            const { authentication, db } = contextValue;
            const { newComment, postId } = args;
            const { username } = await authentication();

            newComment.username = username;
            newComment.updatedAt = newComment.createdAt = new Date();

            const posts = db.collection('Posts');
            await posts.updateOne({
                _id: new ObjectId(postId)
            },
            {
                $push: { comments: newComment }
            }); 

            return newComment;
        },
        LikePost: async (_, args, contextValue) => {
            const { authentication, db } = contextValue;
            const { postId } = args;
            const { username } = await authentication();

            const newLike = {
                username,
                createdAt: new Date(),
                updatedAt: new Date()
            }

            const posts = db.collection('Posts');
            await posts.updateOne({
                _id: new ObjectId(postId)
            },
            {
                $push: { likes: newLike }
            }); 

            return newLike;
        }
    }
}

module.exports = resolvers;