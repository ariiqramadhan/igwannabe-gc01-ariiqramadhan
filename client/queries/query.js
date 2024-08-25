import { gql } from '@apollo/client';

export const REGISTER = gql`
    mutation Register($newUser: NewUser) {
        AddUser(newUser: $newUser) {
            _id
            name
            username
            email
        }
    }
`;

export const LOGIN = gql`
    mutation Login($username: String, $password: String) {
        Login(username: $username, password: $password) {
            access_token
        }
    }
`;

export const GET_POSTS = gql`
    query GetPosts {
        GetPosts {
            _id
            content
            tags
            imageUrl
            authorId
            comments {
                content
                username
                createdAt
                updatedAt
            }
            likes {
                username
                createdAt
                updatedAt
            }
            createdAt
            updatedAt
            author {
                username
            }
        }
    }
`;

export const LIKE_POST = gql`
    mutation LikePost($postId: ID) {
        LikePost(postId: $postId) {
            username
            createdAt
            updatedAt
        }
    }
`;

export const GET_POST = gql`
    query GetPost($getPostId: ID) {
        GetPost(id: $getPostId) {
            _id
            content
            tags
            imageUrl
            authorId
            comments {
                content
                username
                createdAt
                updatedAt
            }
            likes {
                username
                createdAt
                updatedAt
            }
            createdAt
            updatedAt
            author {
                username
            }
        }
    }
`;

export const COMMENT_POST = gql`
    mutation Comment($newComment: NewComment, $postId: ID) {
        CommentPost(newComment: $newComment, postId: $postId) {
            content
            username
            createdAt
            updatedAt
        }
    }
`;

export const GET_USER = gql`
    query GetUser($getUserId: ID) {
        GetUser(id: $getUserId) {
            _id
            name
            username
            email
            following {
                _id
                name
                username
            }
            followers {
                _id
                name
                username
            }
        }
    }
`;

export const FOLLOW_USER = gql`
    mutation FollowUser($newFollow: NewFollow) {
        FollowUser(newFollow: $newFollow) {
            _id
            followingId
            followerId
            createdAt
            updatedAt
        }
    }
`

export const SEARCH_USERS = gql`
    query Search($username: String) {
        SearchUsers(username: $username) {
            _id
            name
            username
            email
        }
    }
`

export const ADD_POST = gql`
    mutation AddPost($newPost: NewPost) {
        AddPost(newPost: $newPost) {
            _id
            content
            tags
            imageUrl
            authorId
            comments {
            content
            username
            createdAt
            updatedAt
            }
            likes {
            username
            createdAt
            updatedAt
            }
            createdAt
            updatedAt
        }
    }
`