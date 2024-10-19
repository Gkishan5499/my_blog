import mongoose from "mongoose";

const userSchema= new mongoose.Schema(
    {
      username:{
         type:String,
         require:true,
         unique:true
      },
      email:{
        type:String,
        require:false,
        unique:true
     },
     password:{
        type:String,
        require:true,
        
     },

     profilePictures:{
      type:String,
      default:"https://icons.veryicon.com/png/Business/Pretty%20Office/Man.png"
      
     },
     isAdmin:{
      type:Boolean,
      default:false,
     }
     ,
     
    },
    {timestamps:true}
)

const User= mongoose.model("User",userSchema);

export default User;