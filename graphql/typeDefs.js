export const typeDefs = `#graphql
  type User {
    id: ID!
    name: String!
    email: String! 
    password: String! 
    isVerified: Boolean
  }
  
  input CreateUserInput{
    name: String!
    email: String!
    password: String!
  }
  input UpdateUserInput{
    name: String
    email: String 
    password: String 
  }
  type Query {
    getUser(id:ID!):User!
    getAllUsers:[User]
  }
  type Mutation{
   createUser(newUser: CreateUserInput!):User!
   deleteUser(id:ID!): User!
   updateUser(id:ID!, editUser:UpdateUserInput): User!
  }
`;
