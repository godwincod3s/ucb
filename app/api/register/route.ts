import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid"
// import axios from "axios"

import User from '@/server/models/User';
import connect from "@/server/utils/connect";
// import { isPasswordValid } from "@/app/db/utils/index";

export const POST = async (request: any) => {
    const { fullName, email, password } = await request.json();
    const verificationToken: string = uuidv4()

    // if(isPasswordValid(password)){
    //     return new NextResponse( `password must contain atleast 1 uppercase, lowercase, must be 8characters long and contain 1 special character`, {status: 400 })
    // }
    const hashedPassword = await bcrypt.hash(password, 5);
    console.log({ fullName, email, password, hashedPassword })

    try {
        await connect();
    }catch (err: any) {
        return new NextResponse("db connection error: " + err, {status: 500})
    }

    
    const existingUser: any = await User.findOne({email: email}); 

    if(!(existingUser === null)){
        return new NextResponse(`User with email: ${email} already exist.`, {status: 400})
    }
 
    try {
        const newUser = new User({
            name: fullName,
            email: email,
            password: hashedPassword,
            verificationToken,
        })

        // await axios.post("/api/mail", { 
        //     from: fullName,
        //     to: email,
        //     subject: `Unitycapitalbank verification code`,
        //     text: `copy this verification code to verify your email : ${verificationToken}`
        //   }).then((response: any) => {
        //       console.log(response)
        //   }).catch( (err: any) => {
        //     return new NextResponse("there was an error sending verification email" + err, {status: 404})
        //   })
          
        await newUser.save();
        return new NextResponse("User registered", {status: 200})
    } catch (err: any) {
        return new NextResponse(err, {status: 500})
    }
}