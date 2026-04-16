import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Fingerprint, Key, Building2, Headphones } from 'lucide-react';
import { motion } from 'motion/react';
import { signInWithPopup, signInWithRedirect, getRedirectResult, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../lib/firebase';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Handle the redirect result when the page loads after a Google Sign-In redirect
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result?.user) {
          navigate('/');
        }
      } catch (err: any) {
        console.error("Redirect Error:", err);
        setError(err.message);
      }
    };
    handleRedirectResult();
  }, [navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("Email login is currently disabled for security. Please use Google Sign-In.");
  };

  const handleGoogleLogin = async () => {
    setIsAuthenticating(true);
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      
      // Mobile browsers (especially Brave/Safari) often block popups or fail to communicate back.
      // Redirect is much more reliable on mobile.
      const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      
      if (isMobile) {
        await signInWithRedirect(auth, provider);
      } else {
        await signInWithPopup(auth, provider);
        navigate('/');
      }
    } catch (err: any) {
      console.error("Login Error:", err);
      setError(err.message);
      setIsAuthenticating(false);
    }
  };

  return (
    <div className="min-h-screen bg-secondary flex justify-center items-center p-0 lg:p-4 overflow-hidden">
      {/* Phone Frame for Desktop */}
      <div className="w-full min-h-screen lg:min-h-0 lg:h-[90vh] lg:max-w-[450px] lg:rounded-[3rem] lg:border-[8px] lg:border-secondary-container lg:shadow-2xl bg-white flex flex-col relative overflow-hidden">
        
        <section className="flex-1 flex flex-col p-8 pt-[env(safe-area-inset-top,4rem)] pb-[env(safe-area-inset-bottom,1rem)] overflow-y-auto no-scrollbar">
          <header className="mb-8 md:mb-12 text-center shrink-0">
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
            className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full"
          >
            <form onSubmit={handleLogin} className="space-y-5">
              {error && (
                <div className="bg-error/10 text-error text-[10px] font-bold p-3 rounded-lg uppercase tracking-wider text-center animate-pulse">
                  {error}
                </div>
              )}
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

              <button 
                type="button"
                onClick={handleGoogleLogin}
                disabled={isAuthenticating}
                className="w-full flex items-center justify-center gap-3 py-4 px-4 bg-white border border-surface-container-high rounded-xl text-on-surface font-bold text-sm hover:bg-surface transition-all active:scale-[0.98] shadow-sm disabled:opacity-50"
              >
                {isAuthenticating ? (
                  <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
                )}
                {isAuthenticating ? 'Authenticating...' : 'Sign in with Google'}
              </button>

              <div className="grid grid-cols-2 gap-3">
                <button type="button" className="flex items-center justify-center gap-2 py-3 px-4 bg-white border border-surface-container-high rounded-xl text-on-surface font-bold text-xs hover:bg-surface transition-colors">
                  <Key size={16} /> Passkey
                </button>
                <button type="button" className="flex items-center justify-center gap-2 py-3 px-4 bg-white border border-surface-container-high rounded-xl text-on-surface font-bold text-xs hover:bg-surface transition-colors">
                  <Fingerprint size={16} /> SSO
                </button>
              </div>
            </form>

            <footer className="mt-8 pb-4 text-center shrink-0">
              <p className="text-on-surface-variant text-xs">
                New Property? <button className="text-primary font-bold hover:underline">Apply for Onboarding</button>
              </p>
              <p className="text-[8px] text-on-surface-variant/20 mt-2 uppercase tracking-widest">Build v1.0.3 • Optimized for Mobile</p>
            </footer >
          </motion.div>
        </section>

        {/* Decorative Bottom Bar (Only for desktop frame simulation) */}
        <div className="hidden lg:block h-1.5 w-32 bg-surface-container-highest rounded-full mx-auto mb-2 shrink-0"></div>
      </div>

      <button className="fixed bottom-8 right-8 bg-white text-primary p-4 rounded-xl shadow-xl hover:bg-primary hover:text-white transition-all border border-surface-container-high lg:hidden z-50">
        <Headphones size={24} />
      </button>
    </div>
  );
}
