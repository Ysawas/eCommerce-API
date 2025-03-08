const express = require('express');
const { connectToDatabase } = require('./db');
const userRouter = require('./routers/userRouter');
const productRouter = require('./routers/productRouter');
const categoryRouter = require('./routers/categoryRouter');
const orderRouter = require('./routers/orderRouter');
const errorHandler = require('./middleware/errorHandling');
require('dotenv').config();

const app = express();
app.use(express.json());

app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('/categories', categoryRouter);
app.use('/orders', orderRouter);

app.use(errorHandler);

connectToDatabase().then(() => {
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
  });
});
