const { ObjectId } = require("mongodb");
const redis = require("../config/redisconnection");
const { GraphQLError } = require("graphql");

const resolvers = {
    Query: {
        GetPosts: async (_, args, contextValue) => {
            const cache = await redis.get('post:all');
            if (cache) {
                return JSON.parse(cache);
            }
            const { authentication, db } = contextValue;
            const user = await authentication();

            const posts = db.collection('Posts');
            const agg = [
                {
                  '$sort': {
                    'createdAt': -1
                  }
                }, 
                {
                  '$lookup': {
                    'from': 'Users', 
                    'localField': 'authorId', 
                    'foreignField': '_id', 
                    'as': 'author'
                  }
                }, {
                  '$project': {
                    'author': {
                      'name': 0, 
                      'email': 0, 
                      '_id': 0, 
                      'password': 0
                    }
                  }
                }, {
                  '$unwind': {
                    'path': '$author', 
                    'preserveNullAndEmptyArrays': true
                  }
                }
            ];

            const cursor = posts.aggregate(agg);
            const data = await cursor.toArray();
            redis.set('post:all', JSON.stringify(data));
            return data;
        },
        GetPost: async (_, args, contextValue) => {
            const { authentication, db } = contextValue;
            const { id } = args;
            const user = await authentication();

            const posts = db.collection('Posts');
            const agg = [
                {
                  '$match': {
                    '_id': new ObjectId(id)
                  }
                }, 
                {
                  '$lookup': {
                    'from': 'Users', 
                    'localField': 'authorId', 
                    'foreignField': '_id', 
                    'as': 'author'
                  }
                }, 
                {
                  '$project': {
                    'author': {
                      'name': 0, 
                      'email': 0, 
                      '_id': 0, 
                      'password': 0
                    }
                  }
                }, 
                {
                  '$unwind': {
                    'path': '$author', 
                    'preserveNullAndEmptyArrays': true
                  }
                }
              ];

            const cursor = posts.aggregate(agg);
            const findPost = await cursor.toArray();

            return findPost[0];
        }
    },
    Mutation: {
        AddPost: async (_, args, contextValue) => {
            const { authentication, db } = contextValue;
            const { newPost } = args;
            const user = await authentication();
            const { id } = user;

            if (!newPost.content) {
                throw new GraphQLError('Caption required!', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    }
                });
            }

            newPost.authorId = new ObjectId(id);
            newPost.comments = [];
            newPost.likes = [];
            newPost.createdAt = newPost.updatedAt = new Date();
            const posts = db.collection('Posts');
            await posts.insertOne(newPost);

            redis.del('post:all');
            return newPost;
        },
        CommentPost: async (_, args, contextValue) => {
            const { authentication, db } = contextValue;
            const { newComment, postId } = args;
            const { username } = await authentication();

            if (!newComment.content) {
                throw new GraphQLError('Comments required!', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    }
                });
            }

            newComment.username = username;
            newComment.updatedAt = newComment.createdAt = new Date();

            const posts = db.collection('Posts');
            await posts.updateOne({
                _id: new ObjectId(postId)
            },
            {
                $push: { comments: newComment }
            }); 

            redis.del('post:all');
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

            const findPost = await posts.findOne({_id: new ObjectId(postId)});

            if (findPost.likes.some(val => val.username === username)) {
                throw new GraphQLError('You already liked this post', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    }
                });
            }

            await posts.updateOne({
                _id: new ObjectId(postId)
            },
            {
                $push: { likes: newLike }
            }); 

            redis.del('post:all');
            return newLike;
        }
    }
}

module.exports = resolvers;