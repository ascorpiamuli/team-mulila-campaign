// lib/email/service.ts
import nodemailer from 'nodemailer';
import { EmailTemplate } from '@/components/email/EmailTemplate';

interface EmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Create transporter once and reuse (connection pooling for better performance)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  pool: true, // Enable connection pooling
  maxConnections: 5,
  maxMessages: 100,
});

export async function sendContactEmail(data: EmailData) {
  const { name, email, subject, message } = data;
  
  const date = new Date().toLocaleString('en-KE', {
    timeZone: 'Africa/Nairobi',
    dateStyle: 'full',
    timeStyle: 'medium'
  });

  const htmlContent = EmailTemplate({
    name,
    email,
    subject,
    message,
    date
  });

  const mailOptions = {
    from: `"Stephen Muli Portfolio" <${process.env.SMTP_FROM_EMAIL}>`,
    to: process.env.CONTACT_RECIPIENT_EMAIL, // Your email where you want to receive messages
    replyTo: email,
    subject: `📬 New Portfolio Contact: ${subject || 'Message from ' + name}`,
    text: `
      New contact form submission from your portfolio:
      
      Name: ${name}
      Email: ${email}
      Subject: ${subject || '(No subject)'}
      
      Message:
      ${message}
      
      ---
      Sent via your portfolio contact form
    `,
    html: htmlContent,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

// Optional: Verify connection configuration
export async function verifyEmailConnection() {
  try {
    await transporter.verify();
    console.log('✅ SMTP connection is ready');
    return true;
  } catch (error) {
    console.error('❌ SMTP connection failed:', error);
    return false;
  }
}