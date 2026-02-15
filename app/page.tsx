"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [lastUpgrade, setLastUpgrade] = useState({ phone: "0722****12", amount: "5,000" });

  // Simulated live updates for "recently upgraded" clients
  useEffect(() => {
    const interval = setInterval(() => {
      const phones = ["0703****60", "0798****11", "0712****88", "0755****40"];
      const amounts = ["10,000", "5,000", "25,000", "15,000"];
      setLastUpgrade({
        phone: phones[Math.floor(Math.random() * phones.length)],
        amount: amounts[Math.floor(Math.random() * amounts.length)],
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="crt-screen min-h-screen flex flex-col items-center justify-center p-4 md:p-10">
      {/* BACKGROUND DECORATION */}
      <div className="fixed inset-0 pointer-events-none opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

      <div className="z-10 w-full max-w-lg">
        {/* TOP STATUS BAR - MIMICKING FIGMA NOTIFICATION */}
        <div className="mb-6 bg-hacker-black/80 border-l-4 border-hacker-green p-4 shadow-glow-green animate-pulse">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-hacker-green shadow-[0_0_8px_#00ff41]" />
            <p className="text-[10px] md:text-xs font-mono tracking-widest">
              [SYSTEM_LOG]: {lastUpgrade.phone} INCREASED TO KSH {lastUpgrade.amount}
            </p>
          </div>
          <p className="text-[9px] text-hacker-blue mt-1 opacity-70 italic font-sans normal-case">
            Instant Limit Increase • Guaranteed Approval • Just Now
          </p>
        </div>

        {/* MAIN TERMINAL WINDOW */}
        <div className="hacker-border bg-black/90 p-8 relative overflow-hidden">
          {/* SCANLINE OVERLAY */}
          <div className="absolute inset-0 pointer-events-none bg-scanline opacity-10 animate-scanline" />

          <header className="flex justify-between items-start mb-10 border-b border-hacker-green/30 pb-4">
            <div>
              <h1 className="text-3xl font-black text-hacker-green tracking-tighter">
                FULIZA<span className="text-hacker-blue">_X_</span>PRO
              </h1>
              <p className="text-[10px] text-hacker-blue">GATEWAY: SECURE_ENCRYPTED_v16.1</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] block text-hacker-red">ENCRYPTION: AES-256</span>
              <span className="text-[10px] block text-hacker-green">STATUS: BYPASS_ACTIVE</span>
            </div>
          </header>

          <div className="space-y-8">
            {/* CURRENT STATUS */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-hacker-green/20 blur opacity-25 group-hover:opacity-50 transition" />
              <div className="relative p-6 bg-black border border-hacker-green/50">
                <p className="text-hacker-blue text-[10px] mb-2 font-bold tracking-[0.2em]">
                  DETECTION_BALANCE
                </p>
                <p className="text-4xl font-black text-hacker-green drop-shadow-[0_0_10px_#00ff41]">
                  KSH 15,250<span className="text-xl opacity-50">.00</span>
                </p>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-col gap-4">
              <Link href="/boost" className="w-full">
                <button className="w-full group relative overflow-hidden bg-hacker-green text-black font-black py-5 tracking-[0.3em] hover:shadow-glow-green transition-all transform active:scale-95">
                  <span className="relative z-10">[ EXECUTE_BOOST ]</span>
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                </button>
              </Link>

              <Link href='/about'>
                <button className="w-full border border-hacker-blue text-hacker-blue font-bold py-4 text-xs tracking-widest hover:bg-hacker-blue/10 transition-colors">
                  {">"} VIEW_HISTORY.LOG
                </button>
              </Link>
            </div>
          </div>

          <footer className="mt-12">
            <div className="flex justify-between text-[9px] text-hacker-green/50 mb-4">
              <span>ROOT@MPESA:~# _</span>
              <span>CONNECTION: STABLE</span>
            </div>
            <p className="text-center text-[9px] text-hacker-red leading-tight opacity-80 font-sans normal-case">
              *Your limit is injected into the server every 24 hours based on system availability.*
            </p>
          </footer>
        </div>

        {/* FOOTER BADGE */}
        <div className="mt-6 flex justify-center items-center gap-6 opacity-60">
           <div className="text-[10px] border border-hacker-blue px-2 py-1 text-hacker-blue">VERIFIED_SECURE</div>
           <div className="text-[10px] border border-hacker-green px-2 py-1 text-hacker-green">E2E_ENCRYPTED</div>
        </div>
      </div>
    </main>
  );
}