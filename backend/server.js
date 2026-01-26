require("dotenv").config({
    quiet:true
});
const {connectDB}=require('./config/db')

const express=require("express");
const cors=require("cors")

const app=express();

app.use(cors({
    origin:process.env.CLIENT_URL || "*",
}))

app.use(express.json());

connectDB()


const PORT=process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`Server Started on PORT:${PORT}`);
})