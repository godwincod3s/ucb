
// import Image from 'next/image';
import { useRouter } from 'next/navigation';

// search UK, Europe, America, Asia and West Africa country

import Logo from '@/app/assets/img/logo.png';

const transfers = [
    { text: "International Funds Transfer", logo: Logo, href: "/account/ift"},
    { text: "Local Funds Transfer", logo: Logo, href: "/account/ftransfer/lft"},
    { text: "Telex Funds Transfer", logo: Logo, href: "/account/tft"},
]

export default function Transfer({ session, user }: any) {
    const router = useRouter();

    return (
        <div className="my-10">
            <h1 className='text-center font-medium text-2xl mb-4'>START FUNDS TRANSFER</h1>
            <h4 className='text-center font-light text-2xl'>Choose transfer option.</h4>

            <div className=" flex flex-col w-[50vw] transform translate-x-[50%] p-2 gap-y-6">
                {
                    transfers.map((item) => (
                        <div key={item.text} className="bg-white text-center rounded-md p-8 min-h-[20vh] min-w-[20vw] h-[auto] transition-all duration-300 transform hover:scale-105 shadow-lg">
                                <h1 className='text-center'>{item.text}</h1>
                                <div onClick={() => { router.push(item.href)}} className='font-semibold cursor-pointer inline-block px-6 py-3 bg-green-500 rounded-md mt-4'>Make Transfer</div>
                            </div>
                    ))
                }
            </div>

            <div className='mt-[10%] my-[5%] w-[50vw] transform translate-x-[50%] text-center lg:px-[10%] p-2 py-4 bg-white shadow-lg rounded-md'>
                <div className=''>
                    <img className="inline-block transform translate-y-[-50%] rounded-full min-w-[5vw] min-h-[5vh] max-h-[18vh] max-w-[19vh] w-[30vw] h-[18vh] " alt='profile photo' src={ user?.avater?.url ? user.avatar.url : "https://th.bing.com/th?id=OIP.LmUGJhw5D7zruBaxMBxFOwHaHD&w=256&h=243&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"} />
                </div>

                <h3 className='mt-[-10%]'>{user.accountType} Account: {user.accountNumber}</h3>
                <h1>{user.name}</h1>
                <p>{"You are welcome to our online banking platform, The most secured internet banking channel in UK, Europe, America, Asia and West Africa."}</p>
            </div>

            <div className='transition-all duration-300 hover:scale-105 w-[50vw] transform translate-x-[50%] text-center mb-[5%] p-2 py-4 bg-white shadow-lg rounded-md'>
                <h1>FRAUD ALERT</h1>
                <p>Unity Capital Bank will nevef ask you for your online bank details. Flee from such messages and requests.</p>
                <p>Stay protected always, Should yuo notice any suspicious activities on your account...</p>

                <div className='cursor-pointer font-semibold inline-block px-6 py-3 bg-orange-400 rounded-md mt-4'>ALERT US NOW</div>
            </div>

        </div>
    )
}