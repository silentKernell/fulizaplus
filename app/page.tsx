import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-6">
      <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold tracking-tight">Fuliza Plus</h1>
          <span className="bg-green-500/10 text-green-500 text-xs font-bold px-3 py-1 rounded-full uppercase">
            Active
          </span>
        </div>

        <div className="space-y-6">
          <div className="p-4 bg-zinc-800/50 rounded-xl border border-zinc-700">
            <p className="text-zinc-400 text-sm mb-1">Available Credit Limit</p>
            <p className="text-3xl font-mono font-bold text-green-400">Ksh 15,250.00</p>
          </div>

          <div className="space-y-3">
            <button className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-zinc-200 transition-colors">
              Request Instant Upgrade
            </button>
            <button className="w-full bg-transparent border border-zinc-700 py-4 rounded-xl font-medium hover:bg-zinc-800 transition-colors">
              View Growth History
            </button>
          </div>
        </div>

        <p className="mt-8 text-center text-zinc-500 text-xs">
          Your limit is reviewed every 24 hours based on your usage.
        </p>
      </div>
    </main>
  );
}

