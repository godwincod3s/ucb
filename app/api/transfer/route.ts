import { NextResponse } from "next/server";

import User from '@/server/models/User';
import connect from "@/server/utils/connect";

export const POST = async (request: any) => {
    const { fullname, routing, account, amount, bank, state, email } = await request.json();

    try {
        await connect();
    }catch (err: any) {
        return new NextResponse("db connection error: " + err, {status: 500})
    }

    
    const existingUser: any = await User.findOne({email: email}); //use account number to trx from

    if((existingUser === null)){
        return new NextResponse(`User with email: ${email} does not exist.`, {status: 400})
    }
 
    try {
        let availableBalance = existingUser.ledgerBalance;
        let newBalance = parseInt(availableBalance) - parseInt(amount);
        
        const user: any = await User.findOneAndUpdate(
            {email }, 
            {   
                $set: {ledgerBalance: newBalance}, 
                $push: { sent: { fullname, routing, account, amount, bank, state } },
            }, 
                { new: true }
            )
        //sent: [{ fullName, routing, account, amount, bank, state }]
        
        return NextResponse.json( {user}, {status: 200})
    } catch (err: any) {
        return new NextResponse(err, {status: 500})
    }
}