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