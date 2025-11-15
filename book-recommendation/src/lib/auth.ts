import jwt from "jsonwebtoken"
const JWT_SECRET=process.env.JWT_SECRET||"your_jwt_secret_key";
const EXPIRATION_IN="24h"

export interface JWTPayload{
    userId:string;
    email:string
}

export function signToken(payload:JWTPayload){
    return jwt.sign(payload,JWT_SECRET,{expiresIn:EXPIRATION_IN});
}

export function verifyToken(token:string):JWTPayload | null{
    try{
        const decoded=jwt.verify(token,JWT_SECRET) as JWTPayload;
        return decoded;
    }catch(error){
        console.error("Invalid token:",error);
        return null;
    }
}