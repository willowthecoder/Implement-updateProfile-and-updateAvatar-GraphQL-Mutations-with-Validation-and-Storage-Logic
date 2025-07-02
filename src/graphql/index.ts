import { readFileSync } from 'fs';
import { join } from 'path';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { userResolvers } from './resolvers/userResolvers';

// Read GraphQL type definitions
const userTypeDefs = readFileSync(
  join(__dirname, 'typeDefs', 'user.graphql'),
  'utf-8'
);

// Combine all type definitions
const typeDefs = [userTypeDefs];

// Combine all resolvers
const resolvers = [userResolvers];

// Create executable schema
export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
}); 