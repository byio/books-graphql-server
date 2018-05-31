const graphql = require('graphql');
const _ = require('lodash');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID
} = graphql;

// dummy data
let books = [
  {
    name: 'Slaughterhouse V',
    genre: 'War',
    id: '1'
  },
  {
    name: 'Watchmen',
    genre: 'Graphic Novel',
    id: '2'
  },
  {
    name: 'The 4-Hour Workweek',
    genre: 'Self-help',
    id: '3'
  }
];

// define types
const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString }
  })
});

// root query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        // code to get data from db or other sources
        return _.find(books, { id: args.id });
      }
    }
  }
});

// create and export schema based on RootQuery defined above
module.exports = new GraphQLSchema({
  query: RootQuery
});
