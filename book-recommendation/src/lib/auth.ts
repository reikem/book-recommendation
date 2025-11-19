import jwt from "jsonwebtoken"
import { NextRequest, NextResponse } from "next/server";
const JWT_SECRET=process.env.JWT_SECRET||"your_jwt_secret_key";
const EXPIRATION_IN="24h"

export interface JWTPayload{
    userId:string;
    email:string
}

export function signToken(payload:JWTPayload){
    return jwt.sign(payload,JWT_SECRET,{expiresIn:EXPIRATION_IN});
}


export function verifyToken(req: NextRequest) {
    try {
      const auth = req.headers.get("authorization")
      if (!auth) {
        return { error: true, response: NextResponse.json({ error: "Token no enviado" }, { status: 401 }) }
      }
  
      const token = auth.split(" ")[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET!)
  
      return { error: false, decoded }
    } catch (error) {
      return {
        error: true,
        response: NextResponse.json({ error: "Token inválido"+error }, { status: 401 })
      }
    }
  }