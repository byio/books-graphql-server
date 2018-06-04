const graphql = require('graphql');
const _ = require('lodash');

const Book = require('../models/book');
const Author = require('../models/author');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql;

// // dummy data
// let books = [
//   {
//     name: 'Slaughterhouse V',
//     genre: 'War',
//     authorId: '1',
//     id: '1'
//   },
//   {
//     name: 'Watchmen',
//     genre: 'Graphic Novel',
//     authorId: '2',
//     id: '2'
//   },
//   {
//     name: 'The 4-Hour Workweek',
//     genre: 'Self-help',
//     authorId: '3',
//     id: '3'
//   },
//   {
//     name: 'A Man Without A Country',
//     genre: 'Humor',
//     authorId: '1',
//     id: '4'
//   },
//   {
//     name: 'V For Vendetta',
//     genre: 'Dystopian Fiction',
//     authorId: '2',
//     id: '5'
//   },
//   {
//     name: 'Batman: The Killing Joke',
//     genre: 'Grpahic Novel',
//     authorId: '2',
//     id: '6'
//   }
// ];
//
// let authors = [
//   {
//     name: 'Kurt Vonnegut',
//     age: 84,
//     id: '1'
//   },
//   {
//     name: 'Alan Moore',
//     age: 64,
//     id: '2'
//   },
//   {
//     name: 'Tim Feriss',
//     age: 40,
//     id: '3'
//   }
// ];

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
        // return _.find(authors, { id: parent.authorId });
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // code to get data using property on parent object
        // return _.filter(books, { authorId: parent.id });
      }
    }
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
        // return _.find(books, { id: args.id });
      }
    },
    author: {
      type: AuthorType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        // code to get data from db or other sources
        // return _.find(authors, { id: args.id });
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return books;
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        // return authors;
      }
    }
  }
});

// mutations
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt }
      },
      resolve(parent, args) {
        let newAuthor = new Author({
          name: args.name,
          age: args.age
        });
        return newAuthor.save();
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        authorId: { type: GraphQLID }
      },
      resolve(parent, args) {
        let newBook = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId
        });
        return newBook.save();
      }
    }
  }
});

// create and export schema based on RootQuery defined above
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
