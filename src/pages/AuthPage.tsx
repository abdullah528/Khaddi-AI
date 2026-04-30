import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, User as UserIcon, Loader2, ArrowLeft } from 'lucide-react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { auth, db } from '../lib/firebase';
import { handleFirestoreError, OperationType } from '../lib/firestoreUtils';
import { useAuth } from '../contexts/AuthContext';

export default function AuthPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSignUp, setIsSignUp] = useState(location.pathname === '/signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsSignUp(location.pathname === '/signup');
  }, [location.pathname]);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isSignUp) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        await updateProfile(user, { displayName: fullName });

        const path = `users/${user.uid}`;
        try {
          await setDoc(doc(db, 'users', user.uid), {
            userId: user.uid,
            fullName,
            email,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
          });
        } catch (err) {
          handleFirestoreError(err, OperationType.CREATE, path);
        }
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left side - Aesthetic Image */}
      <div className="hidden lg:block relative">
        <img 
          src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=1200" 
          alt="Fashion"
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-brand-emerald/40 backdrop-blur-[2px]"></div>
        <div className="absolute inset-0 flex flex-col justify-center p-20 text-white">
          <Link to="/" className="flex items-center gap-2 mb-12 text-sm tracking-widest hover:opacity-70 transition-opacity">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <h2 className="text-6xl font-serif italic mb-6">Zari <span className="serif-italic">&</span> Bloom</h2>
          <p className="text-xl font-light max-w-md leading-relaxed opacity-90">
            Join our exclusive circle and preserve the art of traditional craftsmanship in your wardrobe.
          </p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex items-center justify-center p-8 bg-brand-paper">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-12 lg:hidden">
             <Link to="/" className="text-2xl tracking-[0.2em] font-serif italic uppercase mb-8 block">
               Zari <span className="serif-italic">&</span> Bloom
             </Link>
          </div>

          <div className="mb-10">
            <h1 className="text-4xl font-serif italic mb-2">
              {isSignUp ? 'Create Profile' : 'Welcome Back'}
            </h1>
            <p className="text-[10px] uppercase tracking-[0.3em] text-brand-muted font-bold">
              {isSignUp ? 'Heritage meets discovery' : 'Your curated collection awaits'}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-xs rounded-xl font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {isSignUp && (
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-brand-emerald flex items-center gap-2">
                  <UserIcon className="w-3 h-3" /> Full Name
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-white border border-brand-border rounded-xl px-4 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-emerald/20 transition-all"
                  placeholder="Zainab Ahmed"
                />
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-brand-emerald flex items-center gap-2">
                <Mail className="w-3 h-3" /> Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white border border-brand-border rounded-xl px-4 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-emerald/20 transition-all"
                placeholder="example@mail.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-brand-emerald flex items-center gap-2">
                <Lock className="w-3 h-3" /> Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white border border-brand-border rounded-xl px-4 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-emerald/20 transition-all"
                placeholder="••••••••"
                minLength={6}
              />
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full py-5 bg-brand-emerald text-white text-xs uppercase tracking-[0.4em] font-bold rounded-xl shadow-xl shadow-brand-emerald/10 flex items-center justify-center gap-3 hover:bg-brand-emerald/90 transition-all disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                isSignUp ? 'Create My Account' : 'Sign In'
              )}
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-brand-border text-center">
            <p className="text-xs text-brand-muted font-medium tracking-wide">
              {isSignUp ? 'Member of the circle?' : "New to the brand?"}{' '}
              <Link
                to={isSignUp ? '/signin' : '/signup'}
                className="text-brand-emerald font-bold hover:underline underline-offset-4"
              >
                {isSignUp ? 'Sign In Instead' : 'Join Now'}
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
