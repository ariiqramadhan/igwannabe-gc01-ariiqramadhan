const { GraphQLError } = require("graphql");
const { verifyToken } = require("../helpers/jwt");
const { getDB } = require("../config/mongoconnection");
const { ObjectId } = require("mongodb");

const authentication = async (req) => {
    const access_token = req.headers.authorization;
    if (!access_token) {
        throw new GraphQLError('Invalid Token', {
            extensions: {
              code: 'UNAUTHENTICATED',
            },
        });
    }
    const [type, token] = access_token.split(' ');
    if (!type || type !== 'Bearer') {
        throw new GraphQLError('Invalid Token', {
            extensions: {
              code: 'UNAUTHENTICATED',
            },
        });
    }

    const payload = verifyToken(token);
    const db = await getDB();
    const users = db.collection('Users');
    const findUser = await users.findOne({_id: new ObjectId(payload.id)});
    if (!findUser) {
        throw new GraphQLError('Invalid Token', {
            extensions: {
              code: 'UNAUTHENTICATED',
            },
        });
    }
    
    return {
        id: payload.id,
        username: findUser.username
    };
}

module.exports = authentication;