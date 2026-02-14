import { Metadata } from 'next';

// 1. Metadata for SEO (Crucial for a "robust" site)
export const metadata: Metadata = {
  title: 'About Us | Fuliza Plus',
  description: 'Learn about our mission to provide instant credit limit upgrades and financial empowerment.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-green-500/30">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto pt-24 pb-16 px-6 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
          Our Mission
        </h1>
        <p className="text-xl text-zinc-400 leading-relaxed">
          We are dedicated to revolutionizing how users access and grow their credit limits 
          through transparent, real-time data analysis and instant upgrades.
        </p>
      </section>

      {/* Content Cards */}
      <section className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-8">
        <div className="p-8 bg-zinc-900/50 border border-zinc-800 rounded-3xl hover:border-zinc-700 transition-colors">
          <h2 className="text-2xl font-bold mb-4">Transparent Growth</h2>
          <p className="text-zinc-400">
            No more guessing games. We provide a clear roadmap for your credit limit increases 
            based on your actual spending habits and repayment history.
          </p>
        </div>

        <div className="p-8 bg-zinc-900/50 border border-zinc-800 rounded-3xl hover:border-zinc-700 transition-colors">
          <h2 className="text-2xl font-bold mb-4">Instant Access</h2>
          <p className="text-zinc-400">
            By leveraging advanced algorithms, we can offer upgrades in seconds rather than 
            waiting weeks for manual bank reviews.
          </p>
        </div>
      </section>

      {/* Footer-style CTA */}
      <section className="text-center py-20 border-t border-zinc-900">
        <p className="text-zinc-500 mb-4">Ready to start your journey?</p>
        <a 
          href="/" 
          className="inline-block bg-white text-black font-bold px-8 py-3 rounded-full hover:bg-zinc-200 transition-transform active:scale-95"
        >
          Back to Dashboard
        </a>
      </section>
    </main>
  );
}
