import 'dotenv/config';
import { Sequelize } from 'sequelize';

const pgUri = process.env.PG_URI;

// Extract connection details from PG_URI
const match = pgUri.match(
    /postgresql:\/\/([^:]+):([^@]+)@([^/]+)\/([^?]+)/
);

if (!match) {
    throw new Error('Invalid PG_URI format');
}

const user = match[1];
const password = match[2];
const host = match[3];
const database = match[4];

const sequelize = new Sequelize(database, user, password, {
    host: host,
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false, // Use with caution
        },
    },
    logging: false,
});

export default sequelize;