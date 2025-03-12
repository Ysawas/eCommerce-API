require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.PGDATABASE, process.env.PGUSER, process.env.PGPASSWORD, {
  host: process.env.PGHOST,
  dialect: 'postgres',
  dialectOptions: { // This part might be needed for Neon
    ssl: {
      require: true,
      rejectUnauthorized: false // Use with caution, see Neon docs
    }
  },
  logging: false, // Disable logging SQL queries to the console (optional)
});

module.exports = sequelize;