// app/api/contact/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { EmailTemplate } from '@/components/email/EmailTemplate';

export async function POST(request: Request) {
  const debug = {
    steps: [] as string[],
    errors: [] as string[],
    config: {} as any,
    startTime: Date.now()
  };

  try {
    debug.steps.push('📥 Request received');
    
    const body = await request.json();
    const { name, email, subject, message } = body;
    
    debug.steps.push(`📦 Parsed body: name="${name}", email="${email}"`);
    
    // Log environment variables (without exposing full passwords)
    debug.config = {
      host: process.env.SMTP_HOST ? '✅ Set' : '❌ Missing',
      port: process.env.SMTP_PORT ? '✅ Set' : '❌ Missing',
      user: process.env.SMTP_USER ? '✅ Set' : '❌ Missing',
      pass: process.env.SMTP_PASS ? '✅ Set (hidden)' : '❌ Missing',
      from: process.env.SMTP_FROM_EMAIL ? '✅ Set' : '❌ Missing',
      recipient: process.env.CONTACT_RECIPIENT_EMAIL ? '✅ Set' : '❌ Missing',
    };
    debug.steps.push('🔍 Config check: ' + JSON.stringify(debug.config));

    // Validate required fields
    if (!name || !email || !message) {
      debug.errors.push('Missing required fields');
      return NextResponse.json(
        { error: 'Missing fields', debug },
        { status: 400 }
      );
    }

    // Create transporter
    debug.steps.push('🔄 Creating SMTP transporter...');
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true, // true for 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      debug: true, // Enable SMTP debugging
      logger: true, // Log to console
    });

    // Verify connection
    debug.steps.push('🔌 Verifying SMTP connection...');
    try {
      await transporter.verify();
      debug.steps.push('✅ SMTP connection verified');
    } catch (verifyError: any) {
      debug.errors.push(`SMTP verification failed: ${verifyError.message}`);
      throw verifyError;
    }

    // Prepare email
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
      to: process.env.CONTACT_RECIPIENT_EMAIL,
      replyTo: email,
      subject: `📬 Portfolio Contact: ${subject || 'Message from ' + name}`,
      text: `
        New contact form submission:
        
        Name: ${name}
        Email: ${email}
        Subject: ${subject || '(No subject)'}
        
        Message:
        ${message}
      `,
      html: htmlContent,
    };

    debug.steps.push(`📧 Sending email to: ${process.env.CONTACT_RECIPIENT_EMAIL}`);
    debug.steps.push(`📨 From: ${process.env.SMTP_FROM_EMAIL}`);
    debug.steps.push(`↩️ Reply-To: ${email}`);

    // Send email
    const info = await transporter.sendMail(mailOptions);
    
    debug.steps.push(`✅ Email sent! Message ID: ${info.messageId}`);
    debug.steps.push(`📤 Response: ${info.response}`);

    // Log full info for debugging
    console.log('📧 FULL EMAIL INFO:', info);

    const elapsed = Date.now() - debug.startTime;
    debug.steps.push(`⏱️ Total time: ${elapsed}ms`);

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully!',
      messageId: info.messageId,
      debug: debug
    });

  } catch (error: any) {
    console.error('🔥 EMAIL ERROR:', error);
    
    debug.errors.push(`Error: ${error.message}`);
    if (error.code) debug.errors.push(`Code: ${error.code}`);
    if (error.command) debug.errors.push(`Command: ${error.command}`);
    
    const elapsed = Date.now() - debug.startTime;
    debug.steps.push(`⏱️ Failed after ${elapsed}ms`);

    return NextResponse.json({
      error: 'Failed to send email',
      details: error.message,
      debug: debug
    }, { status: 500 });
  }
}

export async function GET() {
  // Test endpoint with more detailed info
  const config = {
    host: process.env.SMTP_HOST ? '✅ Set' : '❌ Missing',
    port: process.env.SMTP_PORT ? '✅ Set' : '❌ Missing',
    user: process.env.SMTP_USER ? '✅ Set' : '❌ Missing',
    pass: process.env.SMTP_PASS ? '✅ Set' : '❌ Missing',
    from: process.env.SMTP_FROM_EMAIL ? '✅ Set' : '❌ Missing',
    recipient: process.env.CONTACT_RECIPIENT_EMAIL ? '✅ Set' : '❌ Missing',
  };

  let connectionTest = 'Not tested';
  let connectionError = null;

  // Test SMTP connection
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.verify();
    connectionTest = '✅ SUCCESS';
  } catch (error: any) {
    connectionTest = '❌ FAILED';
    connectionError = error.message;
  }

  return NextResponse.json({
    status: 'SMTP Debug Info',
    config,
    connectionTest,
    connectionError,
    timestamp: new Date().toISOString(),
  });
}