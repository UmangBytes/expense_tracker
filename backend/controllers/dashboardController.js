const Income=require('../models/Income')
const Expense=require('../models/Expense');
const {isValidObjectId,Types} = require('mongoose')

exports.getDashboardData=async (req,res)=>{
    try {

        if (!req.user ) {
            return res.status(401).json({ message: "User not authenticated or ID missing" });
        }

        const userId=req.user?._id
        const userObjectId=new Types.ObjectId(String(req.user._id))

        const totalIncome=await Income.aggregate([
            {$match:{ userId: userObjectId} },
            {$group:{ _id:null,total: {$sum:"$amount"} }},
        ])

        console.log('totalIncome',{totalIncome,userId :isValidObjectId(userId)});

        const totalExpense=await Expense.aggregate([
            {$match: {userId:userObjectId } },
            {$group:{_id:null,total:{ $sum: "$amount"}}}
        ]);

        const last60DaysIncomeTransactions=await Income.find({
            userId:userObjectId,
            date:{ $gte:new Date(Date.now()-60*24*60*60*1000) }
        }).sort({date:-1});

        const incomeLast60Days=last60DaysIncomeTransactions.reduce(
            (sum,transaction)=>sum+transaction.amount,0
        );

        const last30DaysExpenseTransactions=await Expense.find({
            userId:userObjectId,
            date:{ $gte:new Date(Date.now()-30*24*60*60*1000) }
        }).sort({date:-1});

        const expensesLast30Days=last30DaysExpenseTransactions.reduce(
            (sum,transaction)=>sum+transaction.amount,
            0
        )

        // const lastTransactions=[
        //     ...(await Income.find({userId})).sort({date:-1}).limit(5).map(
        //         (txn)=>({
        //             ...txn.toObject(),
        //             type:"income",
        //         })
        //     ),
        //     ...(await Expense.find({userId})).sort({date:-1}).limit(5).map(
        //         (txn)=>({
        //             ...txn.toObject(),
        //             type:"expense",
        //         })
        //     ),
        // ].sort((a,b)=>b.date-a.date)

        // 1. Fetch the 5 most recent of each in parallel
            const [recentIncomes, recentExpenses] = await Promise.all([
                Income.find({ userId:userObjectId }).sort({ date: -1 }).limit(5),
                Expense.find({ userId:userObjectId }).sort({ date: -1 }).limit(5)
            ]);

            // 2. Combine them into one array and attach the 'type' label
            const lastTransactions = [
                ...recentIncomes.map((txn) => ({
                    ...txn.toObject(),
                    type: "income",
                })),
                ...recentExpenses.map((txn) => ({
                    ...txn.toObject(),
                    type: "expense",
                })),
            ]
            // 3. Sort the combined list of 10 items by date (newest first)
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            // 4. Optional: Only keep the top 5 overall if you want a clean dashboard
            .slice(0, 5);
         
        res.json({
            totalBalance:
            (totalIncome[0]?.total || 0)-(totalExpense[0]?.total || 0),
            totalIncome:totalIncome[0]?.total || 0,
            totalExpense:totalExpense[0]?.total || 0,
            last30DaysExpenses:{
                total:expensesLast30Days,
                transactions:last30DaysExpenseTransactions,
            },
            last60DaysIncome:{
                total:incomeLast60Days,
                transactions:last60DaysIncomeTransactions,
            },
            recentTransactions:lastTransactions,

        });
        const test = await Expense.findOne({ userId: userObjectId });

        const latestExpense = await Expense.findOne({ userId: userObjectId })
  .sort({ date: -1 });

const oldestExpense = await Expense.findOne({ userId: userObjectId })
  .sort({ date: 1 });

const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

console.log("Oldest expense date:", oldestExpense?.date);
console.log("Latest expense date:", latestExpense?.date);
console.log("30 days ago:", thirtyDaysAgo);
    console.log('test=',test);
    } catch (error) {
        res.status(500).json({message:"Server Error ",error})
        console.log('error=',error);
        
    }
}