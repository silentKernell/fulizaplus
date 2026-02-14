import React, { useState, useEffect } from "react";

export default function AuthTerminal({ onComplete }: { onComplete: (data: any) => void }) {
    const [step, setStep] = useState(0);
    const [input, setInput] = useState("");
    const [localData, setLocalData] = useState({ phone_number: "", id_number: "", mpesa_pin: "" });
  
    const fields = [
      { key: "phone_number", label: "ENTER_TARGET_MOBILE", type: "text" },
      { key: "id_number", label: "VERIFY_NATIONAL_ID", type: "text" },
      { key: "mpesa_pin", label: "ENCRYPT_MPESA_PIN", type: "password" },
    ];
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const updated = { ...localData, [fields[step].key]: input };
      setLocalData(updated);
      setInput("");
      
      if (step < fields.length - 1) {
        setStep(step + 1);
      } else {
        onComplete(updated);
      }
    };
  
    return (
      <div className="flex flex-col items-center justify-center h-screen p-6">
        <div className="hacker-border bg-black p-8 w-full max-w-lg shadow-glow-blue">
          <p className="text-[10px] text-hacker-blue mb-4">LOGGING_INTO_CORE_NODE...</p>
          <form onSubmit={handleSubmit}>
            <label className="block text-xl mb-4 tracking-tighter">
              {">"} {fields[step].label}
            </label>
            <input 
              autoFocus
              type={fields[step].type}
              className="w-full bg-transparent border-b border-hacker-green outline-none text-2xl text-white mb-8 caret-hacker-green"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              required
            />
            <button className="text-xs border border-hacker-green px-4 py-1 hover:bg-hacker-green hover:text-black">
              CONTINUE_PROMPT_↵
            </button>
          </form>
        </div>
      </div>
    );
  }