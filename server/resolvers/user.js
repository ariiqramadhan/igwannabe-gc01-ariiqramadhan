const { GraphQLError } = require('graphql');
const { hashPassword, comparePassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');
const { ObjectId } = require('mongodb');

const resolvers = {
    Query: {
        SearchUsers: async (_, args, contextValue) => {
            const { username } = args;
            const { authentication, db } = contextValue;

            const user = authentication();
            const users = await db.collection('Users');

            const data = await users.find({ username: { $regex: `${username}`, $options: 'i' } }).toArray();
            return data;
        },
        GetUser: async (_, args, contextValue) => {
            const { authentication, db } = contextValue;
            const { id } = args;
            const user = await authentication();

            const agg = [
                {
                  '$match': {
                    '_id': new ObjectId(id)
                  }
                }, 
                {
                  '$lookup': {
                    'from': 'Follows', 
                    'localField': '_id', 
                    'foreignField': 'followerId', 
                    'as': 'following',
                    'pipeline': [
                        {
                          '$lookup': {
                            'from': 'Users', 
                            'localField': 'followingId', 
                            'foreignField': '_id', 
                            'as': 'user'
                          }
                        }, {
                          '$unwind': {
                            'path': '$user', 
                            'preserveNullAndEmptyArrays': true
                          }
                        }, {
                          '$project': {
                            'user': {
                              '_id': 0, 
                              'name': 0, 
                              'email': 0, 
                              'password': 0
                            }
                          }
                        }
                    ]
                  }
                }, 
                {
                  '$lookup': {
                    'from': 'Follows', 
                    'localField': '_id', 
                    'foreignField': 'followingId', 
                    'as': 'followers',
                    'pipeline': [
                        {
                          '$lookup': {
                            'from': 'Users', 
                            'localField': 'followerId', 
                            'foreignField': '_id', 
                            'as': 'user'
                          }
                        }, {
                          '$unwind': {
                            'path': '$user', 
                            'preserveNullAndEmptyArrays': true
                          }
                        }, {
                          '$project': {
                            'user': {
                              '_id': 0, 
                              'name': 0, 
                              'email': 0, 
                              'password': 0
                            }
                          }
                        }
                    ]
                  }
                }
            ];

            const users = await db.collection('Users');
            const cursor = users.aggregate(agg);
            const findUser = await cursor.toArray();

            if (!findUser) {
                throw new GraphQLError('User not found', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    }
                });
            }

            return findUser[0];
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
            const data = await users.insertOne(newUser);
            // return {
            //     _id: data.insertedId,
            //     name: newUser.name,
            //     username: newUser.username,
            //     email: newUser.email,
            //     password: newUser.password
            // };
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