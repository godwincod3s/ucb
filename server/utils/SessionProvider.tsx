"use client"
// import { persistor } from "@/app/redux/store";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
// import { PersistGate } from "redux-persist/lib/integration/react";


const AuthProvider = ({ ...props }: { children: React.ReactNode, session: Session | null } ) => {
    return (
        <SessionProvider session={props.session} >
            {/* <PersistGate persistor={persistor}> */}
                {props.children}
            {/* </PersistGate> */}
        </SessionProvider>
        );
}
// const AuthProvider = ({ children, ...props }: { children: React.ReactNode, session: session: Session | null } ) => {
//     return (<SessionProvider session={props.session} >{children}</SessionProvider>);
// }
export default AuthProvider;