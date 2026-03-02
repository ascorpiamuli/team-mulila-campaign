// app/test-email/page.tsx
"use client";

import { useState } from 'react';

export default function TestEmailPage() {
  const [status, setStatus] = useState('');
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`]);
  };

  const clearLogs = () => {
    setLogs([]);
    setStatus('');
  };

  const testEmail = async () => {
    addLog('🚀 Starting email test...');
    setStatus('Sending...');
    
    try {
      const testData = {
        name: 'Test User',
        email: 'developer.muli@gmail.com',
        subject: 'Test Subject',
        message: 'This is a test message from the portfolio.'
      };
      
      addLog(`📨 Sending request to /api/contact`);
      addLog(`📝 Payload: ${JSON.stringify(testData, null, 2)}`);
      
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testData)
      });
      
      addLog(`📡 Response status: ${res.status} ${res.statusText}`);
      
      const data = await res.json();
      addLog(`📦 Response data: ${JSON.stringify(data, null, 2)}`);
      
      setStatus(JSON.stringify(data, null, 2));
      
      if (res.ok) {
        addLog('✅ Email test completed successfully');
        addLog('📧 Check your inbox (and spam folder) for the test email');
      } else {
        addLog(`❌ Email test failed with status ${res.status}`);
      }
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      addLog(`🔥 Error: ${errorMessage}`);
      setStatus('Error: ' + errorMessage);
    }
  };

  const testConnection = async () => {
    addLog('🔌 Testing SMTP connection...');
    setStatus('Testing connection...');
    
    try {
      addLog('📨 Sending connection test to /api/contact');
      
      const res = await fetch('/api/contact');
      
      addLog(`📡 Response status: ${res.status} ${res.statusText}`);
      
      const data = await res.json();
      addLog(`📦 Response data: ${JSON.stringify(data, null, 2)}`);
      
      setStatus(JSON.stringify(data, null, 2));
      
      if (res.ok && data.status === 'SMTP connection OK') {
        addLog('✅ SMTP connection is healthy');
      } else {
        addLog('⚠️ SMTP connection可能有异常');
      }
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      addLog(`🔥 Connection test error: ${errorMessage}`);
      setStatus('Error: ' + errorMessage);
    }
  };

  const checkEnvVars = () => {
    addLog('🔍 Checking environment variables...');
    
    // These will be undefined on client side, but we can check if they exist
    const envChecks = [
      { name: 'SMTP_HOST', exists: !!process.env.NEXT_PUBLIC_SMTP_HOST },
      { name: 'SMTP_PORT', exists: !!process.env.NEXT_PUBLIC_SMTP_PORT },
      { name: 'SMTP_USER', exists: !!process.env.NEXT_PUBLIC_SMTP_USER },
      { name: 'SMTP_PASS', exists: !!process.env.NEXT_PUBLIC_SMTP_PASS },
      { name: 'CONTACT_RECIPIENT_EMAIL', exists: !!process.env.NEXT_PUBLIC_CONTACT_EMAIL },
    ];
    
    envChecks.forEach(check => {
      addLog(`${check.exists ? '✅' : '❌'} ${check.name}: ${check.exists ? 'Set' : 'Not set'}`);
    });
    
    if (!envChecks.every(check => check.exists)) {
      addLog('⚠️ Some environment variables are missing. Check your .env.local file');
    }
  };

  return (
    <div className="min-h-screen bg-black p-8 font-mono">
      <div className="max-w-4xl mx-auto">
        {/* Terminal Header */}
        <div className="border-2 border-green-primary/30 rounded-lg overflow-hidden bg-black">
          <div className="bg-gray-900 px-4 py-3 border-b border-green-primary/30 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
            <span className="w-3 h-3 rounded-full bg-green-500"></span>
            <span className="ml-2 text-green-primary text-sm">test@portfolio:~/email-test$</span>
          </div>
          
          <div className="p-6">
            {/* Title */}
            <div className="mb-6">
              <h1 className="text-2xl text-green-primary">
                <span className="text-gray-500">$</span> email --debug-mode
              </h1>
              <p className="text-gray-500 text-sm mt-1">Email System Diagnostic Tool</p>
            </div>
            
            {/* Control Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
              <button 
                onClick={testEmail}
                className="px-4 py-3 bg-green-primary/10 border border-green-primary/30 rounded-lg text-green-primary hover:bg-green-primary/20 transition-all font-mono text-left flex items-center gap-2"
              >
                <span className="text-green-primary">📧</span>
                <span>test send email</span>
              </button>
              
              <button 
                onClick={testConnection}
                className="px-4 py-3 bg-blue-500/10 border border-blue-500/30 rounded-lg text-blue-400 hover:bg-blue-500/20 transition-all font-mono text-left flex items-center gap-2"
              >
                <span className="text-blue-400">🔌</span>
                <span>test smtp connection</span>
              </button>
              
              <button 
                onClick={checkEnvVars}
                className="px-4 py-3 bg-purple-500/10 border border-purple-500/30 rounded-lg text-purple-400 hover:bg-purple-500/20 transition-all font-mono text-left flex items-center gap-2"
              >
                <span className="text-purple-400">🔍</span>
                <span>check environment</span>
              </button>
              
              <button 
                onClick={clearLogs}
                className="px-4 py-3 bg-gray-500/10 border border-gray-500/30 rounded-lg text-gray-400 hover:bg-gray-500/20 transition-all font-mono text-left flex items-center gap-2"
              >
                <span className="text-gray-400">🗑️</span>
                <span>clear logs</span>
              </button>
            </div>

            {/* Response Output */}
            <div className="mb-6">
              <div className="text-green-primary mb-2 flex items-center gap-2">
                <span className="text-gray-500">$</span>
                <span>cat response.json</span>
              </div>
              <pre className="bg-gray-900 p-4 rounded-lg border border-green-primary/30 text-green-primary font-mono text-sm overflow-x-auto min-h-[100px]">
                {status || '{}'}
              </pre>
            </div>

            {/* Live Logs */}
            <div className="mt-6">
              <div className="text-green-primary mb-2 flex items-center gap-2">
                <span className="text-gray-500">$</span>
                <span>tail -f debug.log</span>
                {logs.length > 0 && (
                  <span className="text-xs text-gray-500 ml-auto">{logs.length} entries</span>
                )}
              </div>
              <div className="bg-gray-900 p-4 rounded-lg border border-green-primary/30 font-mono text-sm h-64 overflow-y-auto">
                {logs.length === 0 ? (
                  <div className="text-gray-600 italic">No logs yet. Run a test to see output...</div>
                ) : (
                  logs.map((log, index) => {
                    // Color code log messages
                    let colorClass = 'text-gray-300';
                    if (log.includes('✅')) colorClass = 'text-green-400';
                    if (log.includes('❌')) colorClass = 'text-red-400';
                    if (log.includes('⚠️')) colorClass = 'text-yellow-400';
                    if (log.includes('🔍')) colorClass = 'text-purple-400';
                    if (log.includes('📧') || log.includes('📨')) colorClass = 'text-blue-400';
                    if (log.includes('🔥')) colorClass = 'text-red-500 font-bold';
                    
                    return (
                      <div key={index} className={`${colorClass} mb-1 font-mono text-xs leading-relaxed`}>
                        <span className="text-gray-600">{log.split(']')[0]}]</span>
                        <span className="ml-2">{log.split(']')[1]}</span>
                      </div>
                    );
                  })
                )}
                <div className="h-4 w-4 bg-green-500 animate-pulse inline-block ml-1"></div>
              </div>
            </div>

            {/* Info Footer */}
            <div className="mt-6 text-xs text-gray-600 border-t border-green-primary/20 pt-4">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-green-primary mb-1">📧 Email Flow:</p>
                  <p className="text-gray-500">Form → API → SMTP → Your Inbox</p>
                </div>
                <div>
                  <p className="text-green-primary mb-1">🔍 Tips:</p>
                  <p className="text-gray-500">• Check spam folder</p>
                  <p className="text-gray-500">• Verify .env.local settings</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}