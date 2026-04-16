import { PlusCircle, Wrench, Wifi, Wind, Volume2, ChevronRight, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export default function Complaints() {
  const complaints = [
    { id: 1, title: 'Leaking Pipe - Room 402', desc: 'Water dripping from the bathroom ceiling since morning. Potential mold risk.', status: 'Open', resident: 'Alex Chen', time: '2h ago', icon: Wrench, color: 'text-error', bg: 'bg-error/10' },
    { id: 2, title: 'Wi-Fi Connectivity Issues', desc: 'Signal weak in the common area and North Wing. Technician assigned.', status: 'In Progress', resident: 'Sarah Miller', time: '5h ago', icon: Wifi, color: 'text-secondary', bg: 'bg-secondary/10' },
    { id: 3, title: 'AC Maintenance - Room 105', desc: 'Filter cleaned and gas refilled. System operating normally.', status: 'Resolved', resident: 'Jordan P.', time: 'Yesterday', icon: Wind, color: 'text-tertiary', bg: 'bg-tertiary/10' },
    { id: 4, title: 'Noise Complaint', desc: 'Loud music coming from Room 302 after 10 PM curfew.', status: 'Open', resident: 'Multiple', time: '12m ago', icon: Volume2, color: 'text-primary', bg: 'bg-primary/10' },
  ];

  return (
    <div className="space-y-8 pb-12">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-on-surface mb-1">Complaints Registry</h1>
          <p className="text-on-surface-variant text-sm">Manage and resolve resident issues with precision.</p>
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-all hover:bg-primary-container">
          <PlusCircle size={18} /> Log New Complaint
        </button>
      </header>

      {/* Analytics Bento */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-6 flex flex-col justify-between min-h-[160px] shadow-sm border border-surface-container-high relative overflow-hidden">
          <div className="flex justify-between items-start relative z-10">
            <span className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant/50">Unresolved Velocity</span>
            <span className="bg-error/10 text-error px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider">Priority Red</span>
          </div>
          <div className="flex items-baseline gap-4 relative z-10">
            <span className="text-5xl font-bold text-primary tracking-tight">14</span>
            <div className="text-[11px] font-medium text-on-surface-variant/60 leading-relaxed uppercase tracking-wider">
              Active tickets requiring immediate <br/> attention in the last 24 hours.
            </div>
          </div>
          <AlertCircle className="absolute right-[-20px] bottom-[-20px] text-error/5" size={100} />
        </div>

        <div className="bg-white rounded-2xl p-6 flex items-center justify-between shadow-sm border border-surface-container-high">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant/50 block mb-1">Resolution Rate</span>
            <span className="text-4xl font-bold text-tertiary tracking-tight">98%</span>
          </div>
          <div className="w-14 h-14 rounded-xl bg-tertiary/10 flex items-center justify-center">
            <CheckCircle2 className="text-tertiary" size={28} />
          </div>
        </div>
      </section>

      {/* Filter Chips */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
        {['All Items', 'Open', 'In Progress', 'Resolved'].map((tab, i) => (
          <button
            key={tab}
            className={cn(
              "px-5 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all",
              i === 0 ? "bg-primary text-white shadow-sm" : "bg-white border border-surface-container-high text-on-surface-variant hover:bg-surface"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-4">
        {complaints.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white rounded-2xl p-5 flex flex-col gap-4 shadow-sm border border-surface-container-high group hover:border-primary/30 hover:shadow-md transition-all active:scale-[0.99]"
          >
            <div className="flex items-start gap-4">
              <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border border-surface-container-high", item.bg, item.color)}>
                <item.icon size={22} />
              </div>
              <div className="flex-grow space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-on-surface text-base group-hover:text-primary transition-colors">{item.title}</h3>
                  <span className={cn(
                    "text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md",
                    item.status === 'Open' ? 'bg-error/10 text-error' : 
                    item.status === 'In Progress' ? 'bg-secondary/10 text-secondary' : 
                    'bg-tertiary/10 text-tertiary'
                  )}>
                    {item.status}
                  </span>
                </div>
                <p className="text-on-surface-variant text-sm line-clamp-2 leading-relaxed">{item.desc}</p>
              </div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-surface">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-wider">Resident</span>
                <span className="text-xs font-bold text-on-surface">{item.resident}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="text-[10px] font-bold text-on-surface-variant/30 uppercase tracking-wider">{item.time}</span>
                </div>
                <ChevronRight size={18} className="text-on-surface-variant/30 group-hover:text-primary transition-colors" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Featured Visual Card */}
      <div className="mt-8 rounded-2xl overflow-hidden relative min-h-[220px] flex items-center shadow-sm border border-surface-container-high">
        <img 
          src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=1000" 
          alt="Maintenance" 
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/80 to-transparent"></div>
        <div className="relative z-10 p-8 max-w-xs">
          <h2 className="text-white text-2xl font-bold mb-3 tracking-tight leading-tight">Rapid Response Protocol</h2>
          <p className="text-white/70 text-[11px] font-bold uppercase tracking-wider mb-6 leading-relaxed">Our updated SLA ensures critical maintenance issues are addressed within 120 minutes.</p>
          <button className="bg-white text-secondary font-bold text-[10px] uppercase tracking-wider px-5 py-2.5 rounded-lg active:scale-95 transition-all hover:bg-surface">
            View Performance Docs
          </button>
        </div>
      </div>
    </div>
  );
}
