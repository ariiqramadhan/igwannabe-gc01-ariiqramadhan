const { ObjectId } = require("mongodb");

const resolvers = {
    Mutation: {
        FollowUser: async (_, args, contextValue) => {
            const { newFollow } = args;
            const { authentication, db } = contextValue;

            const { id } = await authentication();

            newFollow.followingId = new ObjectId(newFollow.followingId);
            newFollow.followerId = new ObjectId(id);
            newFollow.createdAt = newFollow.updatedAt = new Date();

            const follows = db.collection('Follows');
            await follows.insertOne(newFollow);

            return newFollow;
        }
    }
}

module.exports = resolvers;