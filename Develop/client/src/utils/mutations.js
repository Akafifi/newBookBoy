import { gql } from 'graphql'


export const CREATE_USER = gql`
mutation createUser($user: UserInput) {
    createUser(user: $user) {
        token
        user (
            _id
            email
            username
            savedBooks {
                _id
                authors
                description
                bookId
                image
                link
                title
            }
        )
    }
}

`
