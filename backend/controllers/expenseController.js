const xlsx=require('xlsx')
const Expense=require('../models/Expense')

//Expense
exports.addExpense=async (req,res)=>{

    const userId=req.user?.id

    try {
        const {icon,category,date,amount}=req.body;

        if(!category || !amount || !date){
            return res.status(400).json({message:"All fields are required"})
        }

        const newExpense= new Expense({
            userId,
            icon,
            date:new Date(date),
            category,
            amount
        })

        await newExpense.save();
        res.status(200).json(newExpense);

    } catch (error) {
        res.status(500).json({message:"Server Error"})
    }
}

exports.getAllExpense=async(req,res)=>{
    const userId=req.user?.id
    console.log('req.user=',req.user);
    
    try {
        const expense=await Expense.find({userId}).sort({date:-1});
        return res.json(expense);
    } catch (error) {
        res.status(500).json({message:"Server error"})
    }
}


exports.deleteExpense=async(req,res)=>{

    try {
        await Expense.findByIdAndDelete(req.params.id)
        res.json({message:"Expense deleted successfully"})
    } catch (error) {
        res.status(500).json({message:"Server Error"})
    }

}


exports.downloadExpenseExcel=async(req,res)=>{

   
    
    const userId=req.user.id;

    try {
        const expense=await Expense.find({userId}).sort({date:-1});

        console.log('in download excel expense->',expense);
        

        const data=expense.map((item)=>({
            category:item.category,
            Amount:item.amount,
            Date:new Date(item.date).toLocaleDateString()
        }))

        const wb=xlsx.utils.book_new();
        const ws=xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb,ws,"Expense");
        xlsx.writeFile(wb,'expense_details.xlsx');
        return res.download('expense_details.xlsx');
    } catch (error) {
        res.status(500).json({message:"Server Error"}) ;
    }

}