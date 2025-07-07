// src/graphql/schema.ts
import { gql } from "apollo-server-express";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { profileResolvers } from "./resolvers/profileResolvers";

const typeDefs = gql`
  scalar Upload
  scalar DateTime

  input UpdateProfileInput {
    firstName: String
    lastName: String
    email: String
    bio: String
  }

  type Profile {
    id: ID!
    firstName: String
    lastName: String
    email: String
    bio: String
  }

  type Avatar {
    id: ID!
    url: String!
    thumbnailUrl: String!
    uploadedAt: DateTime!
  }

  type Mutation {
    updateProfile(input: UpdateProfileInput!): Profile!
    updateAvatar(file: Upload!): Avatar!
  }

  type Query {
    getProfile: Profile!
  }
`;

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers: {
    ...profileResolvers,
  },
});
