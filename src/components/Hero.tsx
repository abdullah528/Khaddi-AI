import { motion } from "motion/react";

export function Hero() {
  return (
    <section className="relative h-[90vh] w-full overflow-hidden bg-brand-emerald">
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <img 
          src="https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&q=80&w=1920" 
          alt="Brand Campaign"
          className="w-full h-full object-cover opacity-90"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-brand-emerald/20"></div>
      </motion.div>

      <div className="relative h-full max-w-7xl mx-auto px-4 md:px-8 flex flex-col justify-end pb-24 md:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="glass-panel p-8 md:p-12 max-w-2xl text-white"
        >
          <span className="uppercase text-[10px] tracking-[0.4em] font-semibold mb-3 block">
            The Spring Edit 2026
          </span>
          <h2 className="text-4xl md:text-6xl mb-6 leading-tight italic">
            Zari <span className="serif-italic">&</span> Bloom:<br />
            Hand-Crafted Heritage
          </h2>
          <p className="text-sm md:text-base font-light leading-relaxed max-w-md opacity-90 mb-8">
            A timeless tribute to artisanal mastery, featuring intricate resham embroidery 
            and premium silk blends designed for the modern woman.
          </p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-white text-brand-emerald text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-brand-paper transition-colors"
          >
            Explore Collection
          </motion.button>
        </motion.div>
      </div>

      <div className="absolute top-1/2 right-12 -translate-y-1/2 flex flex-col gap-4">
        <div className="w-12 h-12 rounded-full backdrop-blur-xl bg-white/30 border border-white/40 flex items-center justify-center text-white font-bold text-xs ring-4 ring-white/5">01</div>
        <div className="w-12 h-12 rounded-full backdrop-blur-md bg-white/10 border border-white/20 flex items-center justify-center text-white/40 text-xs">02</div>
        <div className="w-12 h-12 rounded-full backdrop-blur-md bg-white/10 border border-white/20 flex items-center justify-center text-white/40 text-xs">03</div>
      </div>
    </section>
  );
}
