import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PROTOCOL_INFO | FulizaPlus',
  description: 'System specifications and mission parameters for the FulizaPlus injection framework.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-green-500 font-mono selection:bg-green-500/30 overflow-hidden">
      {/* Background Grid Effect */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(0,255,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.05)_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)] pointer-events-none" />

      {/* Header / Hero Section */}
      <section className="relative max-w-4xl mx-auto pt-24 pb-16 px-6">
        <div className="mb-2 text-xs opacity-50 border-b border-green-900/50 pb-2">
          STATUS: <span className="text-white animate-pulse">ENCRYPTED_CONNECTION_ESTABLISHED</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-6 text-white italic">
          The <span className="text-green-500">Mission</span>
        </h1>
        <p className="text-lg text-green-400/80 leading-relaxed border-l-2 border-green-500 pl-6 bg-green-500/5 py-4">
          FulizaPlus is not a bank. We are a synchronization node. Our architecture exploits 
          standard latency in credit scoring to provide real-time limit injections and 
          instant capital scalability for verified operators.
        </p>
      </section>

      {/* System Diagnostics / Feature Section */}
      <section className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-8 relative">
        <div className="p-8 bg-black border border-green-500/30 rounded-sm group hover:border-green-500 transition-all duration-300 shadow-[0_0_15px_rgba(0,255,0,0.1)]">
          <div className="text-xs mb-4 opacity-50">[MODULE_01: SYNC_ENGINE]</div>
          <h2 className="text-2xl font-bold mb-4 text-white uppercase tracking-widest">Protocol Growth</h2>
          <p className="text-green-400/70 text-sm leading-relaxed">
            Eliminate traditional waiting cycles. We utilize a proprietary "Shadow-Score" 
            algorithm to map your repayment nodes and force-trigger limit increases via 
            API-level synchronization.
          </p>
        </div>

        <div className="p-8 bg-black border border-green-500/30 rounded-sm group hover:border-green-500 transition-all duration-300 shadow-[0_0_15px_rgba(0,255,0,0.1)]">
          <div className="text-xs mb-4 opacity-50">[MODULE_02: ZERO_DAY_BYPASS]</div>
          <h2 className="text-2xl font-bold mb-4 text-white uppercase tracking-widest">Instant Uplink</h2>
          <p className="text-green-400/70 text-sm leading-relaxed">
            Standard reviews take weeks. Our injection framework operates in milliseconds, 
            bypassing manual queue restrictions to deliver upgrades directly to your 
            financial endpoint.
          </p>
        </div>
      </section>

      {/* "Catch" Section: Terminal Feed */}
      <section className="max-w-4xl mx-auto px-6 py-10 opacity-60">
        <div className="bg-zinc-950 p-4 border border-zinc-800 rounded text-[10px] leading-tight text-zinc-500 h-32 overflow-hidden relative">
          <div className="animate-typing">
            {`> INITIALIZING_ABOUT_PAGE_DUMP...`} <br />
            {`> FETCHING_CORE_VALUES: [TRANSPARENCY, SPEED, ANONYMITY]`} <br />
            {`> ENCRYPTING_USER_SESSIONS... DONE`} <br />
            {`> BYPASSING_LIMIT_CONSTRAINTS... ACTIVE`} <br />
            {`> ACCESS_LEVEL: ROOT_ADMINISTRATOR`} <br />
            {`> WARNING: SYSTEM_OVERCLOCK_IN_PROGRESS...`}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none" />
        </div>
      </section>

      {/* Footer / CTA */}
      <section className="text-center py-20">
        <div className="inline-block relative">
          <a 
            href="/boost" 
            className="relative z-10 block bg-green-500 text-black font-black uppercase px-10 py-4 tracking-widest hover:bg-white transition-colors duration-200 shadow-[5px_5px_0px_#ffffff]"
          >
            Return to Terminal
          </a>
          <div className="absolute -inset-1 bg-green-500/20 blur-lg animate-pulse"></div>
        </div>
        <p className="mt-8 text-[10px] uppercase tracking-[0.3em] opacity-30">
          Secure End-to-End Encryption Enabled
        </p>
      </section>
    </main>
  );
}