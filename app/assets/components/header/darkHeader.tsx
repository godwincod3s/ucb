"use client"

import React from "react";
import { User } from "@/app/assets/icons/icons";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function DarkHeader() {
    const router = useRouter()
    const { data: session, status } = useSession()
    const params = useSearchParams()

    React.useEffect(() => {  
        console.log(params)
    }, [status])

    return <div className="bg-[#333] text-white flex flex-row justify-around p-2">
        <h1 className="">Experience banking that puts you first.</h1>
        <div onClick={() => router.push('/login')} className={`flex flex-row cursor-pointer ${status ===  "authenticated" && 'text-lime-400'}`}>
            <User size={4} className="w-6 h-6" />
            <span>{status ===  "authenticated" ? "User Account" :"Sign In to Online Banking" }</span>
        </div>
    </div>
}