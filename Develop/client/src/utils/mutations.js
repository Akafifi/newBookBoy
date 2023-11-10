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
export const LOGIN = gql`
mutation Login($password: String!,  $username: String, $email: String) {
    login(password: $password, username: $username, email: $email) {
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

export const SAVE_BOOK = gql`
mutation SaveBook($_id: ID!, $book: BookInput!) {
    saveBook(_id: $_id, book: $book) {
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


export const DELETE_BOOK = gql`
mutation DeleteBook($user: UserInput) {
    deleteBook(_id: $_id, bookId: $bookId) {
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
