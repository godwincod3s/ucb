import { NextResponse } from "next/server";

// export const GET = async (req: any, res: any ) => {
//     console.log(req)
//     const ip = req.headers["x-forwarded-for"]; // || req.socket.remoteAddress
//     console.log("IP",ip)
//     return new NextResponse(ip, {status: 200})
//   }

//   export default function handler(req: any, res: any) {
//     const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
//     console.log('IP ',ip)
//     res.status(200).json({ ip });
//   }

  export async function GET(request: any ) {
    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") || // Some proxies use this header
      request.ip || // If deployed on Vercel, it supports `request.ip`
      "IP address not available";

    //   console.log("IP ", ip)
  
    return NextResponse.json({ ip });
  }