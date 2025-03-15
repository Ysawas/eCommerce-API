import express from 'express';
import sequelize from './db/index.js';
import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter.js';
import categoryRouter from './routers/categoryRouter.js';
import orderRouter from './routers/orderRouter.js';
import errorHandler from './middleware/errorHandling.js';
import 'dotenv/config';

// Import models to register them with Sequelize
import './models/User.js';
import './models/Category.js';
import './models/Product.js';
import './models/Order.js';
import './models/OrderProduct.js';

const app = express();
app.use(express.json());

app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('/categories', categoryRouter);
app.use('/orders', orderRouter);

app.use(errorHandler);

async function startServer() {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
        // Sync the models with the database
        await sequelize.sync({ force: false }); // Use force: false in production
        console.log('Database synchronized');
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

startServer();

//have a nice day every body