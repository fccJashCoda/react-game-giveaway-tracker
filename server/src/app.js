const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const axios = require('axios');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
require('dotenv').config();

const app = express();

// app.use(helmet());  // conflicts with graphql
app.use(
  helmet({
    /**
     * Default helmet policy + own customizations - graphiql support
     * https://helmetjs.github.io/
     */
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [
          "'self'",
          /** @by-us - adds graphiql support over helmet's default CSP */
          "'unsafe-inline'",
        ],
        baseUri: ["'self'"],
        blockAllMixedContent: [],
        fontSrc: ["'self'", 'https:', 'data:'],
        frameAncestors: ["'self'"],
        imgSrc: ["'self'", 'data:'],
        objectSrc: ["'none'"],
        scriptSrc: [
          "'self'",
          /** @by-us - adds graphiql support over helmet's default CSP */
          "'unsafe-inline'",
          /** @by-us - adds graphiql support over helmet's default CSP */
          "'unsafe-eval'",
        ],
        upgradeInsecureRequests: [],
      },
    },
  })
);
app.use(cors());
app.use(morgan('tiny'));
app.use(express.urlencoded());
app.use(express.json());

let cache = null;
async function fetchData() {
  try {
    const response = await axios.get(process.env.API_SRC);
    cache = response.data;
  } catch (error) {
    console.log(error.message);
  }
}

fetchData();

const schema = buildSchema(`
  type StoreItem {
    id: Int
    title: String
    description: String
    type: String
    status: String
    instructions: String
    published_date: String
    end_date: String
    open_giveaway: String
    thumbnail: String
    image: String
    gamerpower_url: String
    platforms: String
  }

  type Query {
    message: String!,
    store: [StoreItem]!
    getGiveaway(id: Int): StoreItem
  }
`);

const root = {
  message: () => {
    if (!cache) {
      throw new Error("The message hasn't arrived yet");
    }
    return cache.message;
  },
  store: () => {
    if (!cache) {
      throw new Error('Store is in another castle');
    }
    return cache.store;
  },
  getGiveaway: ({ id }) => {
    const giveaway = cache.store.find((giveaway) => giveaway.id === id);
    if (!giveaway) {
      throw new Error('No giveawway with id ' + id);
    }
    return giveaway;
  },
};

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.get('/', (req, res, next) => {
  res.json({
    message: 'batteries are in',
  });
});

function notFound(req, res, next) {
  const error = new Error('Page Not Found');
  res.status(404);
  next(error);
}

function errorHandler(err, req, res, next) {
  res.status(res.statusCode === 200 ? 500 : res.statusCode);
  res.json({
    message: err.message,
    stack: err.stack,
  });
}

app.use(notFound);
app.use(errorHandler);

module.exports = app;
