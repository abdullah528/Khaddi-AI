import { motion } from "motion/react";
import { CATEGORIES } from "../constants";

export function CategoryGrid() {
  return (
    <section className="py-24 max-w-7xl mx-auto px-4 md:px-8">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <h3 className="text-4xl md:text-5xl mb-4 italic">Noor-e-Zaraan</h3>
          <p className="text-brand-muted uppercase text-[10px] tracking-[0.3em] font-semibold">Hand-Crafted Heritage Collections</p>
        </div>
        <div className="h-[1px] flex-1 bg-brand-border mx-12 hidden md:block mb-4"></div>
        <a href="#" className="uppercase text-[11px] tracking-[0.2em] font-bold border-b border-brand-ink pb-1 hover:text-brand-emerald hover:border-brand-emerald transition-colors mb-2">View All</a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {CATEGORIES.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className="group cursor-pointer"
          >
            <div className="relative aspect-[3/4] overflow-hidden mb-6 rounded-2xl border border-brand-border shadow-sm">
              <img 
                src={category.image} 
                alt={category.title}
                className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-brand-emerald/5 group-hover:bg-transparent transition-colors"></div>
            </div>
            <h4 className="text-2xl mb-1 tracking-wide">{category.title}</h4>
            <p className="text-brand-muted text-[11px] uppercase tracking-[0.15em] font-medium">{category.subtitle}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
