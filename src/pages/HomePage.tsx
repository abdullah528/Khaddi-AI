import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { CategoryGrid } from "../components/CategoryGrid";
import { FeaturedSection } from "../components/FeaturedSection";
import { Footer } from "../components/Footer";
import { motion } from "motion/react";

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-x-hidden selection:bg-brand-emerald selection:text-white">
      <Navbar />
      
      <main>
        <Hero />
        
        <CategoryGrid />
        
        <FeaturedSection />

        <section className="py-24 max-w-5xl mx-auto px-4 md:px-8 text-center border-t border-brand-border">
          <motion.div
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
          >
            <h3 className="text-3xl md:text-5xl mb-8 leading-tight italic">
              Crafted with <span className="serif-italic">Intent</span>,<br />
              Worn with <span className="serif-italic">Pride.</span>
            </h3>
            <p className="text-brand-muted max-w-xl mx-auto font-light leading-relaxed mb-12 text-sm md:text-base">
              Our journey began with a single loom and a vision to bridge the gap 
              between age-old craftsmanship and the fast-paced modern world. 
              Every thread in a Zari & Bloom garment tells a story of heritage.
            </p>
            <div className="flex justify-center gap-12 text-[11px] uppercase tracking-[0.3em] font-bold text-brand-emerald">
               <div className="flex flex-col items-center">
                 <span className="text-2xl font-serif text-brand-ink mb-1 italic">100%</span>
                 <span>Pure Silk</span>
               </div>
               <div className="flex flex-col items-center">
                 <span className="text-2xl font-serif text-brand-ink mb-1 italic">Hand</span>
                 <span>Handloomed</span>
               </div>
               <div className="flex flex-col items-center">
                 <span className="text-2xl font-serif text-brand-ink mb-1 italic">Art</span>
                 <span>Artisanal</span>
               </div>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
