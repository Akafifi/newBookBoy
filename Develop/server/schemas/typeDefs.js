const typeDefs = `

type Book {
    _id: ID!
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
}

input BookInput {
    _id: ID
    authors: [String]
    description: String
    bookId: String
    image: String
    link: String
    title: String
}

type User {
    _id: ID!
    username: String!
    email: String!
    savedBooks: [Book]
}

input UserInput {
    username: String!
    email: String!
    savedBooks: [BookInput]
}

type Auth { 
    token: String
    user: User
}

type Query {
    getSingleUser(_id: ID, username: String): User
    users: [User]
}

type Mutation {
   createUser(user: UserInput): Auth
   login(username: String, email: String, password: String!): Auth
   saveBook(_id: ID!, book: BookInput!): User
   deleteBook(_id: ID!, bookId: ID!): User
  }
`
module.exports = typeDefs