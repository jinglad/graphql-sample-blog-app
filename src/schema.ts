export const typeDefs = `#graphql
type Post {
  id: ID! 
  title: String!
  content: String!
  published: Boolean!
  authorId: Int! 
  author: User
  createdAt: String!
}

type User {
  id: ID!
  email: String!
  name: String!
  createdAt: String!
  updatedAt: String!
  posts: [Post!]!
  profile: Profile
}

type Profile {
  id: ID!
  bio: String
  user: User
  createdAt: String!
}

type Query {
  profile(id: ID!): Profile
  posts: [Post!]!
  users: [User!]!
  myProfile: User
}

type UserArgs {
  userError: String 
  token: String
}

type PostResponse {
  userError: String
  post: Post
}

input PostInput {
  title: String
  content: String
}

type Mutation {
  createUser(email: String!, name: String!, password: String!, bio: String): UserArgs
  login(email: String!, password: String!): UserArgs
  createPost(title: String!, content: String!): PostResponse
  updatePost(postId: ID!, post: PostInput!): PostResponse
  deletePost(postId: ID!): PostResponse,
  publishPost(postId: ID!): PostResponse
}
`;
