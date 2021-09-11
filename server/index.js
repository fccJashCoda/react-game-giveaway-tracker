const app = require('./app');
require('dotenv').config();

console.log('Starting Server');
console.log('---------------');

const port = process.env.PORT || 4010;
app.listen(port, () =>
  console.log('Graphql server: http://localhost:4000/graphql , Listening...')
);
