import NextAuth, { NextAuthOptions } from "next-auth";
import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth/next";
// import { Account, User as AuthUser } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs';

import User from '@/server/models/User';
import connect from "@/server/utils/connect";

const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: {label: "Email", type: "text"},
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials: any ) {

                const { account, password, remember } = credentials;
                console.log({ account, password, remember })

                try {
                    await connect();

                    const user: any = await User.findOne({accountNumber: account });
                    // const user: any = await User.findOneAndUpdate({accountNumber: account }, {rememberMe: remember}, { new: true, upsert: false })
                    
                    if(user) {
                        const isPasswordCorrect = await bcrypt.compare(
                            password,
                            user.password
                        )
                        if(isPasswordCorrect) {
                            return user;
                        }else{
                            throw new Error('Password is incorrect');
                        }
                    }else{
                        throw new Error('Account number is not found');
                    }

                } catch (err: any){ 
                    throw new Error(err);
                }
            }
        }),
    ],
    callbacks: {
        async signIn({ user, account }: any): Promise<any> {
            // console.log(account)
            if (!user) {
                return `/login?error=EmailNotFound`;
              }
            
            try {
                // await connect();
                
                if(account?.provider == "credentials"){
                    return true;
                }

            }catch (err) {
                console.log(err)
                const targetUrl = new URL('/login', process.env.NEXT_PUBLIC_BASE_URL);
                return Boolean(NextResponse.redirect(targetUrl));
            }
            return true;
        },
        async session({ session, token }: any) {
            // session.db = token.user; // from jwt
            // console.log(session)
            
            return session
        },
        async jwt({ token, user }) {
          // Add data to the JWT when the user signs in
        //   if (user) {
        //     token.user = user;
        //   }
          return token;
        },
    },
    pages: {
        signIn: "/login", // Custom sign-in page
        error: "/error", // Redirect here for errors
      },
}

const handler = NextAuth(authOptions);
export {handler as GET, handler as POST}