"use client";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";

// Algorithmic Logic for Random Data Generation
const generateRandomClient = () => {
  const prefixes = ["0703", "0722", "0798", "0110", "0755", "0712", "0741"];
  const amounts = ["5,000", "10,000", "15,000", "20,000", "25,000", "30,000", "45,000"];
  
  const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const randomSuffix = Math.floor(10 + Math.random() * 90); // Last two digits
  const randomAmount = amounts[Math.floor(Math.random() * amounts.length)];
  
  return {
    id: Math.random().toString(36).substr(2, 9),
    phone: `${randomPrefix}****${randomSuffix}`,
    amount: randomAmount,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  };
};

export default function Home() {
  const [logStack, setLogStack] = useState<ReturnType<typeof generateRandomClient>[]>([]);
  const [systemStatus, setSystemStatus] = useState("IDLE");

  // Push new random data to the stack periodically
  const updateLogs = useCallback(() => {
    const newClient = generateRandomClient();
    setLogStack((prev) => [newClient, ...prev].slice(0, 5)); // Keep last 5 logs
    setSystemStatus("PACKET_INJECTED");
    setTimeout(() => setSystemStatus("STABLE"), 1000);
  }, []);

  useEffect(() => {
    const interval = setInterval(updateLogs, Math.random() * 4000 + 2000); // Random interval 2-6s
    return () => clearInterval(interval);
  }, [updateLogs]);

  return (
    <main className="crt-screen min-h-screen flex flex-col items-center justify-center p-4 bg-black overflow-hidden">
      {/* Animated Background Grid */}
      <div className="fixed inset-0 pointer-events-none opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="z-10 w-full max-w-2xl space-y-4">
        
        {/* LIVE SYSTEM FEED - ALGORITHMICALLY GENERATED */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="md:col-span-2 hacker-border bg-black/80 p-4 h-48 overflow-hidden relative">
            <div className="flex justify-between items-center mb-2 border-b border-hacker-green/20 pb-1">
              <span className="text-[10px] text-hacker-blue font-bold">LIVE_TRANSACTION_FEED</span>
              <span className="text-[10px] text-hacker-green animate-pulse">● LIVE</span>
            </div>
            <div className="space-y-1">
              {logStack.map((log) => (
                <div key={log.id} className="text-[10px] flex justify-between font-mono animate-in fade-in slide-in-from-left-2">
                  <span className="text-hacker-green">[{log.timestamp}]</span>
                  <span className="text-white">USR_{log.phone}</span>
                  <span className="text-hacker-blue">+{log.amount} KSH</span>
                  <span className="text-hacker-green">[SUCCESS]</span>
                </div>
              ))}
              {logStack.length === 0 && <p className="text-[10px] text-zinc-600 italic tracking-widest">Awaiting connection...</p>}
            </div>
          </div>

          <div className="hacker-border bg-black/80 p-4 flex flex-col justify-center items-center">
            <p className="text-[10px] text-hacker-blue mb-1">NODE_STATUS</p>
            <p className={`text-xl font-black ${systemStatus === "STABLE" ? "text-hacker-green" : "text-hacker-red animate-pulse"}`}>
              {systemStatus}
            </p>
            <div className="mt-4 w-full bg-zinc-900 h-1 relative overflow-hidden">
              <div className="absolute inset-0 bg-hacker-green animate-scanline" />
            </div>
          </div>
        </div>

        {/* MAIN INTERFACE */}
        <div className="hacker-border bg-black/90 p-10 shadow-glow-green relative">
          <div className="absolute top-0 right-0 p-2 text-[8px] text-hacker-green/30">v16.1.6-STABLE</div>
          
          <div className="text-center mb-10">
            <h2 className="text-hacker-blue text-xs tracking-[0.5em] mb-2 font-bold uppercase">M-Pesa Core Exploit</h2>
            <h1 className="text-5xl font-black tracking-tighter text-white">
              FULIZA<span className="text-hacker-green">_BOOST</span>
            </h1>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="p-6 border border-dashed border-hacker-green/50 bg-hacker-green/5 text-center">
              <p className="text-[10px] text-hacker-green uppercase tracking-widest mb-1">Target Account Limit</p>
              <p className="text-4xl font-mono font-bold shadow-glow-green text-hacker-green">
                KSH 150,000<span className="text-sm opacity-50 ml-1">MAX</span>
              </p>
            </div>

            <Link href="/auth" className="block group">
              <button className="w-full py-6 bg-hacker-green text-black font-black text-xl tracking-widest hover:bg-black hover:text-hacker-green border-2 border-hacker-green transition-all shadow-glow-green">
                INITIALIZE_INJECTION
              </button>
            </Link>

            <div className="flex justify-between items-center px-2">
              <div className="flex gap-2">
                 <div className="w-2 h-2 bg-hacker-red rounded-full shadow-glow-red" />
                 <div className="w-2 h-2 bg-hacker-blue rounded-full shadow-glow-blue" />
                 <div className="w-2 h-2 bg-hacker-green rounded-full shadow-glow-green" />
              </div>
              <p className="text-[9px] text-zinc-500 font-mono italic">
                Bypassing Safaricom Firewall... 98%
              </p>
            </div>
          </div>
        </div>

        {/* SECURITY NOTICES */}
        <div className="flex flex-wrap justify-center gap-4 py-4">
          {["PROXY_HIDDEN", "SSL_OVERRIDE", "AES_V3"].map((tag) => (
            <span key={tag} className="text-[9px] border border-hacker-blue/30 px-3 py-1 text-hacker-blue font-bold tracking-tighter">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </main>
  );
}