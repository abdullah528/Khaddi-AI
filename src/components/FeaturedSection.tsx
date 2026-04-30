import { motion } from "motion/react";
import { FEATURED_PRODUCTS } from "../constants";
import { Heart } from "lucide-react";

export function FeaturedSection() {
  return (
    <section className="py-24 bg-brand-paper shadow-[inset_0_4px_20px_rgba(0,0,0,0.02)] border-y border-brand-border">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <span className="serif-italic text-brand-emerald text-lg block mb-2">Featured Selection</span>
          <h3 className="text-4xl md:text-5xl uppercase tracking-[0.1em]">The Summer Edit</h3>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {FEATURED_PRODUCTS.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="relative aspect-[3/4] overflow-hidden mb-6 bg-white rounded-xl shadow-sm border border-brand-border">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <button className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <Heart className="w-4 h-4 text-brand-emerald" />
                </button>
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform glass-card m-3 border-white/50">
                   <button className="w-full py-2 bg-brand-emerald text-white text-[10px] uppercase tracking-widest font-bold">Add to Cart</button>
                </div>
              </div>
              
              <div className="text-center px-2">
                <p className="text-[10px] uppercase tracking-[0.2em] text-brand-muted mb-1">{product.category}</p>
                <h5 className="text-lg mb-2 font-medium">{product.name}</h5>
                <p className="text-brand-emerald font-semibold uppercase tracking-wider text-sm">{product.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
