import mongoose from "mongoose";

const postSchema =  new mongoose.Schema({
 
    userId :{
        type: String,
        required:true
    },

    content:{
        type:String,
        required:true,
    
    },
    title:{
        type:String,
        required:true,
        unique:true,

    },
    image:{
        type:String,
        default:"https://www.searchenginejournal.com/wp-content/uploads/2020/04/shutterstock_594103436-5eab6f5b7b10a.png"
    },
    category:{
        type:String,
        default:'uncategorized',
    },
    slug:{
        type:String,
        required:true,
        unique:true,
    }

},{timestamps:true}
);

const Post = mongoose.model('Post', postSchema);
export default Post;