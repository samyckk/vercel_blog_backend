import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authenticateToken = (request,response, next)=>{
    const authHeader = request.headers['authorization'];
    
    const token = authHeader && authHeader.split(' ')[1];

    if(token == null){
        return response.status(401).json({msg: 'Token is required'});
    }
    
    jwt.verify(token, process.env.ACCESS_KEY, (error, user)=>{
        if(error){
            return response.status(401).json({msg: "Invalid access token"});
        }
    
        console.log("Authentication successful");
        next();
    })


}

