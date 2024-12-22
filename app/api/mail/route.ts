import { NextResponse } from "next/server";
import nodemailer from 'nodemailer';

interface EmailData {
    from: string;
    to: string;
    subject: string;
    html: string;
    text: string;
}

export const POST = async (request: any) => {
    const { email, message, name, to, subject, text, link } = await request.json(); // add subject

    let transport = {
        host: 'smtp.gmail.com', // mail provider smtp
        service: 'gmail', // or your email service
        port: 465, //465 ssl 587 tls
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS
      }
    }

    let transporter = nodemailer.createTransport(transport)

    transporter.verify((error, success) => {
        if (error) {
          console.log("Send mail verification error", error);
        } else {
          console.log('Server is ready to take messages ' + success);
        }
    });

    let content = text ? `<html>
    <head>
    <title>${name} is contacting you</title>
    </head>
    <body style=\"background-color:#fafafa;\">
        <div style=\"padding:20px;\">
        Date: <span style=\"color:#888\">${new Date()}</span>
        <br>
        Email: <span style=\"color:#888\">${to}</span>
        <br>
        <strong>${text || ''}</strong>: <div style=\"color:#888; font-size: 2rem;\">${link || ''}</div>
        </div>
    </body>
    </html>` : `<html>
    <head>
    <title>${name} is contacting you</title>
    </head>
    <body style=\"background-color:#fafafa;\">
        <div style=\"padding:20px;\">
        Date: <span style=\"color:#888\">${new Date()}</span>
        <br>
        Email: <span style=\"color:#888\">${email}</span>
        <br>
        Message: <div style=\"color:#888\">${message}</div>
        </div>
    </body>
    </html>`;

    let EmailData = {
        from: name || email,
        to: to,  // Email add to recieve mail
        subject: subject,
        html: content,
        text: message || text
    }

    async function sendEmail(emailData: EmailData) {
    
        try {
            transporter.sendMail(emailData, (error, info) => {
                if(error){
                    console.error('Error sending email:', error);
                }else {
                    console.log('Email Sent: %s', info.messageId);
                    return new NextResponse("True: message sent succesfully", { status: 200});
                }
            })
            
            return new NextResponse("message sent succesfully", { status: 200});
        } catch (error) {
            console.error('Error sending email:', error);
        }
    }
        
    await sendEmail(EmailData);
    return new NextResponse("message sent succesfully! But this is just a fix. for a better result, setup a listener.", { status: 200});

}