import { User } from "@/core/users/model/user";
import { signToken } from "@/lib/auth";
import bcrypt from "bcryptjs"
import { NextRequest, NextResponse } from "next/server";

export async function Login (req:NextRequest){
    try {
        const {email,password_hash}=await req.json();

        if  (!email || !password_hash) {
            return NextResponse.json({error:"Invalid credentials"},{status:400})//informamos que los datos estan incompletos
        }

    const user = await User.findOne({where:{email}});
    if  (!user) {
        return NextResponse.json({error:"User not found"},{status:404})//informamos que el usuario no existe
    }

    const validPassword= await bcrypt.compare(password_hash,user.password_hash);
    if (!validPassword) {
        return NextResponse.json({error:"Invalid password"},{status:401})//informamos que la contraseña es incorrecta
    }
    const token= signToken({userId:user.id,email:user.email});
    const response = NextResponse.json({message:"Login successful",token,user:{
        id:user.id,
        name:user.name,
        email:user.email,
        role:user.role,
        avatar:user.avatar
    }},{status:200});
    
    response.cookies.set("token",token,{
        httpOnly:true,
        secure  :process.env.NODE_ENV==="production",
        sameSite:"strict",
        maxAge:60*60*24,
        path:"/"
    })
    return response;

    } catch (error) {
        return NextResponse .json({error:"Internal Server Error"+error},{status:500});
    }
}