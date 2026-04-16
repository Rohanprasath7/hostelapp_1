import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, ChevronRight, UserPlus } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export default function Residents() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');

  const residents = [
    { id: '1', name: 'Alexander Chen', room: 'Room 402-B', joined: 'Oct 12, 2023', status: 'Paid', statusColor: 'bg-tertiary/10 text-tertiary', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100' },
    { id: '2', name: 'Sarah Jenkins', room: 'Room 115-A', joined: 'Nov 04, 2023', status: 'Balance Due', statusColor: 'bg-error/10 text-error', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100' },
    { id: '3', name: 'Marcus Thorne', room: 'Room 208-D', joined: 'Dec 01, 2023', status: 'Paid', statusColor: 'bg-tertiary/10 text-tertiary', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100&h=100' },
    { id: '4', name: 'Elena Rodriguez', room: 'Room 303-A', joined: 'Sep 28, 2023', status: 'Partial', statusColor: 'bg-primary/10 text-primary', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100&h=100' },
  ];

  const filters = ['All', 'Paid', 'Pending', 'Overdue'];

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-on-surface mb-1">Resident Directory</h1>
        <p className="text-on-surface-variant text-sm">Manage and monitor your resident ledger.</p>
      </header>

      {/* Search & Filters */}
      <section className="space-y-4">
        <div className="relative group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-on-surface-variant/50">
            <Search size={18} />
          </div>
          <input 
            type="text" 
            placeholder="Search for residents..."
            className="w-full pl-11 pr-4 py-3 bg-white border border-surface-container-high rounded-xl focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all focus:ring-0 text-sm font-medium"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "px-5 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all active:scale-95",
                activeFilter === filter 
                  ? "bg-primary text-white shadow-sm" 
                  : "bg-white border border-surface-container-high text-on-surface-variant hover:bg-surface"
              )}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      {/* Residents List */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-[11px] font-bold tracking-wider text-on-surface-variant/50 uppercase">Resident Ledger</h2>
          <span className="text-[11px] font-bold text-primary">248 Total</span>
        </div>

        <div className="space-y-3">
          {residents.map((resident, i) => (
            <motion.div
              key={resident.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => navigate(`/residents/${resident.id}`)}
              className="group bg-white p-4 rounded-2xl border border-surface-container-high flex items-center justify-between transition-all hover:border-primary/30 hover:shadow-md cursor-pointer active:scale-[0.99]"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-surface overflow-hidden border border-surface-container-high">
                  <img src={resident.image} alt={resident.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h3 className="font-bold text-on-surface group-hover:text-primary transition-colors">{resident.name}</h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[11px] font-bold text-on-surface-variant/60">
                      {resident.room}
                    </span>
                    <span className="w-1 h-1 bg-on-surface-variant/20 rounded-full"></span>
                    <span className="text-[11px] font-medium text-on-surface-variant/40">
                      Joined {resident.joined}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={cn(
                  "px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider",
                  resident.statusColor
                )}>
                  {resident.status}
                </span>
                <ChevronRight size={18} className="text-on-surface-variant/30 group-hover:text-primary transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAB */}
      <button 
        onClick={() => navigate('/onboard')}
        className="fixed right-6 bottom-28 lg:bottom-10 w-14 h-14 rounded-xl bg-primary text-white shadow-lg shadow-primary/20 flex items-center justify-center active:scale-90 transition-transform z-40"
      >
        <UserPlus size={24} />
      </button>
    </div>
  );
}
