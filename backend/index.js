const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes  = require('./routes/auth');
const jobRoutes = require('./routes/job');
const applicationRoutes = require('./routes/application');
dotenv.config();
const app = express();

//Middleware 
app.use(cors());
app.use(express.json());
app.use('/api/auth',authRoutes);
app.use('/api/jobs',jobRoutes)
app.use('/api/applications',applicationRoutes)

//test route
app.get('/',(req,res)=>{
    res.json({message:"job tracker API is running! "});
});
const PORT = process.env.PORT||5000
connectDB()
app.listen(PORT,()=>{
    console.log(`server is running at http://localhost:${PORT}`);
})