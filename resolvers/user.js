const { GraphQLError } = require('graphql');
const { hashPassword, comparePassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');

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
                            code: 'BAD_USER_INPUT',
                        }
                    });
                }
            }

            if (newUser.email) {
                const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
                if (!regex.test(newUser.email)) {
                    throw new GraphQLError('Invalid email format', {
                        extensions: {
                            code: 'BAD_USER_INPUT',
                        }
                    });
                }
                const findUser = await users.findOne({ email: newUser.email });
                if (findUser) {
                    throw new GraphQLError('Email already exist', {
                        extensions: {
                            code: 'BAD_USER_INPUT',
                        }
                    });
                }

            }

            if (newUser.password) {
                if (newUser.password.length < 5) {
                    throw new GraphQLError('Password must be at least 5 characters', {
                        extensions: {
                            code: 'BAD_USER_INPUT',
                        }
                    });
                }
                newUser.password = hashPassword(newUser.password);
            }
            await users.insertOne(newUser);
            return newUser;
        },
        Login: async (_, args, contextValue) => {
            const { db } = contextValue;
            const { username, password } = args;

            if (!username) {
                throw new GraphQLError('Username required!', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    }
                });
            }

            if (!password) {
                throw new GraphQLError('Password required!', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    }
                });
            }

            const users = await db.collection('Users');
            const findUser = await users.findOne({ username });
            
            if (!findUser) {
                throw new GraphQLError('Invalid email/password', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    }
                });
            }

            if (!comparePassword(password, findUser.password)) {
                throw new GraphQLError('Invalid email/password', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    }
                });
            }

            const access_token = signToken({id: findUser._id})

            return { access_token };
        }
    }
}

module.exports = resolvers;