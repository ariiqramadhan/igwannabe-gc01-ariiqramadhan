const { GraphQLError } = require("graphql");
const { verifyToken } = require("../helpers/jwt");

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
    return payload;
}

module.exports = authentication;