import { gql } from "@apollo/client";

export const REGISTER = gql`
    mutation Register($newUser: NewUser) {
        AddUser(newUser: $newUser) {
            _id
            name
            username
            email
        }
    }
`

export const LOGIN = gql`
    mutation Login($username: String, $password: String) {
        Login(username: $username, password: $password) {
            access_token
        }
    }
`

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
`