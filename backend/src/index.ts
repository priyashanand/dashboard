import express, {Express, Request, Response} from "express"
import mongoose from "mongoose";
import caseRoutes from './routes/caseRoutes';
import providerRoutes from './routes/providerRoutes'
import dotenv from 'dotenv'; 
import cors from "cors";
dotenv.config();  

const app:Express = express()
const port:number = 3000
const MONGO_URI:string = process.env.MONGO_URI!;

app.use(cors<Request>());
app.use(express.json());

app.get('/', (req:Request, res:Response)=>{
  res.send("<h1>THE BAKCEND IS UP AND RUNNING</h1>")
})

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit if DB connection fails
  }
};

connectDB();

app.use('/api', caseRoutes);
app.use('/pro', providerRoutes);


app.listen(port, ()=>{
  console.log(`The server is running on port ${port}: http://localhost:${port}`)
})
