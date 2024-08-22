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