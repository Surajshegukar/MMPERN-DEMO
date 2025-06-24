const express = require('express');
const app = express();
const cors = require('cors');
const {connectMongoDB} = require('./db/mongoDB');
const {connectMySQL} = require('./db/mySqlDB');
const {connectPostgres} = require('./db/postgresDB');

const mongoRoutes = require('./routes/mongoRoutes');
const mySqlRoutes = require('./routes/mySqlRoutes');
// const postgresRoutes = require('./routes/postgresRoutes');

// Connect to MongoDB
connectMongoDB();
connectMySQL();
// connectPostgres()



app.use(express.json());
app.use(cors());

app.use('/mongo', mongoRoutes);
app.use('/sql', mySqlRoutes);
// app.use('/api', postgresRoutes);



app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});