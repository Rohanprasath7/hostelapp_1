import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Fingerprint, Key, Building2, Headphones } from 'lucide-react';
import { motion } from 'motion/react';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-secondary flex justify-center items-center p-0 overflow-hidden">
      {/* Phone Frame for Desktop */}
      <div className="w-full h-full lg:max-w-[450px] lg:h-[90vh] lg:rounded-[3rem] lg:border-[8px] lg:border-secondary-container lg:shadow-2xl bg-white flex flex-col relative overflow-hidden">
        
        <section className="flex-1 flex flex-col p-8 pt-16">
          <header className="mb-12 text-center">
            <motion.div 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/20"
            >
              <Building2 className="text-white" size={32} />
            </motion.div>
            <h1 className="text-2xl font-bold text-secondary tracking-tight mb-2">SOVEREIGN</h1>
            <p className="text-on-surface-variant text-sm font-medium">Institutional Property Management</p>
          </header>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex-1 flex flex-col"
          >
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/60 ml-1">Administrative Email</label>
                <div className="flex items-center bg-surface rounded-xl px-4 py-3.5 border border-surface-container-high focus-within:border-primary/30 transition-all">
                  <Mail className="text-on-surface-variant/40 mr-3" size={18} />
                  <input 
                    type="email" 
                    placeholder="manager@sovereign.com" 
                    className="w-full bg-transparent border-none focus:ring-0 p-0 font-bold text-on-surface placeholder:text-on-surface-variant/30 text-sm" 
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center ml-1">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/60">Access Token</label>
                  <button type="button" className="text-[10px] font-bold text-primary uppercase tracking-wider">Forgot?</button>
                </div>
                <div className="flex items-center bg-surface rounded-xl px-4 py-3.5 border border-surface-container-high focus-within:border-primary/30 transition-all">
                  <Lock className="text-on-surface-variant/40 mr-3" size={18} />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    className="w-full bg-transparent border-none focus:ring-0 p-0 font-bold text-on-surface placeholder:text-on-surface-variant/30 text-sm" 
                    required
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-on-surface-variant/40 hover:text-primary transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full py-4 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/20 active:scale-[0.98] transition-all mt-4"
              >
                Verify Identity
              </button>

              <div className="flex items-center justify-between gap-4 py-4">
                <div className="h-[1px] flex-1 bg-surface-container-high"></div>
                <span className="text-[10px] font-bold text-on-surface-variant/30 uppercase tracking-widest">or secure sign-in</span>
                <div className="h-[1px] flex-1 bg-surface-container-high"></div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button type="button" className="flex items-center justify-center gap-2 py-3 px-4 bg-white border border-surface-container-high rounded-xl text-on-surface font-bold text-xs hover:bg-surface transition-colors">
                  <Key size={16} /> Passkey
                </button>
                <button type="button" className="flex items-center justify-center gap-2 py-3 px-4 bg-white border border-surface-container-high rounded-xl text-on-surface font-bold text-xs hover:bg-surface transition-colors">
                  <Fingerprint size={16} /> SSO
                </button>
              </div>
            </form>

            <footer className="mt-auto pt-8 text-center">
              <p className="text-on-surface-variant text-xs">
                New Property? <button className="text-primary font-bold hover:underline">Apply for Onboarding</button>
              </p>
            </footer >
          </motion.div>
        </section>

        {/* Decorative Bottom Bar */}
        <div className="h-1.5 w-32 bg-surface-container-highest rounded-full mx-auto mb-2 shrink-0"></div>
      </div>

      <button className="fixed bottom-8 right-8 bg-white text-primary p-4 rounded-xl shadow-xl hover:bg-primary hover:text-white transition-all border border-surface-container-high lg:hidden">
        <Headphones size={24} />
      </button>
    </div>
  );
}
