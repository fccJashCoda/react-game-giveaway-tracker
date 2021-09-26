require('dotenv').config;
const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const express = require('express');
const http = require('http');
const cors = require('cors');
const morgan = require('morgan');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const GiveawayApi = require('./dataSources/givaways');

async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
      giveawayAPI: new GiveawayApi(),
    }),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  app.use(cors());
  app.use(morgan('tiny'));

  await server.start();
  server.applyMiddleware({ app });
  await new Promise((resolve) => httpServer.listen({ port: 4005 }, resolve));
  console.log(`
    Server is running.
    Listening on port 4005
    Explore at https://studio.apollographql.com/sandbox
  `);
}

startApolloServer(typeDefs, resolvers);
