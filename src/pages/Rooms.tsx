import { useState, useEffect } from 'react';
import { Bed, Star, Wrench, CheckCircle2, Plus, Users, Calendar, MapPin, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { cn } from '../lib/utils';

export default function Rooms() {
  const [activeFilter, setActiveFilter] = useState('All Units');
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'rooms'), orderBy('number', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setRooms(data);
      setLoading(false);
    }, (error) => {
      console.error("Firestore Error:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const filteredRooms = rooms.filter(r => {
    if (activeFilter === 'All Units') return true;
    if (activeFilter === 'Maintenance') return r.status === 'Maintenance';
    return r.type === activeFilter.replace('s', ''); // Simple mapping for now
  });

  const filters = ['All Units', 'Standard', 'Suite', 'Deluxe', 'Maintenance'];

  const occupancyRate = rooms.length > 0 
    ? Math.round((rooms.reduce((acc, r) => acc + (r.occupied || 0), 0) / rooms.reduce((acc, r) => acc + (r.capacity || 1), 0)) * 100)
    : 0;

  return (
    <div className="space-y-8 pb-12">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-on-surface mb-1">Inventory Ledger</h1>
          <p className="text-on-surface-variant text-sm">Real-time room occupancy and capacity management.</p>
        </div>
        <div className="bg-white border border-surface-container-high px-4 py-2 rounded-xl flex items-center gap-2 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-tertiary"></span>
          <span className="text-[11px] font-bold uppercase tracking-wider text-tertiary">Occupancy: {occupancyRate}%</span>
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

      {loading ? (
        <div className="flex flex-col items-center justify-center py-12 text-on-surface-variant/40">
          <Loader2 className="animate-spin mb-2" size={32} />
          <span className="text-xs font-bold uppercase tracking-widest">Syncing Inventory...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRooms.map((room, i) => {
            const isFull = room.occupied >= room.capacity;
            const isVip = room.type === 'Deluxe';
            return (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={cn(
                  "relative overflow-hidden rounded-2xl p-6 border transition-all hover:shadow-md",
                  isVip ? "bg-secondary text-white border-secondary" : "bg-white border-surface-container-high"
                )}
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className={cn(
                      "text-[10px] font-bold uppercase tracking-wider mb-1 block",
                      isVip ? "text-white/60" : "text-on-surface-variant/50"
                    )}>
                      {room.wing}
                    </span>
                    <h3 className="text-3xl font-bold tracking-tight">{room.number}</h3>
                  </div>
                  {isVip ? <Star size={24} fill="currentColor" /> : (
                    room.status === 'Maintenance' ? <Wrench className="text-error" size={24} /> : 
                    <Bed className={cn(isFull ? "text-error" : "text-primary")} size={24} />
                  )}
                </div>

                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider opacity-60">
                      {room.status === 'Maintenance' ? 'Status' : 'Occupancy'}
                    </span>
                    <span className={cn(
                      "text-[10px] font-bold uppercase tracking-wider",
                      isFull ? "text-error" : 
                      room.status === 'Maintenance' ? "text-error" : 
                      room.occupied === 0 ? "text-tertiary" : 
                      isVip ? "text-white" : "text-primary"
                    )}>
                      {room.status === 'Maintenance' ? 'MAINTENANCE' : isFull ? 'FULL' : `${Math.round((room.occupied / room.capacity) * 100)}% OCCUPIED`}
                    </span>
                  </div>
                  <div className={cn("w-full h-1.5 rounded-full overflow-hidden", isVip ? "bg-white/20" : "bg-surface")}>
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(room.occupied / room.capacity) * 100}%` }}
                      className={cn(
                        "h-full",
                        isVip ? "bg-white" : 
                        isFull ? "bg-error" : 
                        room.status === 'Maintenance' ? "bg-error opacity-30" : 
                        room.occupied === 0 ? "bg-tertiary" : "bg-primary"
                      )} 
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users size={14} className={isVip ? "text-white/60" : "text-on-surface-variant/40"} />
                    <span className="text-[11px] font-bold uppercase tracking-wider opacity-80">{room.occupied} / {room.capacity} Guests</span>
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider opacity-80">{room.type}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* FAB */}
      <button className="fixed right-6 bottom-28 lg:bottom-10 w-14 h-14 rounded-xl bg-primary text-white shadow-lg shadow-primary/20 flex items-center justify-center active:scale-90 transition-transform z-40">
        <Plus size={24} />
      </button>
    </div>
  );
}
