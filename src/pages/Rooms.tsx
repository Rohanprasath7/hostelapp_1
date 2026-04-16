import { useState } from 'react';
import { Bed, Star, Wrench, CheckCircle2, Plus, Users, Calendar, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export default function Rooms() {
  const [activeFilter, setActiveFilter] = useState('All Units');

  const rooms = [
    { id: '101', level: 'Level 1 • Wing A', occupancy: 'FULL', beds: '4 / 4', type: 'Male Dorm', status: 'full', guests: 4 },
    { id: '102', level: 'Level 1 • Wing A', occupancy: 'AVAILABLE', beds: '2 / 4', type: 'Male Dorm', status: 'available', guests: 2 },
    { id: '103', level: 'Level 1 • Wing B', occupancy: 'MAINTENANCE', beds: '0 / 2', type: 'Private', status: 'maintenance', guests: 0 },
    { id: '201', level: 'Level 2 • Wing A', occupancy: 'EMPTY', beds: '0 / 1', type: 'Private', status: 'empty', guests: 0 },
    { id: '205', level: 'Level 2 • Wing B', occupancy: '75% OCCUPIED', beds: '3 / 4', type: 'Female Dorm', status: 'partial', guests: 3 },
    { id: 'VIP 1', level: 'Level 3 • Penthouse', occupancy: 'RESERVED', beds: '1 / 1', type: 'VIP Suite', status: 'reserved', guests: 1, isVip: true },
  ];

  const filters = ['All Units', 'Male Dorms', 'Female Dorms', 'Private Suites', 'Maintenance'];

  return (
    <div className="space-y-8 pb-12">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-on-surface mb-1">Inventory Ledger</h1>
          <p className="text-on-surface-variant text-sm">Real-time room occupancy and capacity management.</p>
        </div>
        <div className="bg-white border border-surface-container-high px-4 py-2 rounded-xl flex items-center gap-2 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-tertiary"></span>
          <span className="text-[11px] font-bold uppercase tracking-wider text-tertiary">Occupancy: 82%</span>
        </div>
      </header>

      <nav className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
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
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room, i) => (
          <motion.div
            key={room.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={cn(
              "relative overflow-hidden rounded-2xl p-6 border transition-all hover:shadow-md",
              room.isVip ? "bg-secondary text-white border-secondary" : "bg-white border-surface-container-high"
            )}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className={cn(
                  "text-[10px] font-bold uppercase tracking-wider mb-1 block",
                  room.isVip ? "text-white/60" : "text-on-surface-variant/50"
                )}>
                  {room.level}
                </span>
                <h3 className="text-3xl font-bold tracking-tight">{room.id}</h3>
              </div>
              {room.isVip ? <Star size={24} fill="currentColor" /> : (
                room.status === 'maintenance' ? <Wrench className="text-error" size={24} /> : 
                <Bed className={cn(room.status === 'full' ? "text-error" : "text-primary")} size={24} />
              )}
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider opacity-60">
                  {room.status === 'maintenance' ? 'Status' : 'Occupancy'}
                </span>
                <span className={cn(
                  "text-[10px] font-bold uppercase tracking-wider",
                  room.status === 'full' ? "text-error" : 
                  room.status === 'maintenance' ? "text-error" : 
                  room.status === 'empty' ? "text-tertiary" : 
                  room.isVip ? "text-white" : "text-primary"
                )}>
                  {room.occupancy}
                </span>
              </div>
              <div className={cn("w-full h-1.5 rounded-full overflow-hidden", room.isVip ? "bg-white/20" : "bg-surface")}>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: room.status === 'full' ? '100%' : room.status === 'partial' ? '75%' : room.status === 'available' ? '50%' : '0%' }}
                  className={cn(
                    "h-full",
                    room.isVip ? "bg-white" : 
                    room.status === 'full' ? "bg-error" : 
                    room.status === 'maintenance' ? "bg-error opacity-30" : 
                    room.status === 'empty' ? "bg-tertiary" : "bg-primary"
                  )} 
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex -space-x-2">
                {[...Array(room.guests)].map((_, i) => (
                  <div key={i} className="w-8 h-8 rounded-lg border-2 border-white bg-surface overflow-hidden shadow-sm">
                    <img 
                      src={`https://i.pravatar.cc/100?u=${room.id}-${i}`} 
                      alt="Guest" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
                {room.status === 'available' && (
                  <div className="w-8 h-8 rounded-lg border-2 border-white bg-surface flex items-center justify-center text-[10px] font-bold text-primary">
                    +2
                  </div>
                )}
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider opacity-80">{room.beds} Beds</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* FAB */}
      <button className="fixed right-6 bottom-28 lg:bottom-10 w-14 h-14 rounded-xl bg-primary text-white shadow-lg shadow-primary/20 flex items-center justify-center active:scale-90 transition-transform z-40">
        <Plus size={24} />
      </button>
    </div>
  );
}
