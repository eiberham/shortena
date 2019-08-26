import { makeExecutableSchema } from "graphql-tools";
import { resolvers } from './resolvers';

const typeDefs = `
    type User {
      id: ID
      name: String
      email: String
    }
    
    type Urls {
        id: ID
        short: String
        target: String
    }
    
    type Query {
      users: [User]    # "[]" means this is a list of users
      urls: [Urls]
    }
    
    type Mutation {
        shorten(url: String): Urls
    }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });
export { schema };