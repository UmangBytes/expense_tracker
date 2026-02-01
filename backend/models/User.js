const {Schema,model}=require("mongoose")
const bcrypt=require("bcryptjs")


const UserSchema=new Schema({
    fullName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        trim:true,
    },
    profileImageUrl:{
        type:String,
        default:null,
    }
},
{timestamps:true}
);

UserSchema.pre("save",async function (next){
    if(!this.isModified("password")) 
    return ;

    this.password=await bcrypt.hash(this.password,10);
    
});

UserSchema.methods.comparePassword=async function(candidatePassword){

    return await bcrypt.compare(candidatePassword,this.password)
}


const User=model('User',UserSchema);
module.exports=User