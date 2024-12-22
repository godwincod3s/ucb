import { useRouter } from "next/navigation";
import { DoubleArrowDown } from "@/app/assets/icons/icons"

interface TailwindClassName {
    [key: string]: string;
}
interface LinkData {
    [key: string]: string[];
} 

export const _t: TailwindClassName = {
    ndul: "relative group font-bold tracking-tight flex flex-row cursor-pointer"
}

export default function Navigation() {
    const router = useRouter()
    
    const data: LinkData = {
        personalBanking: ["Personal Banking", "Savings Account", "Current Account", "Property Loan", "Notice Deposit Account", "Open Account"],
        business: ["Business Banking", "Bussiness Account", "Trade Finance", "Property Loss", "Direct Lending", "Notice Deposit Account", "Open Account"],
        private: ["Private Banking", "Credit Card Services", "Discretionary Portfolios", "Investor Visa Portfolios", "Execution Only Portfolios", "Portfolio Secured Lending", "Property Loans", "Notice Deposit Account", "Open Account"],
        loansNdCredit: ["Loans & Credit", "Mortgage Loans", "Property Loans", "Loan & Mortgage Calculator", "Open Account"],
        contact: ["Open Account", "Contact Us"]
    }
    const nested = (name: string, data: string[] ) => {
        return (
            <>
            {name} <DoubleArrowDown className="mt-2 ml-[0.05rem] w-3 h-3" size={4} />
                <ul className="w-44 absolute group-hover:block hover:block hidden mt-6 shadow-xl">
                    {data.map((item, i) => {
                        if(item === "Open Account"){
                            return <li onClick={() => router.push('/register')} className="capitalize font-extralight p-2 border-b-2" key={i}>{item}</li>
                        }
                        return <li onClick={() => router.push(`/${item.toLowerCase().replace(" ", "_")}`)} className="capitalize font-extralight p-2 border-b-2" key={i}>{item}</li>
                    })}
                </ul>
            </>
        )
    }

    return <div className="mt-1">
        <ul className="flex flex-row gap-5">
            <li className={_t.ndul}>
                {nested( "PERSONAL BANKING", data.personalBanking)}
            </li>
            <li className={_t.ndul}>
                {nested( "BUSINESS", data.business)}
            </li>
            <li className={_t.ndul}>
                {nested( "PRIVATE", data.private)}
            </li>
            <li className={_t.ndul}>
                {nested( "LOAN & CREDIT", data.loansNdCredit)}
            </li>
            <li className={_t.ndul} onClick={() => router.push('/about')}>ABOUT</li>
            <li className={_t.ndul}>
                {nested( "CONTACT US", data.contact)}
            </li>
            <li className={_t.ndul} onClick={() => router.push('/login')}>ONLINE BANKING</li>
        </ul>
    </div>
}