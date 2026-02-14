"use client";
import React, { useState, useEffect } from "react";
import MatrixRain from "./MatrixRain";

export default function SuccessFinale({ onSubscribe }: { onSubscribe: (email: string) => void }) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6">
      <MatrixRain />
      
      <div className="z-20 bg-black/95 border-4 border-hacker-red p-10 max-w-md w-full text-center animate-aggressive-shake shadow-glow-red">
        <h2 className="text-hacker-red text-6xl font-black mb-2 italic">SUCCESS</h2>
        <p className="text-white text-xs tracking-widest mb-8 border-b border-hacker-red/30 pb-4">
          LIMIT_SYNC_AUTHORIZED_PERMANENTLY
        </p>

        <div className="bg-hacker-red/10 p-4 border border-hacker-red mb-6">
          <p className="text-[10px] text-hacker-red mb-2 tracking-[0.4em]">SYSTEM_CLOSURE_IN:</p>
          <div className="text-3xl font-black text-hacker-red flex justify-center gap-2 italic">
            <Countdown digits={23} label="H" />:
            <Countdown digits={59} label="M" />:
            <Countdown digits={42} label="S" />
          </div>
        </div>

        {!subscribed ? (
          <div className="space-y-4 text-left">
            <p className="text-[10px] text-zinc-400 leading-relaxed">
              NODE_ROTATION_NOTICE: The current exploit path will expire shortly. Join the zero-day list for automated re-injection.
            </p>
            <input 
              type="email" 
              placeholder="UPLINK_EMAIL_ADDRESS"
              className="w-full bg-black border border-hacker-red p-3 text-hacker-red outline-none focus:ring-1 ring-hacker-red"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button 
              onClick={() => { setSubscribed(true); onSubscribe(email); }}
              className="w-full bg-hacker-red text-black font-black py-3 hover:bg-white transition-all"
            >
              SUBSCRIBE_ZERO_DAY
            </button>
          </div>
        ) : (
          <p className="text-hacker-green animate-pulse py-4 font-bold tracking-widest">
            [!] EMAIL_ENCRYPTED_AND_STORED
          </p>
        )}
      </div>
    </div>
  );
}

function Countdown({ digits, label }: { digits: number, label: string }) {
  return (
    <div className="flex flex-col">
      <span>{digits.toString().padStart(2, '0')}</span>
      <span className="text-[8px] -mt-1 font-bold">{label}</span>
    </div>
  );
}