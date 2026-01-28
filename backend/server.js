require("dotenv").config({
    quiet:true
});
const {connectDB}=require('./config/db')
const express=require("express");
const cors=require("cors")
const app=express();
const authRoutes=require('./routes/authRoutes');
const path=require('path')

app.use(cors({
    origin:process.env.CLIENT_URL || "*",
}))

app.use(express.json());

connectDB();
app.use('/api/v1/auth',authRoutes);


app.use('/uploads',express.static(path.join(__dirname,"uploads")))

const PORT=process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`Server Started on PORT:${PORT}`);
})