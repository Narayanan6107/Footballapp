const express=require('express')
const dotenv= require('dotenv')
const mongoose = require('mongoose')
const app= express();

dotenv.config();

console.log("Loaded DB URI:", process.env.DATABASE);
console.log("Loaded DB Password:", process.env.DATABASE_PASSWORD);

const DB = process.env.DATABASE.replace('<PASSWORD>', encodeURIComponent(process.env.DATABASE_PASSWORD));

console.log("Connecting to:", DB);

mongoose.connect(DB, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  serverSelectionTimeoutMS: 5000
})
.then(() => console.log("Database connected"))
.catch((error) => console.log("Database connection error:", error.message));



const port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
})
module.exports=app;