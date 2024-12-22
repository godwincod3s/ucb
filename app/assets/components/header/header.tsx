import Image from "next/image";

import DarkHeader from "./darkHeader";
import Navigation from "../navigation";
import Logo from '@/app/assets/img/logo.png'

export default function Header() {
    return <>
        <DarkHeader />
        <div className="px-8 py-4 flex flex-row justify-between">
            <Image className="w-['auto'] h-['auto']" alt="site logo" src={Logo} />
            <Navigation />
        </div>
    </>
}