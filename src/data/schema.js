import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLList
} from 'graphql';

let Schema = (db) => { //Schema is a function, receive database instance from app.js
  let courseType = new GraphQLObjectType({ //definition of course
    name: 'Course',
    fields: () => ({
      id: {
        type: new GraphQLNonNull(GraphQLID),
        resolve: (obj) => obj._id
      },
      name: { type: GraphQLString }
    })
  });

  let queryType = new GraphQLObjectType({ //Main queryType for querying data
    name: 'query',
    fields: () => ({
      course: {
        type: new GraphQLList(courseType),
        resolve: () => db.collection("courses").find({}).toArray()
      }
    })
  });

  let mutationType = new GraphQLObjectType({
    name: 'mutation',
    fields: () => ({
      test: {
        type: GraphQLInt,
        resolve: () => ++data
      }
    })
  });

  let schema = new GraphQLSchema({ //main schema
    query: queryType,
    mutation: mutationType
  });

  return schema;
}

export default Schema;
