import { useNavigate } from 'react-router-dom';
import { User, Settings, Bell, Shield, LogOut, Edit3, CheckCircle2, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function Profile() {
  const navigate = useNavigate();

  const menuItems = [
    { icon: User, label: 'Personal Information', sub: 'Name, email, and security details' },
    { icon: Settings, label: 'Property Settings', sub: 'Rules, amenities, and branding' },
    { icon: Bell, label: 'Notification Hub', sub: 'Manage alerts and system logs' },
    { icon: Shield, label: 'Security & Privacy', sub: '2FA, access logs, and permissions' },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Profile Header */}
      <section className="flex flex-col items-center text-center space-y-6">
        <div className="relative">
          <div className="w-32 h-32 rounded-3xl overflow-hidden shadow-lg border-4 border-white">
            <img 
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=300&h=300" 
              alt="Admin" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <button className="absolute -bottom-2 -right-2 bg-primary text-white p-2.5 rounded-xl shadow-lg active:scale-90 transition-transform">
            <Edit3 size={18} />
          </button>
        </div>
        
        <div>
          <h1 className="text-3xl font-bold text-on-surface tracking-tight">Alexander Wright</h1>
          <p className="text-on-surface-variant font-bold text-[11px] uppercase tracking-wider mt-1">Property Manager • Hostel ID: #8821</p>
        </div>

        <div className="flex gap-2">
          <span className="px-4 py-1.5 bg-secondary text-white rounded-lg text-[10px] font-bold tracking-wider uppercase flex items-center gap-1.5">
            <Shield size={12} fill="currentColor" /> Super User
          </span>
          <span className="px-4 py-1.5 bg-tertiary/10 text-tertiary rounded-lg text-[10px] font-bold tracking-wider uppercase flex items-center gap-1.5">
            <CheckCircle2 size={12} fill="currentColor" /> Verified
          </span>
        </div>
      </section>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-surface-container-high shadow-sm">
          <span className="text-[11px] font-bold text-on-surface-variant/50 uppercase tracking-wider block mb-2">Hostel Status</span>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
            <span className="font-bold text-on-surface">Active Operations</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-surface-container-high shadow-sm">
          <span className="text-[11px] font-bold text-on-surface-variant/50 uppercase tracking-wider block mb-2">Occupancy</span>
          <div className="flex items-center gap-2">
            <span className="font-bold text-primary text-xl">94%</span>
            <span className="text-[11px] font-bold text-on-surface-variant/60 uppercase tracking-wider">Capacity</span>
          </div>
        </div>
      </div>

      {/* Menu Links */}
      <section className="space-y-3">
        <h2 className="text-[11px] font-bold text-on-surface-variant/50 uppercase tracking-widest px-1 mb-4">Account Administration</h2>
        {menuItems.map((item, i) => (
          <motion.button
            key={item.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="w-full group flex items-center justify-between p-4 bg-white border border-surface-container-high rounded-2xl hover:border-primary/30 hover:shadow-md transition-all active:scale-[0.99]"
          >
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-surface border border-surface-container-high flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                <item.icon size={20} />
              </div>
              <div className="text-left">
                <p className="font-bold text-on-surface">{item.label}</p>
                <p className="text-[11px] font-medium text-on-surface-variant/60">{item.sub}</p>
              </div>
            </div>
            <ChevronRight size={18} className="text-on-surface-variant/30 group-hover:text-primary transition-colors" />
          </motion.button>
        ))}
      </section>

      {/* Logout */}
      <div className="pt-8 space-y-6">
        <button 
          onClick={() => navigate('/login')}
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
