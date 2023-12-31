// server.js

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const config = require('./config/config');

//Routes
const userRouter = require('./routes/userRoutes');
const supplierRouter = require('./routes/supplierRoutes');
const manufacturerRouter = require('./routes/manufacturerRoutes');
const publicRouter = require('./routes/publicRoutes');

const app = express();
app.use(express.json())
app.use(cors());
// Async function to connect to DB and then start the server
const startServer = async () => {
  try {
    // Await the connection to the database before starting the server
    await connectDB();
    app.listen(config.port, () => {
      console.log(`Server is running on http://localhost:${config.port} `);
    });
    console.log('alchemyProvider', this.alchemyProvider);
    console.log('alchemyurl', config.alchemyProviderURL);
    console.log('contractAddress', config.contractAddress);
    console.log('jwtSecret', config.jwtSecret);
    console.log('mongoURI', config.mongoURI);
    console.log('port', config.port);
  } catch (err) {
    console.error("Database connection failed", err);
    process.exit(1); // Exit with failure if the database connection fails
  }
};

startServer(); // start the server
// Diffrent Routes after starting server

app.use('/api/users',userRouter);
app.use('/api/supplier',supplierRouter);
app.use('/api/manufacturer',manufacturerRouter);
// Public routes which are not protected by auth middleware
app.use('/api/public', publicRouter);


// app.use('/api/products',productRouter);
// app.use('/api/orders',orderRouter);
// app.use('/api/transactions',transactionRouter);


// This is just a test api to check if the server is running
app.get('/api/test', (req, res) => {
  console.log("Test api called");
  res.json({ message: "The node Backend is working perfectly fine!" });
});
