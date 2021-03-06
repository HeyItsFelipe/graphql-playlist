const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');
const {mongodbURI} = require('./secret/secret');

const app = express();

// allow cross-origin requests
app.use(cors());

// connect to mlab database
// make sure to replace my db string & creds with your own
console.log(mongodbURI);
mongoose.connect(mongodbURI);
mongoose.connection.once('open', () => {
    console.log('Connected to database.');
});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true 
}));

app.listen(4000, () => {
    console.log('Now listening for requests on port 4000.')
});