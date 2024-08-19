const { GraphQLError } = require('graphql');
const { hashPassword } = require('../helpers/bcrypt');

const resolvers = {
    Query: {
        SearchUsers: (_, args) => {
            return args;
        },
        GetUser: (_, args) => {
            return args;
        }
    },
    Mutation: {
        AddUser: async (_, args, contextValue) => {
            const { db } = contextValue;
            const { newUser } = args;
            const users = await db.collection('Users');

            if (newUser.username) {
                const findUser = await users.findOne({ username: newUser.username });
                if (findUser) {
                    throw new GraphQLError('Username already exist', {
                        extensions: {
                            code: 'BAD_REQUEST',
                        }
                    });
                }
            }

            if (newUser.email) {
                const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
                if (!regex.test(newUser.email)) {
                    throw new GraphQLError('Invalid email format', {
                        extensions: {
                            code: 'BAD_REQUEST',
                        }
                    });
                }
                const findUser = await users.findOne({ email: newUser.email });
                if (findUser) {
                    throw new GraphQLError('Email already exist', {
                        extensions: {
                            code: 'BAD_REQUEST',
                        }
                    });
                }

            }

            if (newUser.password) {
                if (newUser.password.length < 5) {
                    throw new GraphQLError('Password must be at least 5 characters', {
                        extensions: {
                            code: 'BAD_REQUEST',
                        }
                    });
                }
                newUser.password = hashPassword(newUser.password);
            }
            await users.insertOne(newUser);
            return newUser;
        },
        Login: (_, args) => {
            return args;
        }
    }
}

module.exports = resolvers;