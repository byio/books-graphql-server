const express = require('express');
const graphqlHTTP = require('express-graphql');

const schema = require('./schema/schema');

const app = express();

// set up graphql middleware
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

module.exports = app;
