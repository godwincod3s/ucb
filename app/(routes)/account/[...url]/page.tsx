"use client";

import React from "react"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import type { User } from "@/app/assets/containers/Account/Account";
import { redirect } from "next/navigation";

import { useStorage } from "@/app/assets/hooks/useStorage";
import Transfer from "@/app/assets/containers/Account/Transfer";
import Account from "@/app/assets/containers/Account/Account";
import LocalTransfer from "@/app/assets/containers/Account/LocalTransfer";

export default function AccountPages({params}: any) {
    
    // console.log()
    const router = useRouter();
    const { data: session, status: sessionStatus } = useSession();
    const [ dataArgument, store ] = useStorage( );
    const [ user, setUser ] = React.useState<User>(() => {
        return {} as User
    })
    const parameter: { url: string[] } = React.use(params)
    
    React.useEffect(() => {

        if(sessionStatus !== "authenticated"){
            router.push("/login");
        }
        
        const USER: any = store('get', 'user')
        setUser(USER)

    }, [session])

    switch (parameter.url[0]) {
        case "ftransfer":
            switch(parameter.url[1]){
                case "lft":
                    return user ? <Account><LocalTransfer user={user} session={session} /></Account> : "Error Loading user data"
                default:
                    return user ? <Account><Transfer user={user} session={session} /></Account> : "Error Loading user data"
            }
        break
        default:
            return redirect('/not-found')   
    }
     
}