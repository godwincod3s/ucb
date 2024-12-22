import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid"

import User from '@/server/models/User';
import connect from "@/server/utils/connect";

export const POST = async (request: any) => {
    const { email } = await request.json();

    try {
        await connect();
    }catch (err: any) {
        return new NextResponse("db connection error: " + err, {status: 500})
    }

    
    const existingUser: any = await User.findOne({email: email}); 

    if(existingUser){
        return NextResponse.json(existingUser, {status: 200})
    }else{
        return new NextResponse("Could not find this user", {status: 404})
    }
 
}