import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Lock, User as UserIcon, Loader2 } from 'lucide-react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../../lib/firebase';
import { handleFirestoreError, OperationType } from '../../lib/firestoreUtils';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isSignUp) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        await updateProfile(user, { displayName: fullName });

        // Create the user profile document in Firestore
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
      onClose();
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-ink/40 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md glass-card overflow-hidden"
          >
            <div className="p-8 md:p-12">
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 p-2 hover:bg-brand-emerald/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-brand-muted" />
              </button>

              <div className="text-center mb-10">
                <h2 className="text-3xl font-serif italic mb-2">
                  {isSignUp ? 'Join the Circle' : 'Welcome Back'}
                </h2>
                <p className="text-xs tracking-[0.2em] uppercase text-brand-muted">
                  {isSignUp ? 'Create your profile' : 'Sign in to your account'}
                </p>
              </div>

              {error && (
                <div className="mb-6 p-3 bg-red-50 border border-red-100 text-red-600 text-xs rounded-lg">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {isSignUp && (
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-brand-emerald flex items-center gap-2">
                      <UserIcon className="w-3 h-3" /> Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-white/50 border border-brand-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-brand-emerald transition-all"
                      placeholder="Enter your full name"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-brand-emerald flex items-center gap-2">
                    <Mail className="w-3 h-3" /> Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/50 border border-brand-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-brand-emerald transition-all"
                    placeholder="Enter your email"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-brand-emerald flex items-center gap-2">
                    <Lock className="w-3 h-3" /> Password
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/50 border border-brand-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-brand-emerald transition-all"
                    placeholder="Minimal 6 characters"
                    minLength={6}
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={loading}
                  type="submit"
                  className="w-full py-4 bg-brand-emerald text-white text-xs uppercase tracking-[0.3em] font-bold rounded-lg shadow-lg shadow-brand-emerald/20 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    isSignUp ? 'Create Profile' : 'Sign In'
                  )}
                </motion.button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-xs text-brand-muted font-medium">
                  {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                  <button
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="text-brand-emerald hover:underline"
                  >
                    {isSignUp ? 'Sign In' : 'Sign Up'}
                  </button>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
