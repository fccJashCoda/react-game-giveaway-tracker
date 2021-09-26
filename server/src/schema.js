const { gql } = require('apollo-server');

const typeDefs = gql`
  type Giveaway {
    id: ID!
    title: String
    description: String
    platforms: String
    thumbnail: String
    image: String
    type: String
    status: String
    instructions: String
    published_date: String
    end_date: String
    open_giveaway: String
  }

  type Query {
    giveaways: [Giveaway]!
    giveaway(id: ID!): Giveaway
  }
`;

module.exports = typeDefs;
