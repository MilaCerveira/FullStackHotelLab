const express = require('express');
const app = express();
const parser = require('body-parser');
const MongoClient= require('mongodb').MongoClient;
const createRouter = require('./helpers/create_router.js');
const cors = require('cors');

app.use(parser.json());
app.use(cors());


MongoClient.connect('mongodb://localhost:27017')
  .then((client) => {
    const db = client.db('hotel');
    const bookingsCollection = db.collection('bookings');
    app.use('/api/bookings', createRouter(bookingsCollection));
  })
  .catch(console.error);
app.listen(3000, function() {
  console.log(`Hotel server running on port ${this.address().port}`);
});

// MongoClient.connect('mongodb://localhost:27017')
//   .then((client) => {
//     const db = client.db('hotel');
//     const bookingsCollection = db.collection('hotel');
//     const bookingsRouter = createRouter(bookingsCollection);
//     app.use('/api/bookings', bookingsRouter);
//   })
//   .catch(console.error); 
  
// app.listen(3000, function () {
//   console.log(`Listening on port ${ this.address().port }`);
// });
