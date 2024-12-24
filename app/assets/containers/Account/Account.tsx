"use client"
import React from "react"
import { signOut, useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

import { SignOut, Cancel, Menu } from "@/app/assets/icons/icons";
import { useAsyncReducer } from "@/app/assets/hooks/useAsyncReducer";
import { useStorage } from "@/app/assets/hooks/useStorage";
import Logo from '@/app/assets/img/logo.png';

export type User = {
    accountNumber: String;
    accountType: String;
    avatar: {url: String; public_id: String;}
    createdAt: string;
    email: String;
    gender: string;
    ledgerBalance: number;
    loanBalance: number;
    name: string;
    password: string
    phone: string;
    rememberMe: boolean;
    status: string;
    updatedAt: string;
    verificationToken: string;
    _id: string;
    _v: number
}

function reducer(state: any, action: any) {
    if(state === ''){
        return action
    }else {
        return state
    } 
}

const sideNavItems = [
    { icon: <SignOut />, text: "Dashboard", key: "dashboard" },
    { icon: <SignOut />, text: "Profile", key: "profile" },
    { icon: <SignOut />, text: "E-Statement", key: "edtatement" },
    { icon: <SignOut />, text: "Fund Transfer", key: "ftransfer" },
    { icon: <SignOut />, text: "Apply For Loan", key: "applyforloan" },
    { icon: <SignOut />, text: "Loan Status", key: "lStatus" },
    { icon: <SignOut />, text: "Approved Credit card", key: "approvedcc" },
    { icon: <SignOut />, text: "Transaction Codes", key: "tcodes" },
    { icon: <SignOut />, text: "Change Pin", key: "cpin" },
    { icon: <SignOut />, text: "Contact Support", key: "csupport" },
]
 
export default function Account({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    // console.log()
    const router = useRouter();
    const pathname = usePathname();
    const path: String = pathname.split('/')[2];
    const [ dataArgument, store ] = useStorage( );
    const { data: session, status: sessionStatus } = useSession();
    const [ ip, setIP ] = React.useState('')
    const [isSideNavOpen, setSideNavOpen] = React.useState(false); // State for toggling the side nav
    const [ user, setUser ] = React.useState<User>(() => {
        return {} as User
    })
    const [ active, setActive ] = React.useState(0)
    // const [ ip, _D_setIP ]: any = useAsyncReducer( reducer, '');
    // _D_setIP(getUserIp) -- getUserIP will recieve dispatch
    
    React.useEffect(() => {

        if(sessionStatus !== "authenticated"){
            router.push("/login");
        }
        const IP: string = store('get', 'IP');
        setIP(IP)
        
        const USER: any = store('get', 'user')
        setUser(USER)
        if(IP.length < 1) getUserIP();

        
    }, [session])

    const getGreeting = () => {
        const hour = new Date().getHours();
    
        if (hour < 12) {
          return "Good Morning";
        } else if (hour < 18) {
          return "Good Afternoon";
        } else {
          return "Good Evening";
        }
    };

    async function getUserIP() {
        console.log("getting IP..")
        try {
          const response = await fetch("https://api.ipify.org?format=json");
          const data = await response.json();
          store("set", "IP", data.ip)

        } catch (error) {
          console.error("Error fetching IP address:", error);
        }
    }
      

    return sessionStatus === "authenticated" ? (
    <div className="flex flex-col">
        <div className="bg-[#333] text-white fixed w-[100vw] z-20">
            <div className="flex flex-row justify-around p-2">
                <h1 className="font-bold">{getGreeting() + ' ! ' + session?.user?.name }</h1>
                <p>Your logged IP: {ip}</p>
                <div onClick={() => signOut()} className={`flex-row cursor-pointer md:flex hidden ${sessionStatus ===  "authenticated" && 'text-red-300'}`}>
                    <SignOut size={4} className="w-6 h-6" />
                    <span>{sessionStatus ===  "authenticated" && "Logout"}</span>
                </div>
                {/* Hamburger Menu for Mobile */}
                <div
                className=" text-white lg:hidden"
                onClick={() => setSideNavOpen(!isSideNavOpen)}
                >
                    {isSideNavOpen ? <Cancel size={4} className="w-6 h-6" /> : <Menu size={4} className="w-6 h-6" />}
                
                </div>
            </div>
        </div>

        {/*  */}
        <div className="bg-slate-50 lg:flex"> 
            <div className={`w-[40vw] h-[100vh] pt-10 z-10 bg-gray-800 sm:fixed md:fixed xs:fixed text-white transition-all duration-300 ${
                    isSideNavOpen ? "translate-x-[150%]" : "translate-x-[100vw]"
                    } lg:translate-x-0 lg:hover:w-[18vw] group lg:w-[5vw] xl:w-[15vw]`}>
                {/* Image Icon at the Top */}
                <div className="flex items-center justify-center p-4">
                    <Image className="w-['auto'] h-['auto']" alt="site logo" src={Logo} />
                </div>
                
                {/* List Items */}
                <ul className="mt-4 ">
                {sideNavItems.map((item, index) => {

                    return (
                        <li
                            key={item.key}
                            onClick={() => {
                                if(item.key === 'dashboard') {
                                    router.push(`/account`)
                                    return;
                                }
                                if(item.key !== path){
                                    router.push(`/account/${item.key}`)
                                }
                        }}
                        className={`px-6 py-3 lg:px-3 py:1 cursor-pointer flex items-center hover:bg-gray-700 ${
                            item.key === path ? "bg-gray-700 shadow-md" : ""
                        }`}
                        >
                            <span className="min-h-6 min-w-6 w-6 h-6">{item.icon}</span>
                            <span
                                className={`ml-4 lg:hidden xl:block group-hover:lg:block`}
                            >
                                {item.text}
                            </span>
                        </li>
                    )})}
                        <li className="flex md:hidden items-center px-6 py-3 hover:bg-gray-700">
                            <div onClick={() => signOut()} className={`flex flex-row cursor-pointer ${sessionStatus ===  "authenticated" && 'text-red-300'}`}>
                                <span className="w-6 h-6 mr-4"><SignOut size={4} className="w-6 h-6" /></span>
                                <span>{sessionStatus ===  "authenticated" && "Logout"}</span>
                            </div>
                        </li>
                </ul>

            </div>

            {/* Contents */}
            <div className="pt-[5%] bg-gray-100 w-[100vw]" >{children}</div>
        </div>
    </div>
    ) : null;
}