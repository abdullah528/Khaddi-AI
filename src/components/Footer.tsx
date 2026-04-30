import { Instagram, Facebook, Twitter, ArrowRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-brand-paper border-t border-brand-border py-24 px-4 md:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-8 mb-24">
          <div className="md:col-span-2">
            <h4 className="text-3xl mb-8 tracking-[0.2em] uppercase font-light italic">Zari <span className="serif-italic">&</span> Bloom</h4>
            <p className="text-brand-muted max-w-sm mb-8 leading-relaxed font-light text-sm">
              Timeless heritage meets modern elegance. Our collections are a tribute 
              to artisanal mastery and cultural storytelling.
            </p>
            <div className="flex gap-8 text-[11px] uppercase tracking-widest font-semibold text-brand-muted">
              <span>Instagram</span>
              <span>Facebook</span>
              <span>Pinterest</span>
            </div>
          </div>

          <div>
            <h5 className="uppercase text-[11px] tracking-[0.4em] font-bold mb-8 text-brand-emerald">Quick Links</h5>
            <ul className="space-y-4 text-xs tracking-widest font-medium uppercase text-brand-muted">
              <li><a href="#" className="hover:text-brand-emerald transition-colors">Collections</a></li>
              <li><a href="#" className="hover:text-brand-emerald transition-colors">Unstitched</a></li>
              <li><a href="#" className="hover:text-brand-emerald transition-colors">Returns</a></li>
              <li><a href="#" className="hover:text-brand-emerald transition-colors">Shipping</a></li>
            </ul>
          </div>

          <div>
            <h5 className="uppercase text-[11px] tracking-[0.4em] font-bold mb-8 text-brand-emerald">Newsletter</h5>
            <p className="text-xs mb-6 text-brand-muted font-light tracking-wide">Join the circle for exclusive previews and offers.</p>
            <div className="flex border-b border-brand-border pb-2 group focus-within:border-brand-emerald transition-colors">
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="bg-transparent border-none focus:ring-0 text-[10px] w-full placeholder:text-brand-muted/40 tracking-widest outline-none uppercase font-semibold"
              />
              <button><ArrowRight className="w-4 h-4 text-brand-muted group-focus-within:text-brand-emerald" /></button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-brand-border text-[10px] tracking-[0.3em] text-brand-muted uppercase font-bold">
          <p>© 2026 Zari & Bloom Lifestyle.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <a href="#" className="hover:text-brand-emerald transition-colors">Privacy</a>
            <a href="#" className="hover:text-brand-emerald transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
