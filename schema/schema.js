const graphql = require('graphql');
const _ = require('lodash');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt
} = graphql;

// dummy data
let books = [
  {
    name: 'Slaughterhouse V',
    genre: 'War',
    authorId: '1',
    id: '1'
  },
  {
    name: 'Watchmen',
    genre: 'Graphic Novel',
    authorId: '2',
    id: '2'
  },
  {
    name: 'The 4-Hour Workweek',
    genre: 'Self-help',
    authorId: '3',
    id: '3'
  }
];

let authors = [
  {
    name: 'Kurt Vonnegut',
    age: 84,
    id: '1'
  },
  {
    name: 'Alan Moore',
    age: 64,
    id: '2'
  },
  {
    name: 'Tim Feriss',
    age: 40,
    id: '3'
  }
];

// define types
const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        // code to get data using property on parent object
        return _.find(authors, { id: parent.authorId })
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt }
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
    },
    author: {
      type: AuthorType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        // code to get data from db or other sources
        return _.find(authors, { id: args.id });
      }
    }
  }
});

// create and export schema based on RootQuery defined above
module.exports = new GraphQLSchema({
  query: RootQuery
});
