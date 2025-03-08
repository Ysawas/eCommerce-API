import express from "express";
import errorHandler from "./errorManagement/errorHandler.js";
import userRouter from "./routers/userRouter.js";

//Start the express app
const app = express();
//Start the server
const PORT = 3000;

app.use(express.json());

/* // Define a simple route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Handle undefined routes
app.use((req, res, next) => {
  res.status(404).send({ message: "Route not found" });
}); */

app.use("/users", userRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
