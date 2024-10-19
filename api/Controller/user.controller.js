import User from "../model/user.model.js"
import  bcryptjs  from 'bcryptjs'
import { errorHandler } from "../utils/error.handler.js"


export const test = (req, res)=>{
    res.json({message:"Api is working"})
}

export const updateUser = async(req, res , next)=>{
    if(req.user.id !== req.params.userId){
        return next(errorHandler( 403, "You are not authorized to update this uer"));
    }

    if(req.body.password){
        if(req.body.password.length < 6){
            return next(errorHandler( 400 ," Password must be at least 6 character long "));
        }
          
           req.body.password = bcryptjs.hashSync(req.body.password, 10);

    }

   if(req.body.username){
        if(req.body.username.length < 7 || req.body.username.length > 20){
            return next(errorHandler( 400, "Username must be between 7 and 20 characters"));
        }
        if(req.body.username.includes(' ')){
            return next(errorHandler(400,"Username can not contain space"));
        }

        if(req.body.username !== req.body.username.toLowerCase()){
            return  next(errorHandler(400,"Username must be in lowercase"));

        }
           if(!req.body.username.match(/^[a-z0-9]+$/i)){
            return next(errorHandler(400,"Username can only contain letters and numbers"));
           }
    };
           try {
             const updateUser= await User.findByIdAndUpdate(req.params.userId, {
                $set:{
                    username: req.body.username,
                    email: req.body.email,
                    profilePictures: req.body.profilePictures,
                    password: req.body.password
                }

             }, { new:true} );
             const { password, ...rest} = updateUser._doc;
             res.status(200).json(rest);
           } catch (error) {
                 next(error);
           };
};

export const deleteUser = async(req, res ,next)=>{
    if(!req.user.isAdmin && req.user.id !== req.params.userId){
        return next(errorHandler( 403, "You are not authorized to delete this user"));

    }
    try {
        await User.findByIdAndDelete(req.params.userId);
        res.status(200).json('User has been deleted successfully');

        
    } catch (error) {
        next(error);
    }

}

export const signOut = async(req, res ,next)=>{
    try {

         res
         .clearCookie('access_token')
         .status(200)
         .json('User has been signout')
        
    } catch (error) {
        next(error);
    }
};

export const getUsers = async(req, res, next)=>{
    if(!req.user.isAdmin){
        return next(errorHandler(403, "You are not authorized to view all users"));
    };

    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection =  req.query.sort === 'asc' ? 1 :-1;
        const users =  await User.find().sort({ createdAt: sortDirection }).skip(startIndex).limit(limit);

        const userWithoutPassword= users.map((user) => {
            const {password, ...rest} = user._doc;
            return rest;
        });

          const totalUsers = await User.countDocuments();
          const now = new Date();
          const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
          );

          const lastMonthUser = await User.find({ createdAt:{ $gte: oneMonthAgo } });
            res.status(200).json(
              {
                users:userWithoutPassword,
                totalUsers,
                lastMonthUser,

              }  
            );

    } catch (error) {
        next(error);

    };

};