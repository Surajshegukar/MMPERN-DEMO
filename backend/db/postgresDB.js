// db.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.PG_DATABASE || 'mydatabase',
  process.env.PG_USER || 'postgres',
  process.env.PG_PASSWORD || 'yourpassword',
  {
    host: process.env.PG_HOST || 'localhost',
    dialect: 'postgres',
    logging: false,
  }
);

// Test the connection
const connectPostgres = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ PostgreSQL connection established successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to the PostgreSQL database:', error);
    throw error;
  }
};

module.exports = {
  sequelize,
  connectPostgres,
};