const { gql } = require('apollo-server');

const typeDefs = gql`
  type Giveaway {
    id: ID!
    title: String
    description: String
    platfroms: String
    thumbnail: String
    image: String
    type: String
    status: String
    instuctions: String
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
