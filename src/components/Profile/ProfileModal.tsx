import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User as UserIcon, Mail, Calendar, Edit2, Check, Loader2 } from 'lucide-react';
import { auth, db } from '../../lib/firebase';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';
import { handleFirestoreError, OperationType } from '../../lib/firestoreUtils';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const { user, profile, refreshProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (profile) {
      setFullName(profile.fullName);
    }
  }, [profile]);

  const handleUpdateProfile = async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    
    const path = `users/${user.uid}`;
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        fullName,
        updatedAt: serverTimestamp()
      });
      await refreshProfile();
      setIsEditing(false);
    } catch (err: any) {
      handleFirestoreError(err, OperationType.UPDATE, path);
      setError("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!user || (!profile && !loading)) return null;

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
            className="relative w-full max-w-lg glass-card overflow-hidden"
          >
            <div className="p-8 md:p-12">
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 p-2 hover:bg-brand-emerald/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-brand-muted" />
              </button>

              <div className="flex flex-col items-center mb-10 text-center">
                <div className="w-24 h-24 bg-brand-emerald/10 rounded-full flex items-center justify-center mb-6">
                  <UserIcon className="w-10 h-10 text-brand-emerald" />
                </div>
                <h2 className="text-3xl font-serif italic mb-1 uppercase tracking-wide">My Account</h2>
                <p className="text-[10px] uppercase tracking-[0.3em] text-brand-muted font-bold">Personalized Profiling</p>
              </div>

              {error && (
                <div className="mb-6 p-3 bg-red-50 border border-red-100 text-red-600 text-xs rounded-lg">
                  {error}
                </div>
              )}

              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-[10px] uppercase tracking-widest font-bold text-brand-muted">
                    <span className="flex items-center gap-2 underline underline-offset-4 decoration-brand-emerald/30">
                      <Edit2 className="w-3 h-3" /> Basic Information
                    </span>
                    {!isEditing ? (
                      <button 
                        onClick={() => setIsEditing(true)}
                        className="text-brand-emerald hover:opacity-70 transition-opacity"
                      >
                        Edit Profile
                      </button>
                    ) : (
                      <button 
                         onClick={handleUpdateProfile}
                         disabled={loading}
                         className="text-brand-emerald hover:opacity-70 transition-opacity flex items-center gap-1"
                      >
                        {loading ? <Loader2 className="w-3 h-3 animate-spin"/> : <><Check className="w-3 h-3"/> Save</>}
                      </button>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] uppercase tracking-widest text-brand-muted/60 font-semibold">Full Name</span>
                      {isEditing ? (
                        <input
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="bg-white/50 border border-brand-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-brand-emerald transition-all"
                        />
                      ) : (
                        <p className="text-sm font-medium tracking-wide">{profile?.fullName || 'N/A'}</p>
                      )}
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] uppercase tracking-widest text-brand-muted/60 font-semibold">Email Address</span>
                      <p className="text-sm font-medium tracking-wide opacity-60">{user?.email}</p>
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] uppercase tracking-widest text-brand-muted/60 font-semibold">Member Since</span>
                      <p className="text-sm font-medium tracking-wide opacity-60 flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        {profile?.createdAt?.seconds ? new Date(profile.createdAt.seconds * 1000).toLocaleDateString() : 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-brand-border">
                  <button 
                    onClick={() => auth.signOut().then(() => onClose())}
                    className="w-full py-4 border border-brand-emerald/20 text-brand-emerald text-xs uppercase tracking-[0.3em] font-bold rounded-lg hover:bg-brand-emerald/5 transition-colors"
                  >
                    Logout from Account
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
