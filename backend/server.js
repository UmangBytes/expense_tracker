require("dotenv").config({
    quiet:true
});
const {connectDB}=require('./config/db')
const express=require("express");
const cors=require("cors")
const app=express();
const authRoutes=require('./routes/authRoutes');
const path=require('path')
const incomeRoutes=require('./routes/incomeRoutes')
const expenseRoutes=require('./routes/expenseRoutes')
const dashboardRoutes=require('./routes/dashboardRoutes');

app.use(cors({
    origin:process.env.CLIENT_URL || "*",
}))

app.use(express.json());

connectDB();
app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/income',incomeRoutes)
app.use('/api/v1/expense',expenseRoutes)
app.use('/api/v1/dashboard',dashboardRoutes)


app.use('/uploads',express.static(path.join(__dirname,"uploads")))

const PORT=process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`Server Started on PORT:${PORT}`);
})