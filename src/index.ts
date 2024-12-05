import express, { Request, Response } from 'express';
import router from './routes/route'; 
import { notFound, errorHandler } from './middleware/errorMiddleware'; 
import connectDB from './config/db'; 
import dotenv from 'dotenv';

dotenv.config(); 

const app = express();

// Setting up middleware
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use("/api", router); 



// Landing Page
app.get('/', (req:Request, res:Response) => {
  res.send('Server is ready     Go to /api/... for the other endpoints')
})

// Error handling middleware
app.use(notFound); 
app.use(errorHandler); 

// PORT
const PORT = process.env.PORT || 5000;

// Connecting to the database and starting the server
const startServer = async () => {
  try {
    await connectDB(); 
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`); 
    });
  } catch (error) {
    console.error("Database connection failed:", error); 
    process.exit(1); 
  }
};


startServer();
