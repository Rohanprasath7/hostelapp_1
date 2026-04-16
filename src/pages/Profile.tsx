import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Settings, Bell, Shield, LogOut, Edit3, CheckCircle2, ChevronRight, Globe, Loader2, Save } from 'lucide-react';
import { motion } from 'motion/react';
import { auth, db } from '../lib/firebase';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';

export default function Profile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [branding, setBranding] = useState({
    hostelName: 'Sovereign Stay',
    logoUrl: '',
    upiId: ''
  });

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'settings', 'global'), (doc) => {
      if (doc.exists()) {
        setBranding(doc.data() as any);
      }
    });
    return () => unsub();
  }, []);

  const handleSaveBranding = async () => {
    setLoading(true);
    try {
      await setDoc(doc(db, 'settings', 'global'), branding);
    } catch (error) {
      console.error("Error saving branding:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Profile Header */}
      <section className="flex flex-col items-center text-center space-y-6">
        <div className="relative">
          <div className="w-32 h-32 rounded-3xl overflow-hidden shadow-lg border-4 border-white bg-surface flex items-center justify-center">
            {auth.currentUser?.photoURL ? (
              <img 
                src={auth.currentUser.photoURL} 
                alt="Admin" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <User size={48} className="text-primary/20" />
            )}
          </div>
        </div>
        
        <div>
          <h1 className="text-3xl font-bold text-on-surface tracking-tight">{auth.currentUser?.displayName || 'Administrator'}</h1>
          <p className="text-on-surface-variant font-bold text-[11px] uppercase tracking-wider mt-1">{auth.currentUser?.email}</p>
        </div>
      </section>

      {/* Branding Settings */}
      <section className="bg-white rounded-2xl p-6 shadow-sm border border-surface-container-high space-y-6">
        <h3 className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant/50 flex items-center gap-2">
          <Globe size={14} /> Hostel Branding & Payments
        </h3>
        
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/60 ml-1">Hostel Name</label>
            <input 
              type="text" 
              value={branding.hostelName}
              onChange={(e) => setBranding({...branding, hostelName: e.target.value})}
              className="w-full bg-surface rounded-xl px-4 py-3 border border-surface-container-high focus:border-primary/30 transition-all font-bold text-on-surface text-sm"
              placeholder="e.g. Sovereign Stay"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/60 ml-1">Logo URL</label>
            <input 
              type="text" 
              value={branding.logoUrl}
              onChange={(e) => setBranding({...branding, logoUrl: e.target.value})}
              className="w-full bg-surface rounded-xl px-4 py-3 border border-surface-container-high focus:border-primary/30 transition-all font-bold text-on-surface text-sm"
              placeholder="https://example.com/logo.png"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/60 ml-1">UPI ID (for resident payments)</label>
            <input 
              type="text" 
              value={branding.upiId}
              onChange={(e) => setBranding({...branding, upiId: e.target.value})}
              className="w-full bg-surface rounded-xl px-4 py-3 border border-surface-container-high focus:border-primary/30 transition-all font-bold text-on-surface text-sm"
              placeholder="merchant@upi"
            />
          </div>

          <button 
            onClick={handleSaveBranding}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-secondary text-white font-bold text-sm shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : <><Save size={18} /> Update Branding</>}
          </button>
        </div>
      </section>

      {/* Logout */}
      <div className="pt-4 space-y-6">
        <button 
          onClick={handleLogout}
          className="w-full py-4 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3 hover:bg-primary-container"
        >
          <LogOut size={18} /> Logout from System
        </button>
        <p className="text-center text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/30">
          Version 4.2.0 Stable Build
        </p>
      </div>
    </div>
  );
}
