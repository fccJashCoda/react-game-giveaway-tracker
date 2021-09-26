require('dotenv').config;
const { ApolloServer } = require('apollo-server');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const GiveawayApi = require('./dataSources/givaways');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    giveawayAPI: new GiveawayApi(),
  }),
});

server
  .listen({
    port: 4005,
  })
  .then(() => {
    console.log(`
    Server is running.
    Listening on port 4005
    Explore at https://studio.apollographql.com/sandbox
  `);
  });
