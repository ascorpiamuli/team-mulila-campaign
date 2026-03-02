// components/email/EmailTemplate.tsx
interface EmailTemplateProps {
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
}

export function EmailTemplate({ name, email, subject, message, date }: EmailTemplateProps) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form Submission</title>
      <style>
        /* Terminal-inspired styles */
        body {
          background-color: #0a0a0a;
          font-family: 'Courier New', monospace;
          margin: 0;
          padding: 20px;
          color: #00ff41;
        }
        .terminal {
          max-width: 600px;
          margin: 0 auto;
          border: 2px solid #00ff41;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 0 20px rgba(0, 255, 65, 0.3);
        }
        .terminal-header {
          background-color: #1a1a1a;
          padding: 12px 16px;
          border-bottom: 1px solid #00ff41;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .terminal-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          display: inline-block;
        }
        .dot-red { background-color: #ff5f56; }
        .dot-yellow { background-color: #ffbd2e; }
        .dot-green { background-color: #00ff41; }
        .terminal-title {
          color: #888;
          font-size: 14px;
          margin-left: 8px;
        }
        .terminal-body {
          background-color: #000000;
          padding: 24px;
          color: #00ff41;
        }
        .command-line {
          color: #00ff41;
          font-size: 16px;
          margin-bottom: 16px;
        }
        .prompt {
          color: #00ff41;
          font-weight: bold;
        }
        .output {
          color: #ffffff;
          margin-left: 20px;
          margin-bottom: 20px;
          padding-left: 10px;
          border-left: 2px solid #00ff41;
        }
        .output-line {
          margin: 8px 0;
          color: #cccccc;
        }
        .label {
          color: #00ff41;
          font-weight: bold;
        }
        .value {
          color: #ffffff;
          margin-left: 10px;
        }
        .separator {
          border-top: 1px dashed #00ff41;
          margin: 20px 0;
          opacity: 0.3;
        }
        .footer {
          text-align: center;
          margin-top: 24px;
          color: #666;
          font-size: 12px;
        }
        .blink {
          animation: blink 1s step-end infinite;
        }
        @keyframes blink {
          from, to { opacity: 1; }
          50% { opacity: 0; }
        }
      </style>
    </head>
    <body>
      <div class="terminal">
        <!-- Terminal Header -->
        <div class="terminal-header">
          <span class="terminal-dot dot-red"></span>
          <span class="terminal-dot dot-yellow"></span>
          <span class="terminal-dot dot-green"></span>
          <span class="terminal-title">contact@portfolio:~$</span>
        </div>
        
        <!-- Terminal Body -->
        <div class="terminal-body">
          <div class="command-line">
            <span class="prompt">$</span> cat new-message.txt
          </div>
          
          <div class="output">
            <div class="output-line">
              <span class="label">[+] New Contact Form Submission</span>
            </div>
            <div class="output-line">
              <span class="label">├─ Timestamp:</span>
              <span class="value">${date}</span>
            </div>
            <div class="separator"></div>
            
            <div class="output-line">
              <span class="label">├─ SENDER INFORMATION</span>
            </div>
            <div class="output-line">
              <span class="label">│  ├─ Name:</span>
              <span class="value">${name}</span>
            </div>
            <div class="output-line">
              <span class="label">│  ├─ Email:</span>
              <span class="value">${email}</span>
            </div>
            <div class="output-line">
              <span class="label">│  └─ Subject:</span>
              <span class="value">${subject || '(No subject)'}</span>
            </div>
            <div class="separator"></div>
            
            <div class="output-line">
              <span class="label">├─ MESSAGE CONTENT</span>
            </div>
            <div class="output-line" style="margin-left: 20px; white-space: pre-wrap;">
              <span class="value">${message.replace(/\n/g, '<br>')}</span>
            </div>
            <div class="separator"></div>
            
            <div class="output-line">
              <span class="label">└─ Status:</span>
              <span class="value">Pending review <span class="blink">_</span></span>
            </div>
          </div>
          
          <div class="footer">
            <span>─── ✦ Portfolio Contact System v1.0 ✦ ───</span>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}