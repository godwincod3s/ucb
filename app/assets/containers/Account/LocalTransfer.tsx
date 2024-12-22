
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/navigation';
// search UK, Europe, America, Asia and West Africa country

import Logo from '@/app/assets/img/logo.png';
import { useForm } from '../../hooks/useForm';
import React from 'react';

const fields = [
    { 
        type: 'select',  name: "state", label: "Reciever State", placeholder: "Choose your state in the United States",
        options: [
            "Alabama", "Alaska", "Arizona", "Arkansas", "California",
            "Colorado", "Connecticut", "Delaware", "Florida", "Georgia",
            "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
            "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland",
            "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri",
            "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
            "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
            "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
            "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
            "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
          ]
    },
    { 
        type: 'select', name: "bank", label: "Recieving Bank", placeholder: "Select Beneficiary Bank",
        options: [
            "Ally Bank", "American Express", "Bank of America", "Bank OZK", "Bank of the West",
            "BBVA USA", "BMO Harris Bank", "Capital One", "Charles Schwab", "Citibank",
            "Citizens Bank", "Comerica Bank", "Discover Bank", "Fifth Third Bank", "First Horizon Bank",
            "First National Bank", "First Republic Bank", "Goldman Sachs", "HSBC USA", "Huntington Bank",
            "JPMorgan Chase", "KeyBank", "M&T Bank", "Morgan Stanley", "New York Community Bank",
            "Northern Trust", "People's United Bank", "PNC Bank", "Regions Bank", "Signature Bank",
            "Silicon Valley Bank", "SunTrust Bank", "Synchrony Bank", "TD Bank", "Truist Bank",
            "U.S. Bank", "Union Bank", "Unity Capital Bank", "Wells Fargo", "Western Alliance Bank", "Zions Bank"
          ]
    },
    { type: 'text', name: "fullname", label: "Reciever Name",placeholder: "Reciever FullName"},
    { type: 'number', name: "account", label: "Reciever Account", placeholder: "Reciever Account Number"},
    { type: 'number', name: "routing", label: "Routing Number", placeholder: "Routing Number Only"},
    { type: 'number', name: "amount", label: "Transfer Amount", placeholder: "Amount To Send to Reciever"},
]

export default function LocalTransfer({ session, user }: any) {
    const router = useRouter();
    const [ values, setValues ] = useForm()  

    // React.useEffect(() => {

    // }, values)

    const transfer = async () => {
        const res = await axios.post('/api/transfer', {
            ...values,
            email: user.email
        })

        console.log(res)
    }

    return (
        <div className="py-10">
            <div className=" w-[50vw] transform translate-x-[50%] p-2 ">
                <h1 className='text-center font-medium text-2xl mb-4'>LOCAL FUNDS TRANSFER</h1>
                <p className='text-center font-medium text-md'>Local bank transfer is a cross-border payment method where a deposit is made into a local bank account.</p>
                <p className='text-center font-medium text-md mb-4'>{"local bank transfers involves an intermediary organisation or finantial institution which operates between the payer (or the originator) of the transfer and the payee (or the reciever) of the payment"}</p>
            </div>

            <div className=" flex flex-col w-[50vw] my-8 transform translate-x-[50%] px-4 py-8 gap-y-6 bg-white">
                <h4 className='text-center font-medium lg:text-2xl text-lg'>Please ensure all fields are completed</h4>

                {fields.map((item) => {
                    if(item.type === 'select'){
                        return <div key={item.name}>
                            <h5>{item.label}</h5>
                            <select className="px-4 py-2 border min-w-full"  onChange={(e) => {
                                if(e.target.value !== item.placeholder ){
                                    setValues(e)
                                }
                            }} name={item.name}>
                                <option>{item.placeholder}</option>
                                {item.options?.map((option) => (<option key={option}>{option}</option>))}
                            </select>
                        </div>
                    }else {
                        return <div key={item.name}>
                            <h5>{item.label}</h5>
                            <input className="px-4 py-2 border min-w-full" onChange={(e) => setValues(e)} name={item.name} type={item.type} placeholder={item.placeholder} />
                        </div>
                    }
                })}

                
                <div onClick={transfer} className='font-semibold text-center text-gray-100 cursor-pointer inline-block px-6 py-3 bg-green-500 rounded-md mt-4'>Make Transfer</div>
            </div>



        </div>
    )
}