import { makeExecutableSchema } from "graphql-tools";
import { resolvers } from './resolvers';

const typeDefs = `
    type User {
      id: ID
      name: String
      email: String
    }
    
    type Query {
      users: [User]    # "[]" means this is a list of users
    }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });
export { schema };