export default function Dashboard({ session, user }: any) {
    return (
        <div className="lg:w-[70vw] m-[5%] lg:ml-[18vw] xl:ml-[15vw] grid grid-flow-row lg:grid-cols-2 gap-y-16 gap-x-4">
                <div className="relative bg-white shadow-lg w-full min-h-[20vh] rounded-md lg:col-span-2">
                    <div className="absolute bg-stone-700 ml-5 mt-[-1rem] min-w-[5vw] min-h-[5vh] max-h-[18vh] max-w-[19vh] w-[30vw] h-[18vh] lg:w-[15vw] lg:h-[15vh] rounded-md ">
                        <img className=" rounded-md" src="https://th.bing.com/th?id=OIP.LmUGJhw5D7zruBaxMBxFOwHaHD&w=256&h=243&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2" alt="profile photo id"/>
                    </div>
                    
                    <div className=" h-full flex flex-col justify-between">
                        <div className="text-right m-4 ">
                            <p>{session?.user?.name}</p>
                            <p>Account Number: {user.accountNumber}</p>
                            <p>{user.accountType} ACCOUNT</p>
                        </div>

                        <div className="  mx-5 my-1">
                            {user.updatedAt}
                        </div>
                    </div>
                </div>
                <div className="relative bg-white shadow-lg w-full min-h-[20vh] rounded-md ">
                    <div className="absolute bg-stone-700 ml-5 mt-[-1rem] w-[30vw] h-[18vh] lg:w-[15vw] lg:h-[15vh] rounded-md ">top left card</div>
                    
                        <div className=" h-full flex flex-col justify-between">
                        <div className="text-right m-4 ">
                            <h3>Ledger Balance</h3>
                            <p>$ {user.ledgerBalance}</p>
                        </div>

                        <div className="  mx-5 my-1">
                            {user.updatedAt}
                        </div>
                    </div>
                </div>
                <div className="relative bg-white shadow-lg w-full min-h-[20vh] rounded-md ">
                    <div className="absolute bg-stone-700 ml-5 mt-[-1rem] w-[30vw] h-[18vh] lg:w-[15vw] lg:h-[15vh] rounded-md ">top left card</div>
                    
                    <div className=" h-full flex flex-col justify-between">
                        <div className="text-right m-4 ">
                            <h3>Loan Balance</h3>
                            <p>$ {user.loanBalance}</p>
                        </div>

                        <div className="  mx-5 my-1">
                            {user.updatedAt}
                        </div>
                    </div>
                </div>

            </div>
    )
}