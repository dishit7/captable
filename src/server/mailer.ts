/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { env } from "@/env";
import { type SendMailOptions, createTransport } from "nodemailer";

const getTransport = () => {
  // Create transport with explicit Gmail SMTP config
  const transport = createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
      user: env.GMAIL_USER,
      pass: env.GMAIL_APP_PASSWORD
    },
    debug: true
  });

  // Test the connection
  transport.verify((error, success) => {
    if (error) {
      console.error('SMTP connection error:', error);
    } else {
      console.log('SMTP connection successful');
    }
  });

  return transport;
};

export const sendMail = async (options: Omit<SendMailOptions, "from">) => {
  try {
    const transport = getTransport();
    
    const mailOptions = {
      from: env.EMAIL_FROM,
      ...options,
    };

    console.log('Sending email with options:', {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject
    });

    const info = await transport.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return info;
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
};