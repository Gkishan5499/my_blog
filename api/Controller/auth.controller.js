import User from '../model/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.handler.js';
// import pkg from 'jsonwebtoken'
// import {jwt , }
import  jwt from 'jsonwebtoken'
// const {jwt}=pkg;
 
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
                id: validUser._id
            }
            ,
            process.env.JWT_KEY,
        );
        const{password:pass, ...rest}=validUser._doc;
        res.status(200).cookie('access token',token,{
            httpOnly:true,    
        }).json(rest);
    }
    catch (error) {
        next(error);
    }

}