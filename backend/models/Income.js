const {Schema,model}=require('mongoose');

const IncomeSchmea=new Schema({

    userId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    icon:{
        type:String
    },

    source:{
        type:String,
        required:true,
    },

    date:{
        type:Date,
        default:Date.now,
    },

    amount:{
        type:Number,
        required:true,
    }

},{
    timestamps:true,
})

module.exports=model("Income",IncomeSchmea)