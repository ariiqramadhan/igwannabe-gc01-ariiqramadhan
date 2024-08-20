if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');

const userTypeDefs = require('./schema/user');
const userResolvers = require('./resolvers/user');
const postTypeDefs = require('./schema/post');
const postResolvers = require('./resolvers/post');
const followTypeDefs = require('./schema/follow');
const followResolvers = require('./resolvers/follow');
const { connect, getDB } = require('./config/mongoconnection');
const authentication = require('./middlewares/authentication');

const server = new ApolloServer({
    typeDefs: [userTypeDefs, postTypeDefs, followTypeDefs],
    resolvers: [userResolvers, postResolvers, followResolvers],
});

(async () => {
    try {
        await connect();

        const db = await getDB();
        const { url } = await startStandaloneServer(server, {
            listen: { port: process.env.PORT || 4000 },
            context: ({ req, res }) => {
                return {
                    db,
                    authentication: () => authentication(req)
                }
            }
        });
        
        console.log(`🚀  Server ready at: ${url}`);
    } catch (err) {
        console.log(err);
    }
})();

// connect()
//     .then(() => getDB())
//     .then(() => startStandaloneServer(server, {
//         listen: { port: 4000 },
//         context: ({ req, res }) => {
//             return {
//                 db
//             }
//         }
//     }))
//     .then(({ url }) => console.log(`🚀  Server ready at: ${url}`))
//     .catch(err => console.log(err));