"use client"

import React from "react"
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import Image from "next/image";

import { useForm } from "@/app/assets/hooks/useForm";
import loginBg from "@/app/assets/img/b1.jpg"
import { useStorage } from "@/app/assets/hooks/useStorage";

export default function Login() {
    const { data: session, status: sessionStatus } = useSession();
    const [ otp, setOtp ] = React.useState(0);
    const [ generateOtp, setGenerateOtp ] = React.useState(0);
    // const [ loginData, setLoginData ] = React.useState<{ email: string, password: string} | null>(null) 
    const router = useRouter();
    const [error, setError ] = React.useState('');
    const [ loginData, setLoginData ] = useForm(null)
    const [ mode, setMode ] = React.useState("login")
    const [seconds, setSeconds] = React.useState(120); // Initial countdown time
    const [isDisabled, setIsDisabled] = React.useState(true); // Disable button initially
    
    const accounts = ["4511389431", "0040066130"]
    const emails = ["miller.guuru@gmail.com", "miller.guuru@gmail.com"]

    const [ value, store ] = useStorage()

    React.useEffect(() => {
        if(sessionStatus == "authenticated"){
              router.replace("/account");
          }
        if (seconds > 0) {
            const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
            return () => clearTimeout(timer); // Cleanup timer
        } else {
            setIsDisabled(false); // Enable button when timer reaches 0
        }
        console.log( { loginData, generateOtp, otp })
    }, [loginData, otp, error, seconds, generateOtp])

    function generateSixDigitCode() {
        // const otp = new Promise()
        const uuid = uuidv4(); // Generate a UUID
        const hash = parseInt(uuid.replace(/-/g, '').slice(0, 6), 16); // Convert first 6 characters to a number
        const sixDigitCode = hash % 1000000; // Ensure it's a 6-digit number
        return sixDigitCode.toString().padStart(6, "0"); // Pad with zeros if necessary
    }

    const login = async () => {
        const { account, acc_pass, remember } = loginData;

        const res = await signIn("credentials", {
            redirect: false,
            account,
            password: acc_pass,
            remember: remember ? true : false
        });
        console.log(res)
        if(res?.error){
            setError("EmailNotFound");
        }

        if(res?.url){
            const email = emails[accounts.indexOf(account)];
            const res = await axios.post('/api/crud/r', {email})

            store('set', 'user', res.data)
            // router.push('/')
        }
         
    }

    const send2FA = async () => {
        const account: string = loginData.account;
        
        if(accounts.indexOf(account) !== -1){
            setMode("otp")
        }else{
            console.log('Account does not exist')
        }

        const email = emails[accounts.indexOf(account)];
        const code = +generateSixDigitCode()
        
        if(!generateOtp) { //set otp frequency timer
            console.log("generateOtp",generateOtp, "code", code)
            setGenerateOtp(code)

            // if(code){
            //     await axios.post("/api/mail", { 
            //         from: "UCB OTP",
            //         to: email,
            //         subject: `Unitycapitalbank 2FA pin`,
            //         text: `Use this 2FA pin to verify access to your account : ${code}`
            //     }).then((response: any) => {
            //         console.log(response)
            //     }).catch( (err: any) => {
            //         console.error("there was an error sending verification email" + err, {status: 404})
            //     })
            // }

        }
        
        if(`${otp}`.length < 6){
            return;
        }
        console.log(generateOtp !== otp, generateOtp, otp)
        if( generateOtp !== otp ){
            console.log("Wrong otp inputed")
            setError("WrongOtp");
            return
        }
    }
    const handleResend = () => {
        setGenerateOtp(0)
        // Logic for resending OTP
        send2FA()
    
        // Reset countdown
        setSeconds(120);
        setIsDisabled(true);
      };

    const loginButton = () => {
        if(mode === 'login'){
            return (<button className=" rounded-md text-center bg-[#00dfc6] p-2" onClick={() => send2FA() }> Sign In </button>)
        }else{
            return (<button className=" rounded-md text-center bg-[#00dfc6] p-2" onClick={() => login() }> Sign In </button>)
        }

    }
    
    return <div className="min-h-screen bg-loginBgImage bg-cover bg-center bg-no-repeat overflow-hidden" >
            <div className="z-10 flex lg:flex-row flex-col justify-around transform translate-y-[30%]">
                {/*  */}
                <div className="hidden lg:block lg:w-[40%] transform translate-y-[50%] mt-[-25%]">
                    <h1 className="text-gray-50 font-[500] leading-tight text-[4.5rem] font-sans">Our Client</h1>
                    <h3 className="text-gray-50 font-[500] leading-tight text-[1.625rem]">Are More Valuable than Money</h3>
                    <button className="text-center rounded-md bg-[#00dfc6] py-4 px-8 mt-4">START NOW</button>
                </div>

                {/* Need help? Contact Us +1 4372660920 support@unitycapitalbk.com
                    Not enrolled? Sign up now. >
                    Forget Password. > */}
                <div className="lg:w-[40%] bg-[#000000b8] p-8">
                    <h1 className="text-gray-50 text-center py-4 text-[1.5rem] font-bold">INTERNET BANKING</h1>

                    <div className="w-full">
                        <h2 className="text-center bg-[#00dfc6] py-4">Customer Login</h2>
                        <div className="flex flex-col gap-4 my-8 mx-4">

                            <input className={` p-2 ${ (mode === 'otp' ? 'block' : 'hidden')}`} onChange={(e) => setOtp(+e.target.value)}  placeholder="2FA PIN" />
                            <input className={`p-2 ${ (mode === 'login' ? 'block' : 'hidden')} `} name="account" type="text" placeholder="Enter account number" onChange={setLoginData} />
                            <input className={`p-2 ${ (mode === 'login' ? 'block' : 'hidden')} `} name="acc_pass" type="password" placeholder="Enter account password" onChange={setLoginData} />

                            <div className={`${ (mode === 'otp' ? 'flex' : 'hidden')} flex-row items-center justify-between`}>
                                <p className="text-md text-white font-semibold">
                                    {isDisabled
                                    ? `Resend OTP in ${seconds} second${seconds > 1 ? "s" : ""}`
                                    : "You can now resend the 2FA pin"}
                                </p>
                                <button
                                    onClick={() => handleResend()}
                                    disabled={isDisabled}
                                    className={` px-2 py-1  font-[500] rounded ${
                                    isDisabled
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-blue-500 hover:bg-blue-600"
                                    }`}
                                >
                                    Resend 2FA
                                </button>
                            </div>

                            {error === "EmailNotFound" && (
                                <p style={{ color: "red" }}>Account does not exist. Please register first.</p>
                            )}
                            {error === "WrongOtp" && (
                                <p style={{ color: "red" }}>Wrong OTP Entered</p>
                            )}

                            <div className="flex flex-row justify-center gap-2">
                                <input className="p-2" defaultChecked={false} onChange={(e) => {setLoginData(e)}} name="remember" type="checkbox" /> 
                                <label className="text-gray-50" htmlFor="remember">Remember Me</label>
                            </div>
                            { loginButton() }
                        </div>
                    </div>
                </div>
                {/*  */}
            </div>

            {/* <Image className="z-0 absolute h-[100vh] brightness-50" alt="Login backgound image" src={loginBg}  />   */}
        </div>;
}