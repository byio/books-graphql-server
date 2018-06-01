const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');

const schema = require('./schema/schema');

const app = express();

// import and configure dotenv
require('dotenv').config();

// connect to mlab
const mLabURI = `mongodb://${process.env.MLAB_USERNAME}:${process.env.MLAB_PASSWORD}@ds139964.mlab.com:39964/books-graphql`;
mongoose.connect(mLabURI)
        .then(console.log('Connected to mLab.'));

// set up graphql middleware
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

module.exports = app;
