import { useState } from "react";
import { motion } from "motion/react";
import { Search, ShoppingBag, Menu, User } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { ProfileModal } from "./Profile/ProfileModal";
import { Link } from "react-router-dom";

export function Navbar() {
  const { user, profile } = useAuth();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-brand-paper/90 backdrop-blur-md border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-8 text-[11px] uppercase tracking-[0.2em] font-medium text-brand-ink/70">
            <button className="md:hidden">
              <Menu className="w-6 h-6 text-brand-ink" />
            </button>
            <div className="hidden md:flex items-center gap-8">
              <Link to="/" className="hover:text-brand-emerald transition-colors">Collections</Link>
              <a href="#" className="hover:text-brand-emerald transition-colors">Unstitched</a>
              <a href="#" className="hover:text-brand-emerald transition-colors">Pret</a>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute left-1/2 -translate-x-1/2 text-center"
          >
            <Link to="/">
              <h1 className="text-3xl tracking-[0.2em] font-serif font-light italic uppercase">
                Zari <span className="serif-italic">&</span> Bloom
              </h1>
            </Link>
          </motion.div>

          <div className="flex items-center gap-4 md:gap-8 text-[11px] uppercase tracking-[0.2em] font-medium">
            <button className="p-2 hover:text-brand-emerald transition-colors">
              <Search className="w-5 h-5 md:w-4 md:h-4" />
            </button>
            
            {user ? (
              <button 
                onClick={() => setIsProfileModalOpen(true)}
                className="flex items-center gap-2 hover:text-brand-emerald transition-colors"
              >
                <User className="w-5 h-5 md:w-4 md:h-4" />
                <span className="hidden md:inline">
                  {profile?.fullName?.split(' ')[0] || 'Account'}
                </span>
              </button>
            ) : (
              <Link 
                to="/signin"
                className="flex items-center gap-2 hover:text-brand-emerald transition-colors"
              >
                <User className="w-5 h-5 md:w-4 md:h-4" />
                <span className="hidden md:inline text-[10px] tracking-widest font-bold">Sign In</span>
              </Link>
            )}

            <button className="flex items-center gap-2 p-2 hover:text-brand-emerald transition-colors relative">
              <ShoppingBag className="w-5 h-5 md:w-4 md:h-4" />
              <span className="hidden md:inline">Bag (0)</span>
              <span className="md:hidden absolute top-1 right-1 w-2 h-2 bg-brand-emerald rounded-full"></span>
            </button>
          </div>
        </div>
      </nav>

      <ProfileModal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} />
    </>
  );
}
