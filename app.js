import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import departmentRoute from "./routes/departmentRoute.js";


// Initialize express
const app = express();
app.use(express.json());

// Load env vars
dotenv.config();

// Connect to DB
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use('/api', departmentRoute);  


app.listen(8800 || process.env.PORT, () => {
  console.log("Server is running at" + " " + process.env.PORT);
});
