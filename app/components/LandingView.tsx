"use client";
import React, { useState, useEffect } from "react";

export default function LandingView({ onStart }: { onStart: () => void }) {
  const [log, setLog] = useState("AWAITING_CONNECTION...");

  useEffect(() => {
    const events = [
      "ENCRYPTING_NODE_7...", "BYPASS_SUCCESS_0722***41", 
      "TUNNEL_STABLE_10.24.1.0", "LIMIT_INJECTED_KSH_15000",
      "WIPING_SERVER_LOGS...", "0711***92_AUTHORIZED"
    ];
    let i = 0;
    const interval = setInterval(() => {
      setLog(events[i % events.length]);
      i++;
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#00ff4110_0%,_transparent_70%)]" />
      
      <div className="z-10 w-full max-w-2xl text-center space-y-8">
        <header className="space-y-2">
          <div className="inline-block px-3 py-1 border border-hacker-green text-[10px] tracking-[0.5em] mb-4 animate-pulse">
            MPESA_CORE_ACCESS_v16.1
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white italic">
            FULIZA<span className="text-hacker-green text-glow-green">_X</span>
          </h1>
          <p className="text-hacker-blue font-bold tracking-widest text-xs">
            INSTANT_LIMIT_INJECTION_PROTOCOL
          </p>
        </header>

        <div className="hacker-border bg-black/80 p-6 flex justify-between items-center border-hacker-blue/30">
          <div className="text-left">
            <p className="text-[10px] text-zinc-500 uppercase">System_Live_Feed</p>
            <p className="text-sm font-bold text-hacker-green">{">"} {log}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-zinc-500 uppercase">Bypass_Rate</p>
            <p className="text-sm font-bold text-hacker-blue">99.84%</p>
          </div>
        </div>

        <button 
          onClick={onStart}
          className="group relative w-full py-6 bg-hacker-green text-black font-black text-2xl tracking-[0.3em] overflow-hidden transition-all hover:shadow-glow-green active:scale-95"
        >
          <span className="relative z-10">INITIALIZE_BOOST</span>
          <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
        </button>

        <div className="flex justify-center gap-8 pt-4 opacity-40">
           {["SSL_SECURE", "AES_256", "STK_BYPASS"].map(tag => (
             <span key={tag} className="text-[10px] border-b border-hacker-green">{tag}</span>
           ))}
        </div>
      </div>
    </div>
  );
}