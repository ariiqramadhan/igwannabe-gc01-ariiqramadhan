const { GraphQLError } = require("graphql");
const { ObjectId } = require("mongodb");

const resolvers = {
    Mutation: {
        FollowUser: async (_, args, contextValue) => {
            const { newFollow } = args;
            const { authentication, db } = contextValue;

            const { id } = await authentication();

            if (newFollow.followingId === id) {
                throw new GraphQLError('You cannot follow yourself', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    }
                });
            }

            newFollow.followingId = new ObjectId(newFollow.followingId);
            newFollow.followerId = new ObjectId(id);
            newFollow.createdAt = newFollow.updatedAt = new Date();

            const follows = db.collection('Follows');
            const isFollow = await follows.findOne({ followingId: newFollow.followingId, followerId: newFollow.followerId });
            if (isFollow) {
                throw new GraphQLError('You already follow this user', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    }
                });
            }
            await follows.insertOne(newFollow);

            return newFollow;
        }
    }
}

module.exports = resolvers;