import { gql } from 'graphql'

export const GET_SINGLE_USER = gql `
    query GetSingleUser($username: String, $_id: ID) {
        getSingleUser(username: $username, _id: $_id) {
            _id
            username
            email
            savedBooks {
                _id
                authors
                description
                bookId
                image
                link
                title
            }
        }
    }

`