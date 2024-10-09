import User from '../model/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.handler.js';
// import pkg from 'jsonwebtoken'
// import {jwt , }
import  jwt from 'jsonwebtoken'
// const {jwt}=pkg
 
export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password || username === '' || email === '' || password === '') {
        next(errorHandler(400, "All fields are required"));
    }
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User(
        {
            username,
            email,
            password: hashedPassword
        });

    try {
        await newUser.save();
        res.json('Signed Up successfully');
    }
    catch (err) {
        next(err);


    }



}

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password || email === '' || password === '') {
        next(errorHandler(400, "All Feild are required"));
    }
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) {
            next(errorHandler(404, "User is not found"));
        }
        const isValidPassword = bcryptjs.compareSync(password, validUser.password);
        if (!isValidPassword) {
            return next(errorHandler(401, "Invalid Password"));
        }

        const token = jwt.sign(
            {
                id: validUser._id,
                isAdmin:validUser.isAdmin
            }
            ,
            process.env.JWT_KEY,
        );
        const{password:pass, ...rest}=validUser._doc;
        res.status(200).cookie('access_token',token,{
            httpOnly:true,    
        }).json(rest);
    }
    catch (error) {
        next(error);
    }

}

export const google = async(req, res, next)=>{
    const {email, name, photo}= req.body;

    try {
        const user  = await User.findOne({email});
          if(user){
             const token =  jwt.sign({id:user._id,isAdmin:user.isAdmin}, process.env.JWT_KEY);

             const{password:pass, ...rest}=user._doc;
             res.status(200).cookie('access_token ',token,{
                httpOnly : true,
                
             }).json(rest);
          }
          else{
            const generatePassword =  Math.random().toString(36).slice(-8)+ Math.random().toString(36)
            .slice(-8);
            const hashedPassword =  bcryptjs.hashSync(generatePassword, 10);
            const newUser = new User({
                username: name.toLowerCase().split(' ').join(' ')+Math.random().toString(9).slice(-4),
                email,
                password: hashedPassword,
                profilePicter:photo

            });
        

        await newUser.save();
        const token =   jwt.sign({id:newUser._id,  isAdmin:newUser.isAdmin}, process.env.JWT_KEY);
        const{password:pass, ...rest}= newUser._doc;
        res.status(200).cookie('access_token',token, {
        httpOnly:true,

        }).json(rest);

    }

         

    } catch (error) {
        next(error); 
    }

}