import express from 'express';
import path from 'path';
import GraphQLHTTP from 'express-graphql';
import { MongoClient } from 'mongodb';

import Schema from './src/data/schema';

let app = express();
let dataEndpoint = express();

app.use(express.static('public'));

app.get('*', function (request, response){ //wildcard solution for react-router
  response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
});
app.listen(3000,() => console.log('listening at port 3000')); //static file serving server

//Create a database endpoint
(async () => {
  try {
    let db = await MongoClient.connect("mongodb://localhost:27017/jpschool"); //"mongodb://admin:admin@ds025469.mlab.com:25469/jpschool"
    let schema = Schema(db);

    dataEndpoint.use('/', GraphQLHTTP({ //data endpoint for graphql
      schema,
      graphiql: true
    }));

    dataEndpoint.listen(8000, () => console.log('Data endpoint is listening at port 8000')); //data endpoint server

  } catch(e) {
    console.log(e);
  }
})();
