"use client"
import React from "react"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import type { User } from "@/app/assets/containers/Account/Account";

import Account from "@/app/assets/containers/Account/Account";
import Dashboard from "@/app/assets/containers/Account/Dashboard";
import { useStorage } from "@/app/assets/hooks/useStorage";
 
export default function CopyAccount() {
    // console.log()
    const router = useRouter();
    const { data: session, status: sessionStatus } = useSession();
    const [ dataArgument, store ] = useStorage( );
    const [ user, setUser ] = React.useState<User>(() => {
        return {} as User
    })
    
    React.useEffect(() => {

        if(sessionStatus !== "authenticated"){
            router.push("/login");
        }
        
        const USER: any = store('get', 'user')
        setUser(USER)

    }, [session])
   
      console.log(session)

    return sessionStatus === "authenticated" ? <Account><Dashboard session={session} user={user} /></Account> : null;
}