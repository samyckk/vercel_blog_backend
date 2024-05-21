import User from '../model/user.js';
import Token from "../model/token.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";


dotenv.config();


export const signupUser = async (request, response)=>{
    try {   
        const hashedPass = await bcrypt.hash(request.body.password,10);
        
        const user = request.body;
        user.password = hashedPass;
        
        
        const newUser = new User(user);      //validating the values and creting the new user object
        await newUser.save();
        return response.status(200).json({msg : "Signup successufully"});
    } catch (error) {
        return response.status(500).json({msg: "Signup error"});
    }
}

export const loginUser = async (request, response)=>{
    let userObj = await User.findOne({username : request.body.username});

    if(!userObj) {
        return response.status(400).json({msg : "User not found"});
    }

    try{
       let match = await bcrypt.compare(request.body.password, userObj.password);
       if(match){
        //GENRATE TOKEN
        const accessToken = jwt.sign(userObj.toJSON(),process.env.ACCESS_KEY, {expiresIn: "15m"});
        const refreshToken = jwt.sign(userObj.toJSON(),process.env.REFRESH_KEY);

        const newToken = new Token({token: refreshToken});
        await newToken.save();


        return response.status(200).json({accessToken: accessToken, refreshToken: refreshToken, name: userObj.name, username: userObj.username});
       }
       else{
        return response.status(400).json({msg: "Password does not match"});
       }
    }catch(error){
        return response.status(500).json({msg: "Login Error"});
    }

}
